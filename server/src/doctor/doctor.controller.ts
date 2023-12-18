import {
	Controller,
	Get,
	Post,
	Request,
	Body,
	Patch,
	Param,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
	UploadedFile,
	UseInterceptors,
	ParseFilePipe,
	FileTypeValidator,
	MaxFileSizeValidator,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../user/guards/roles.guard';
import { PatientService } from '../patient/patient.service';
import { DoctorsRequestService } from '../doctors-request/doctors-request.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRole } from '../types/types';

@Controller('users/doctors')
export class DoctorController {
	constructor(
		private readonly doctorService: DoctorService,
		private readonly patientService: PatientService,
		private readonly doctorsRequestService: DoctorsRequestService
	) {}

	@Post('uploadPhoto')
	@Roles(UserRole.DOCTOR)
	@UseGuards(RolesGuard)
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					// new MaxFileSizeValidator({ maxSize: 1000 }),
					// new FileTypeValidator({ fileType: 'image/jpeg' }),
				],
			})
		)
		file: Express.Multer.File,
		@Request() req
	) {
		return await this.doctorService.upload(
			file.originalname,
			file.buffer,
			+req.user.idByRole
		);
	}

	@Get('/all')
	findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 9
	) {
		return this.doctorService.findAll(+page, +limit);
	}

	@Get('me')
	@Roles(UserRole.DOCTOR)
	@UseGuards(RolesGuard)
	getMe(@Request() req) {
		return this.doctorService.findOneByDoctorId(req.user.idByRole);
	}

	@Get('me/patients')
	@Roles(UserRole.DOCTOR)
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

	@Get('me/requests')
	@Roles(UserRole.DOCTOR)
	@UseGuards(RolesGuard)
	findRequestByDoctorId(@Request() req) {
		return this.doctorsRequestService.findRequestByDoctorId(req.user);
	}

	@Get(':doctorId')
	@UseGuards(JwtAuthGuard)
	findOneByDoctorId(@Param('doctorId') id: string) {
		return this.doctorService.findOneByDoctorId(+id);
	}

	@Patch()
	@Roles(UserRole.DOCTOR)
	@UseGuards(RolesGuard)
	@UsePipes(new ValidationPipe())
	update(@Request() req, @Body() updateDoctorDto: UpdateDoctorDto) {
		return this.doctorService.update(req.user.idByRole, updateDoctorDto);
	}
}
