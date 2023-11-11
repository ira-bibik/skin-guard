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
  Query,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';

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
	findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 9
	) {
		return this.scheduleService.findAll(+page, +limit);
	}

	@Get(':scheduleId')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('scheduleId') id: string, @Request() req) {
		return this.scheduleService.findOneRequest(+id, req.user);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	update(
		@Param('id') id: string,
		@Body() updateScheduleDto: UpdateScheduleDto,
		@Request() req
	) {
		return this.scheduleService.update(+id, updateScheduleDto, req.user);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string, @Request() req) {
		return this.scheduleService.remove(+id, req.user);
	}
}
