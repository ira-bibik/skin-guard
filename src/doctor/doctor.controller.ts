import { Controller, Get, Post,Request, Body, Patch, Param, Delete, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { PatientService } from 'src/patient/patient.service';

@Controller('doctor')
export class DoctorController {
	constructor(
		private readonly doctorService: DoctorService,
		private readonly patientService: PatientService
	) {}

	@Get()
	findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 9
	) {
		return this.doctorService.findAll(+page, +limit);
	}

	@Get('profile')
	@Roles('doctor')
	@UseGuards(RolesGuard)
	getMe(@Request() req) {
		return this.doctorService.findOneByDoctorId(req.user.idByRole);
	}

	@Get('patients')
	@Roles('doctor')
	@UseGuards(RolesGuard)
	findPatientsByDoctorId(
		@Request() req,
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 9
	) {
		return this.patientService.findPatientsByDoctorId(
			req.user.idByRole,
			+page,
			+limit
		);
	}

	@Get('users/:userId')
	@UseGuards(JwtAuthGuard)
	findOneByUserId(@Param('userId') id: string) {
		return this.doctorService.findOneByUserId(+id);
	}

	@Get(':doctorId')
	@UseGuards(JwtAuthGuard)
	findOneByDoctorId(@Param('doctorId') id: string) {
		return this.doctorService.findOneByDoctorId(+id);
	}

	@Patch()
	@Roles('doctor')
	@UseGuards(RolesGuard)
	@UsePipes(new ValidationPipe())
	update(@Request() req, @Body() updateDoctorDto: UpdateDoctorDto) {
		return this.doctorService.update(req.user.idByRole, updateDoctorDto);
	}
}
