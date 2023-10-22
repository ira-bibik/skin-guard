import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorsRequestDto } from './create-doctors-request.dto';

export class UpdateDoctorsRequestDto extends PartialType(CreateDoctorsRequestDto) {}
