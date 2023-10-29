import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

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
		const doctors = await this.doctorRepository.find({
			relations: { patients: true },
			take: limit,
			skip: (page - 1) * limit,
		});
		return doctors;
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
		await this.doctorRepository.update(id, dto);
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
