import {
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
    MaxLength,
} from 'class-validator';
import { UsageTime } from 'src/types/types';

export class CreateScheduleDto {
	@IsNotEmpty()
	@IsNumber()
	readonly productId: number;

	@IsNotEmpty()
	@IsNumber()
	readonly patientId: number;

	@IsNotEmpty()
	@IsIn([UsageTime.EVENING, UsageTime.MORNING], {
		message: 'The usage time value must be evening or morning',
	})
	readonly time: UsageTime;

	@IsOptional()
	@IsString()
	@MaxLength(500, {
		message: 'Description must be not bigger than 500 characters',
	})
	description: string;
}
