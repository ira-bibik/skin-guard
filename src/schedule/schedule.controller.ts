import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	create(@Request() req, @Body() createScheduleDto: CreateScheduleDto) {
		return this.scheduleService.create(createScheduleDto, req.user);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll() {
		return this.scheduleService.findAll();
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateScheduleDto: UpdateScheduleDto
	) {
		return this.scheduleService.update(+id, updateScheduleDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.scheduleService.remove(+id);
	}
}
