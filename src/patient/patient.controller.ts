import {
	Controller,
	Get,
	Request,
	Body,
	Patch,
	Param,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
	UseInterceptors,
	Post,
	UploadedFile,
	ParseFilePipe,
	FileTypeValidator,
	MaxFileSizeValidator,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { ScheduleService } from 'src/schedule/schedule.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users/patients')
export class PatientController {
	constructor(
		private readonly patientService: PatientService,
		private readonly scheduleService: ScheduleService
	) {}

	@Post('uploadPhoto')
	@Roles('patient')
	@UseGuards(RolesGuard)
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					// new MaxFileSizeValidator({ maxSize: 1000 }),
					new FileTypeValidator({ fileType: 'image/jpeg' }),
				],
			})
		)
		file: Express.Multer.File,
		@Request() req
	) {
		return await this.patientService.upload(
			file.originalname,
			file.buffer,
			+req.user.idByRole
		);
	}


	@Get('all')
	@Roles('admin')
	@UseGuards(RolesGuard)
	findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 9
	) {
		return this.patientService.findAll(+page, +limit);
	}

	@Get('me')
	@Roles('patient')
	@UseGuards(RolesGuard)
	getMe(@Request() req) {
		return this.patientService.findOneByPatientId(
			req.user,
			req.user.idByRole
		);
	}

	@Get(':patientId')
	@UseGuards(JwtAuthGuard)
	findOneByPatientId(@Request() req, @Param('patientId') id: string) {
		return this.patientService.findOneByPatientId(req.user, +id);
	}

	@Get(':patientId/schedule')
	@UseGuards(JwtAuthGuard)
	findAllByPatientId(@Request() req, @Param('patientId') id: string) {
		return this.scheduleService.findSchedulesByPatientId(req.user, +id);
	}

	@Patch()
	@Roles('patient')
	@UseGuards(RolesGuard)
	@UsePipes(new ValidationPipe())
	update(@Request() req, @Body() updatePatientDto: UpdatePatientDto) {
		return this.patientService.update(req.user.idByRole, updatePatientDto);
	}

	@Patch('/unsubmit')
	@Roles('patient')
	@UseGuards(RolesGuard)
	//@UsePipes(new ValidationPipe())
	deleteDoctor(@Request() req) {
		return this.patientService.deleteDoctor(req.user);
	}
}
