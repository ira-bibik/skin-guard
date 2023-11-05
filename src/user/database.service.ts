import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';

@Injectable()
export class DatabaseService {
	constructor(private readonly configService: ConfigService) {}

	async backup() {
		const connectionString = this.buildConnectionString();
		const backupCommand = `pg_dump -Fc ${connectionString} > backup.sql`;
		await exec(backupCommand);
	}

	async restore() {
		const connectionString = this.buildConnectionString();
		const restoreCommand = `pg_restore -c -d ${connectionString} -F c backup.sql`;
		await exec(restoreCommand);
	}

	private buildConnectionString(): string {
		const dbHost = this.configService.get('DB_HOST');
		const dbPort = this.configService.get('DB_PORT');
		const dbUsername = this.configService.get('DB_USERNAME');
		const dbPassword = this.configService.get('DB_PASSWORD');
		const dbName = this.configService.get('DB_NAME');

		return `postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
	}
}
