import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { RolesGuard } from '../user/guards/roles.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('DatabaseController', () => {
	let controller: DatabaseController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DatabaseController],
			providers: [DatabaseService, RolesGuard, JwtService, ConfigService],
		}).compile();

		controller = module.get<DatabaseController>(DatabaseController);
	});


	it('should create a database backup', async () => {
		const backupSpy = jest.spyOn(controller.databaseService, 'backup');

		await controller.backup();

		expect(backupSpy).toHaveBeenCalled();

		const response = await controller.backup();

		expect(response).toEqual({
			message: 'Database backup created successfully.',
		});
	});

	it('should restore a database', async () => {
		const restoreSpy = jest.spyOn(controller.databaseService, 'restore');

		await controller.restore();

		expect(restoreSpy).toHaveBeenCalled();

		const response = await controller.restore();

		expect(response).toEqual({
			message: 'Database restored successfully.',
		});
	});
});
