import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateDoctorsRequestDto } from './dto/create-doctors-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsRequest } from './entities/doctors-request.entity';
import { Repository } from 'typeorm';
import { IUser } from 'src/types/types';
import { PatientService } from 'src/patient/patient.service';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class DoctorsRequestService {
	constructor(
		@InjectRepository(DoctorsRequest)
		private requestsRepository: Repository<DoctorsRequest>,
		private patientService: PatientService,
		private doctorService: DoctorService
	) {}

	async create(user: IUser, dto: CreateDoctorsRequestDto) {
		const patient = await this.patientService.findOne(+user.idByRole);
		if (patient.doctor !== null)
			throw new ForbiddenException(
				"You can't send request while already having own doctor"
			);

		const request = await this.requestsRepository.findOne({
			where: { patient: { patientId: patient.patientId } },
		});

		if (request)
			throw new ForbiddenException(
				"You can't send request because you already have send request"
			);

		const doctor = await this.doctorService.findOneByDoctorId(dto.doctorId);
		if (!doctor) throw new NotFoundException("This doctor doesn't exist");

		const isRequestExists = await this.requestsRepository.findOne({
			where: {
				patient: { patientId: +user.idByRole },
				doctor: { doctorId: dto.doctorId },
			},
		});
		if (isRequestExists)
			throw new BadRequestException('Request already exists');

		await this.requestsRepository.save({
			coverletter: dto.coverletter,
			patient: { patientId: +user.idByRole },
			doctor: { doctorId: dto.doctorId },
		});

		return { message: 'Request was succesfully created' };
	}

	async findAll() {
		return await this.requestsRepository.find({
			relations: { doctor: true, patient: true },
		});
	}

	async findRequestByDoctorId(user: IUser) {
		return await this.requestsRepository.find({
			where: { doctor: { doctorId: +user.idByRole } },
			relations: { patient: true },
			order: { createAt: 'ASC' },
		});
	}

	async findOne(requestId: number) {
		return await this.requestsRepository.findOne({
			where: { requestId },
			relations: { patient: true, doctor: true },
		});
	}

	async submit(requestId: number, user: IUser) {
		const request = await this.findOne(requestId);
		if (!request) throw new NotFoundException("This request doesn't exist");

		const patient = await this.patientService.findOne(
			request.patient.patientId
		);
		if (!patient) throw new NotFoundException("This patient doesn't exist");

		if (patient.doctor !== null) {
			throw new ForbiddenException(
				"You can't submit request because patient already have own doctor"
			);
		}

		if (request.doctor.doctorId !== +user.idByRole) {
			throw new ForbiddenException(
				"You can't submit request because it is not your request"
			);
		}

		const result = await this.patientService.updateDoctor(
			request.patient.patientId,
			request.doctor.doctorId
		);

		await this.requestsRepository.delete(requestId);

		return result;
	}

	async remove(requestId: number, user: IUser) {
		const request = await this.findOne(requestId);
		if (!request) throw new NotFoundException("This request doesn't exist");

		if (request.doctor.doctorId !== +user.idByRole) {
			throw new ForbiddenException(
				"You can't delete request because it is not your request"
			);
		}

		await this.requestsRepository.delete(requestId);

		return { message: 'Request was succesfully deleted' };
	}
}
