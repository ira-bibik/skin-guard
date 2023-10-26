import { IsIn, IsOptional, IsString, Length } from 'class-validator';
import { UsageTime } from '../entities/schedule.entity';

export class UpdateScheduleDto {
	@IsOptional()
	@IsIn(['evening', 'morning'], {
		message: 'The usage time value must be evening or morning',
	})
	readonly time: UsageTime;

	@IsOptional()
	@IsString()
	@Length(10, 500, {
		message:
			'Description must be npt less than 10 and not bigger than 500 characters',
	})
	readonly description: string;
}
