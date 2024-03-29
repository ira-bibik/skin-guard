import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { FilterDoctorDto } from '../types/types';
import { UploadFilesService } from '../upload-files/upload-files.service';

@Injectable()
export class DoctorService {
	constructor(
		@InjectRepository(Doctor)
		private doctorRepository: Repository<Doctor>,
		private readonly uploadService: UploadFilesService
	) {}

	async create(user: User) {
		const newPatient = await this.doctorRepository.save({ user });
		return newPatient;
	}

	async upload(fileName: string, file: Buffer, id: number) {
		const patient = await this.findOne(+id);
		const photoURL = await this.uploadService.uploadFile(fileName, file);
		await this.doctorRepository.update(id, { photo: photoURL });
		return { ...patient, photo: photoURL };
	}

	async findAll(page: number, limit: number) {
		if (page <= 0 || limit <= 0) {
			throw new BadRequestException(
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
