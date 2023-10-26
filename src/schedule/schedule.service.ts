import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { IUser } from 'src/types/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { PatientService } from 'src/patient/patient.service';
import { Product } from 'src/product/entities/product.entity';

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
			descriptio: dto?.description,
		});
		if (!newSchedule)
			throw new BadRequestException('Something went wromg...');
		return newSchedule;
	}

	async findAll() {
		return await this.scheduleRepository.find({
			relations: { product: true, patient: true },
		});
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

	//is neccessary?
	async findOne(scheduleId: number) {
		const schedule = await this.scheduleRepository.findOne({
			where: { scheduleId },
			relations: { product: true, patient: true },
		});
		if (!schedule) throw new NotFoundException("Schedule doesn't exist");
		return schedule;
	}

	update(id: number, updateScheduleDto: UpdateScheduleDto) {
		return `This action updates a #${id} schedule`;
	}

	remove(id: number) {
		return `This action removes a #${id} schedule`;
	}
}
