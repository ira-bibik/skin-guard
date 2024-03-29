import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PatientService } from '../patient/patient.service';
import { DoctorService } from '../doctor/doctor.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser, UserRole } from '../types/types';
import { Patient } from '../patient/entities/patient.entity';
import { Doctor } from '../doctor/entities/doctor.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private patientService: PatientService,
		private doctorService: DoctorService,
		private jwtService: JwtService
	) {}

	async create(createUserDto: CreateUserDto) {
		const existUser = await this.findOne(createUserDto.email);

		if (existUser)
			throw new BadRequestException('This email already exists');

		const user = await this.usersRepository.save({
			email: createUserDto.email,
			password: await argon2.hash(createUserDto.password),
			role: createUserDto.role,
		});

		let newUser: Patient | Doctor;
		let idByRole: number;
		if (createUserDto.role === UserRole.PATIENT) {
			newUser = await this.patientService.create(user);
			idByRole = newUser.patientId;
		} else if (createUserDto.role === UserRole.DOCTOR) {
			newUser = await this.doctorService.create(user);
			idByRole = newUser.doctorId;
		}

		const access_token = this.jwtService.sign({
			userId: user.userId,
			email: user.email,
			role: user.role,
			idByRole,
		});

		return { access_token };
	}

	async login(user: IUser) {
		const { userId, email, role } = user;
		let idByRole: number;
		if (role === UserRole.PATIENT) {
			let patient = await this.patientService.findOneByUserId(+userId);
			idByRole = patient.patientId;
		} else if (role === UserRole.DOCTOR) {
			let doctor = await this.doctorService.findOneByUserId(+userId);
			idByRole = doctor.doctorId;
		}
		return {
			access_token: this.jwtService.sign({
				userId,
				email,
				role,
				idByRole,
			}),
		};
	}

	async findAll(page: number, limit: number) {
		if (page <= 0 || limit <= 0) {
			throw new BadRequestException(
				"Invalid 'page' and 'limit' values. Both 'page' and 'limit' must be greater than 0."
			);
		}
		const [users, total] = await this.usersRepository.findAndCount({
			take: limit,
			skip: (page - 1) * limit,
		});

		const totalPages = Math.ceil(total / limit);
		const currentPage = page;
		return { users, totalPages, currentPage };
	}

	async findOne(email: string) {
		const user = await this.usersRepository.findOne({
			where: { email },
		});
		return user;
	}

	async findOneByUserId(id: number) {
		const user = await this.usersRepository.findOne({
			where: { userId: id },
		});
		if (!user) throw new NotFoundException("This user doesn't exist");
		if (user.role === UserRole.PATIENT) {
			return await this.patientService.findOneByUserId(id);
		} else if (user.role === UserRole.DOCTOR) {
			return await this.doctorService.findOneByUserId(id);
		} else {
			return user;
		}
	}

	async validateUser(email: string, password: string) {
		const user = await this.findOne(email);
		if (!user)
			throw new UnauthorizedException(
				"The user with this email doesn't exist"
			);
		const passwordIsMatch = await argon2.verify(user.password, password);
		if (passwordIsMatch) {
			return user;
		}
		throw new UnauthorizedException('Password is incorrect');
	}

	async remove(userId: number) {
		const user = await this.usersRepository.findOne({ where: { userId } });
		if (!user) throw new NotFoundException('User is not found');
		await this.usersRepository.delete(userId);
		return { message: 'User was succesfully deleted' };
	}
}
