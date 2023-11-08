import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import {  FilterPatientDto, IUser, UserRole } from 'src/types/types';
import { UploadFilesService } from 'src/upload-files/upload-files.service';

@Injectable()
export class PatientService {
	constructor(
		@InjectRepository(Patient)
		private patientRepository: Repository<Patient>,
		private readonly uploadService: UploadFilesService
	) {}

	async create(user: User) {
		const newPatient = await this.patientRepository.save({ user });
		return newPatient;
	}

	async upload(fileName: string, file: Buffer, id: number) {
		const patient = await this.findOne(+id); 
		const photoURL = await this.uploadService.uploadFile(fileName, file);
		await this.patientRepository.update(id, { photo: photoURL });
		// return photoURL;
		return { ...patient, photo: photoURL };
	}

	async findAll(page: number, limit: number) {
		if (page <= 0 || limit <= 0) {
			throw new BadRequestException(
				"Invalid 'page' and 'limit' values. Both 'page' and 'limit' must be greater than 0."
			);
		}
		const [patients, total] = await this.patientRepository.findAndCount({
			// relations: { user: true },
			relations: { doctor: true },
			take: limit,
			skip: (page - 1) * limit,
		});

		const totalPages = Math.ceil(total / limit);
		const currentPage = page;

		return { patients, totalPages, currentPage };
	}

	async findPatientsByDoctorId(
		doctorId: number,
		page: number,
		limit: number
	) {
		if (page <= 0 || limit <= 0) {
			throw new BadRequestException(
				"Invalid 'page' and 'limit' values. Both 'page' and 'limit' must be greater than 0."
			);
		}

		const [patients, total] = await this.patientRepository.findAndCount({
			where: { doctor: { doctorId } },
			relations: { schedule: { product: true } },
			take: limit,
			skip: (page - 1) * limit,
		});
		const totalPages = Math.ceil(total / limit);
		const currentPage = page;

		return { patients, totalPages, currentPage };
	}

	async findOneByUserId(userId: number) {
		const patient = await this.patientRepository.findOne({
			where: { user: { userId } },
		});
		return patient;
	}

	async findOneByPatientId(user: IUser, patientId: number) {
		const isAdditionalInfoTrue = await this.check(user, patientId);
		const patient = await this.patientRepository.findOne({
			where: { patientId },
			relations: {
				schedule: { product: isAdditionalInfoTrue },
				doctor: isAdditionalInfoTrue,
			},
		});
		if (!patient) throw new NotFoundException("This patient doesn't exist");
		return patient;
	}

	async findOne(patientId: number) {
		const patient = await this.patientRepository.findOne({
			where: { patientId },
			relations: { doctor: true },
		});
		return patient;
	}

	async check(user: IUser, patientId: number) {
		const { idByRole, role } = user;
		if (role === UserRole.ADMIN) return true;
		if (role === UserRole.PATIENT) {
			return +idByRole === patientId;
		} else if (role === UserRole.DOCTOR) {
			const user = await this.patientRepository.findOne({
				where: { patientId, doctor: { doctorId: +idByRole } },
			});
			return Boolean(user);
		}
	}

	async update(id: number, dto: UpdatePatientDto) {
		const patient = await this.patientRepository.findOne({
			where: { patientId: id },
		});
		if (!patient) throw new NotFoundException("This patient doesn't exist");
		const filteredDto: FilterPatientDto = {};
		for (const key of ['name', 'age', 'skinType']) {
			if (dto[key]) {
				filteredDto[key] = dto[key];
			}
		}
		await this.patientRepository.update(id, filteredDto);
		return { message: 'Patient was succesfully updated' };
	}

	async deleteDoctor(user: IUser) {
		const patient = await this.findOne(+user.idByRole);
		await this.patientRepository.update(patient.patientId, {
			...patient,
			doctor: null,
		});
		return {
			message: 'Doctor was succesfully deleted from patient profile',
		};
	}

	async updateDoctor(patientId: number, doctorId: number) {
		await this.patientRepository.update(patientId, {
			doctor: { doctorId },
		});
		return { message: 'Doctor was succesfully updated' };
	}
}
