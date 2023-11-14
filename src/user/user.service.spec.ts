import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PatientService } from '../patient/patient.service';
import { DoctorService } from '../doctor/doctor.service';
import { JwtService } from '@nestjs/jwt';
import { UploadFilesService } from '../upload-files/upload-files.service';
import { Patient } from '../patient/entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';
import { ConfigService } from '@nestjs/config';

describe('Controller', () => {
	let service: UserService;

	const mockUserRepository = {};
	const mockPatientRepository = {};
	const mockDoctorRepository = {};
	const mockConfigService = {};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(User),
					useValue: mockUserRepository,
				},
				{
					provide: getRepositoryToken(Patient),
					useValue: mockPatientRepository,
				},
				{
					provide: getRepositoryToken(Doctor),
					useValue: mockDoctorRepository,
				},
				PatientService,
				DoctorService,
				JwtService,
				UploadFilesService,
				ConfigService,
			],
		}).compile();

		service = moduleRef.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
