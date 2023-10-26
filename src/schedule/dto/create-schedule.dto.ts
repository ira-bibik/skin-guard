import {
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
    MaxLength,
} from 'class-validator';
import { UsageTime } from '../entities/schedule.entity';

export class CreateScheduleDto {
	@IsNotEmpty()
	@IsNumber()
	readonly productId: number;

	@IsNotEmpty()
	@IsNumber()
	readonly patientId: number;

	@IsNotEmpty()
	@IsIn(['evening', 'morning'], {
		message: 'The usage time value must be evening or morning',
	})
	readonly time: UsageTime;

	@IsOptional()
	@IsString()
	@MaxLength(500, {
		message:
			'Description must be not bigger than 500 characters',
	})
	description: string;
}
