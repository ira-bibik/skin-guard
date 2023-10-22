import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
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

	async findAll() {
		const patients = await this.doctorRepository.find({
			relations: { user: true },
		});
		return { patients };
	}

	async findOneByUserId(id: number) {
		const user = await this.doctorRepository.findOne({
			where: { user: { userId: id } },
		});
		return user;
	}

	update(id: number, updateDoctorDto: UpdateDoctorDto) {
		return `This action updates a #${id} doctor`;
	}

	remove(id: number) {
		return `This action removes a #${id} doctor`;
	}
}
