import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

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
			relations: { user: true },
			take: limit,
			skip: (page - 1) * limit,
		});
		return { patients };
	}

	async findPatientsByDoctorId(doctorId, page, limit) {
		const patients = await this.patientRepository.find({
			where: { doctor: { doctorId } },
			take: limit,
			skip: (page - 1) * limit,
		});
		return { patients };
	}

	async findOneByUserId(id: number) {
		const patient = await this.patientRepository.findOne({
			where: { user: { userId: id } },
		});
		if (!patient) throw new NotFoundException("This patient doesn't exist");
		return patient;
	}

	async findOneByPatientId(id: number) {
		const patient = await this.patientRepository.findOne({
			where: { patientId: id },
		});
		if (!patient) throw new NotFoundException("This patient doesn't exist");
		return patient;
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
