import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from '../user/guards/roles.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserRole } from '../types/types';

describe('UserController', () => {
	let controller: UserController;
	let mockUserService = {
		create: jest.fn((dto) => {
			return { access_token: 'hello' };
		}),
		remove: jest.fn((userId: string) => {
			return { message: 'User was succesfully deleted' };
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [UserService, RolesGuard, JwtService, ConfigService],
		})
			.overrideProvider(UserService)
			.useValue(mockUserService)
			.compile();

		controller = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create a user', () => {
		expect(
			controller.create({
				email: 'patient4@gmail.com',
				password: '123456',
				role: UserRole.PATIENT,
			})
		).toEqual({ access_token: expect.any(String) });
	});

	it('should delete a user', () => {
		expect(
			controller.remove('1')
		).toEqual({ message: expect.any(String) });
		expect(mockUserService.remove).toHaveBeenCalled();
	});
});
