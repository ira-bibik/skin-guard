import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { FilterDoctorDto } from 'src/types/types';

@Injectable()
export class DoctorService {
	constructor(
		@InjectRepository(Doctor)
		private doctorRepository: Repository<Doctor>
	) {}

	async create(user: User) {
		const newPatient = await this.doctorRepository.save({ user });
		return newPatient;
	}

	async findAll(page: number, limit: number) {
		if (page <= 0 || limit <= 0) {
			throw new Error(
				"Invalid 'page' and 'limit' values. Both 'page' and 'limit' must be greater than 0."
			);
		}

		const [doctors, total] = await this.doctorRepository.findAndCount({
			relations: { patients: true },
			take: limit,
			skip: (page - 1) * limit,
		});

		const totalPages = Math.ceil(total / limit);
		const currentPage = page;

		return { doctors, totalPages, currentPage };
	}

	async findOneByUserId(id: number) {
		const doctor = await this.doctorRepository.findOne({
			where: { user: { userId: id } },
			relations: { patients: true },
		});
		return doctor;
	}

	async findOneByDoctorId(id: number) {
		const doctor = await this.doctorRepository.findOne({
			where: { doctorId: id },
			relations: { patients: true },
		});
		if (!doctor) throw new NotFoundException("This doctor doesn't exist");
		return doctor;
	}

	async update(id: number, dto: UpdateDoctorDto) {
		const doctor = await this.doctorRepository.findOne({
			where: { doctorId: id },
		});
		if (!doctor) throw new NotFoundException("This doctor doesn't exist");

		const filteredDto: FilterDoctorDto = {};
		for (const key of ['name', 'description', 'specialization', 'work']) {
			if (dto[key]) {
				filteredDto[key] = dto[key];
			}
		}

		await this.doctorRepository.update(id, filteredDto);
		return { message: 'Doctor was succesfully updated' };
	}

	async findOne(id: number) {
		const doctor = await this.doctorRepository.findOne({
			where: { doctorId: id },
			relations: { patients: true },
		});
		return doctor;
	}
}
