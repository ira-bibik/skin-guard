import {
	Controller,
	Get,
	Request,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@Controller('patient')
export class PatientController {
	constructor(private readonly patientService: PatientService) {}

	@Get()
	findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 9
	) {
		return this.patientService.findAll(+page, +limit);
	}

	@Get('profile')
	@Roles('patient')
	@UseGuards(RolesGuard)
	getMe(@Request() req) {
		return this.patientService.findOneByPatientId(req.user.idByRole);
	}

	@Get('users/:userId')
	@UseGuards(JwtAuthGuard)
	findOneByUserId(@Param('userId') id: string) {
		return this.patientService.findOneByUserId(+id);
	}

	@Get(':patientId')
	@UseGuards(JwtAuthGuard)
	findOneByDoctorId(@Param('patientId') id: string) {
		return this.patientService.findOneByPatientId(+id);
	}

	@Patch()
	@Roles('patient')
	@UseGuards(RolesGuard)
	@UsePipes(new ValidationPipe())
	update(@Request() req, @Body() updatePatientDto: UpdatePatientDto) {
		return this.patientService.update(req.user.idByRole, updatePatientDto);
	}
}
