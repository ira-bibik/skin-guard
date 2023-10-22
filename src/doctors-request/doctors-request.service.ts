import { Injectable } from '@nestjs/common';
import { CreateDoctorsRequestDto } from './dto/create-doctors-request.dto';
import { UpdateDoctorsRequestDto } from './dto/update-doctors-request.dto';

@Injectable()
export class DoctorsRequestService {
  create(createDoctorsRequestDto: CreateDoctorsRequestDto) {
    return 'This action adds a new doctorsRequest';
  }

  findAll() {
    return `This action returns all doctorsRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorsRequest`;
  }

  update(id: number, updateDoctorsRequestDto: UpdateDoctorsRequestDto) {
    return `This action updates a #${id} doctorsRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorsRequest`;
  }
}
