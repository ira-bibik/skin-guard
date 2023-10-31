import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
	constructor(private readonly configService: ConfigService) {}

	async backup() {
		// const databaseName = this.configService.get('DATABASE_NAME');
		// const backupCommand = `pg_dump -Fc ${databaseName} > backup.sql`;
		// await exec(backupCommand);
	}

	async restore() {
		// const databaseName = this.configService.get('DATABASE_NAME');
		// const restoreCommand = `pg_restore -d ${databaseName} backup.sql`;
		// await exec(restoreCommand);
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
