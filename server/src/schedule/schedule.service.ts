import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { IUser } from '../types/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { PatientService } from '../patient/patient.service';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectRepository(Schedule)
		private scheduleRepository: Repository<Schedule>,
		private patientService: PatientService,
		@InjectRepository(Product)
		private productRepository: Repository<Product>
	) {}

	async create(dto: CreateScheduleDto, user: IUser) {
		const isPatientExist = await this.patientService.findOne(dto.patientId);
		if (!isPatientExist)
			throw new NotFoundException("Patient doesn't exist");

		const isProductExist = await this.productRepository.findOne({
			where: { productId: dto.productId },
		});
		if (!isProductExist)
			throw new NotFoundException("Product doesn't exist");

		const isAllow = await this.patientService.check(user, dto.patientId);
		if (!isAllow)
			throw new ForbiddenException(
				"You can't manage schedule of this patient"
			);

		const isScheduleExist = await this.scheduleRepository.findOne({
			where: {
				product: { productId: dto.productId },
				patient: { patientId: dto.patientId },
				time: dto.time,
			},
		});
		if (isScheduleExist) {
			throw new BadRequestException('This schedule already exist');
		}

		const newSchedule = await this.scheduleRepository.save({
			patient: { patientId: dto.patientId },
			product: { productId: dto.productId },
			time: dto.time,
			description: dto?.description,
		});
		if (!newSchedule)
			throw new BadRequestException('Something went wrong...');
		return newSchedule;
	}

	async findAll(page: number, limit: number) {
		if (page <= 0 || limit <= 0) {
			throw new BadRequestException(
				"Invalid 'page' and 'limit' values. Both 'page' and 'limit' must be greater than 0."
			);
		}
		const [schedules, total] = await this.scheduleRepository.findAndCount({
			relations: { product: true, patient: true },
			take: limit,
			skip: (page - 1) * limit,
		});
		const totalPages = Math.ceil(total / limit);
		const currentPage = page;

		return { schedules, totalPages, currentPage };
	}

	async findSchedulesByPatientId(user: IUser, patientId: number) {
		const isPatientExist = await this.patientService.findOne(patientId);
		if (!isPatientExist)
			throw new NotFoundException("Patient doesn't exist");

		const isAllow = await this.patientService.check(user, patientId);
		if (!isAllow)
			throw new ForbiddenException(
				"You can't manage schedule of this patient"
			);

		return await this.scheduleRepository.find({
			where: { patient: { patientId } },
			relations: { product: true, patient: true },
			order: { time: 'DESC' },
		});
	}

	async findOne(scheduleId: number) {
		const schedule = await this.scheduleRepository.findOne({
			where: { scheduleId },
			relations: { product: true, patient: true },
		});

		return schedule;
	}

	async findOneRequest(scheduleId: number, user: IUser) {
		const schedule = await this.findOne(scheduleId);
		if (!schedule) throw new NotFoundException("Schedule doesn't exist");

		const isAllow = await this.patientService.check(
			user,
			schedule.patient.patientId
		);
		if (!isAllow) {
			throw new ForbiddenException(
				"You can't view schedule of this patient"
			);
		}

		return schedule;
	}

	async update(id: number, dto: UpdateScheduleDto, user: IUser) {
		const schedule = await this.findOne(id);
		if (!schedule) throw new NotFoundException("Schedule doesn't exist");

		const isAllow = await this.patientService.check(
			user,
			schedule.patient.patientId
		);
		if (!isAllow)
			throw new ForbiddenException(
				"You can't manage schedule of this patient"
			);

		if (!dto.description && !dto.time)
			throw new BadRequestException('Enter some data...');

		const updatedSchedule = {
			...schedule,
			time: dto?.time,
			description: dto?.description,
		};

		const isScheduleExist = await this.scheduleRepository.findOne({
			where: {
				product: { productId: updatedSchedule.product.productId },
				patient: { patientId: updatedSchedule.patient.patientId },
				time: updatedSchedule.time,
				description: updatedSchedule.description
			},
		});
		if (isScheduleExist) {
			throw new BadRequestException('This schedule already exists');
		}

		await this.scheduleRepository.update(id, updatedSchedule);

		return { message: 'Schedule was succesfully updated' };
	}

	async remove(id: number, user: IUser) {
		const schedule = await this.findOne(id);
		if (!schedule) throw new NotFoundException("Schedule doesn't exist");

		const isAllow = await this.patientService.check(
			user,
			schedule.patient.patientId
		);
		if (!isAllow)
			throw new ForbiddenException(
				"You can't manage schedule of this patient"
			);

		await this.scheduleRepository.delete(id);

		return { message: 'Schedule was succesfully deleted' };
	}
}
