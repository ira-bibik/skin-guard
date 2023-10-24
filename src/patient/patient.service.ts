import { Injectable } from '@nestjs/common';
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

	async findAll() {
		const patients = await this.patientRepository.find({
			relations: { user: true },
		});
		return { patients };
	}

	async findOneByUserId(id: number) {
		const user = await this.patientRepository.findOne({
			where: { user: { userId: id } },
		});
		return user;
	}

	update(id: number, updatePatientDto: UpdatePatientDto) {
		return `This action updates a #${id} patient`;
	}

	remove(id: number) {
		return `This action removes a #${id} patient`;
	}
}
