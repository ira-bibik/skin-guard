import { Controller, Get, UseGuards } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { RolesGuard } from '../user/guards/roles.guard';
import { UserRole } from '../types/types';
import { Roles } from '../decorator/roles.decorator';

@Controller()
export class DatabaseController {
	constructor(public readonly databaseService: DatabaseService) {}

	@Get('backup')
	@UseGuards(RolesGuard)
	@Roles(UserRole.ADMIN)
	async backup() {
		await this.databaseService.backup();

		return { message: 'Database backup created successfully.' };
	}

	@Get('restore')
	@UseGuards(RolesGuard)
	@Roles(UserRole.ADMIN)
	async restore() {
		await this.databaseService.restore();

		return { message: 'Database restored successfully.' };
	}
}
