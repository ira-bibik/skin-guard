import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	UsePipes,
	ValidationPipe,
	Request,
} from '@nestjs/common';
import { DoctorsRequestService } from './doctors-request.service';
import { CreateDoctorsRequestDto } from './dto/create-doctors-request.dto';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../user/guards/roles.guard';
import { UserRole } from '../types/types';

@Controller('request')
export class DoctorsRequestController {
	constructor(
		private readonly doctorsRequestService: DoctorsRequestService
	) {}

	@Post()
	@Roles(UserRole.PATIENT)
	@UseGuards(RolesGuard)
	@UsePipes(new ValidationPipe())
	create(
		@Request() req,
		@Body() createDoctorsRequestDto: CreateDoctorsRequestDto
	) {
		return this.doctorsRequestService.create(
			req.user,
			createDoctorsRequestDto
		);
	}

	//is it neccessary?
	@Get()
	findAll() {
		return this.doctorsRequestService.findAll();
	}

	// @Get('myOwn')
	// @Roles(UserRole.DOCTOR)
	// @UseGuards(RolesGuard)
	// findRequestByDoctorId(@Request() req) {
	// 	return this.doctorsRequestService.findRequestByDoctorId(req.user);
	// }

	@Patch(':id')
	@Roles(UserRole.DOCTOR)
	@UseGuards(RolesGuard)
	submit(@Param('id') id: string, @Request() req) {
		return this.doctorsRequestService.submit(+id, req.user);
	}

	@Delete(':id')
	@Roles(UserRole.DOCTOR)
	@UseGuards(RolesGuard)
	remove(@Param('id') id: string, @Request() req) {
		return this.doctorsRequestService.remove(+id, req.user);
	}
}
