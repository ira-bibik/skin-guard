import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { IUser } from 'src/types/types';

@Injectable()
export class PatientService {
	constructor(
		@InjectRepository(Patient)
		private patientRepository: Repository<Patient>
	) {}

	async create(user: User) {
		const newPatient = await this.patientRepository.save({ user });
		return newPatient;
	}

	async findAll(page, limit) {
		const patients = await this.patientRepository.find({
			// relations: { user: true },
			take: limit,
			skip: (page - 1) * limit,
		});
		return { patients };
	}

	async findPatientsByDoctorId(doctorId, page, limit) {
		const patients = await this.patientRepository.find({
			where: { doctor: { doctorId } },
			relations: { schedule: true },
			take: limit,
			skip: (page - 1) * limit,
		});
		return { patients };
	}
	// maybe should be deleted
	async findOneByUserId(userId: number) {
		const patient = await this.patientRepository.findOne({
			where: { user: { userId } },
		});
		if (!patient) throw new NotFoundException("This patient doesn't exist");
		return patient;
	}

	async findOneByPatientId(user: IUser, patientId: number) {
		const isAdditionalInfoTrue = await this.check(user, patientId);
		const patient = await this.patientRepository.findOne({
			where: { patientId },
			relations: {
				schedule: isAdditionalInfoTrue,
				doctor: isAdditionalInfoTrue,
			},
		});
		if (!patient) throw new NotFoundException("This patient doesn't exist");
		return patient;
	}

	async findOne(patientId: number) {
		const patient = await this.patientRepository.findOne({
			where: { patientId },
		});
		return patient;
	}

	async check(user: IUser, patientId: number) {
		const { idByRole, role } = user;
		if (role === 'admin') return true;
		if (role === 'patient') {
			return +idByRole === patientId;
		} else if (role === 'doctor') {
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
		await this.patientRepository.update(id, dto);
		return { message: 'Patient was succesfully updated' };
	}

	//UPDATEdOCTOR??(will do when doctor-request logic)
	async updateDoctor(patientId, doctorId) {
		const patient = await this.patientRepository.findOne({
			where: { patientId },
		});
		if (!patient) throw new NotFoundException("This patient doesn't exist");
		await this.patientRepository.update(patientId, {
			doctor: { doctorId },
		});
		return { message: 'Doctor was succesfully updated' };
	}
}
