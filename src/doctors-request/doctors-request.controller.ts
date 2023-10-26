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
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';

@Controller('request')
export class DoctorsRequestController {
	constructor(
		private readonly doctorsRequestService: DoctorsRequestService
	) {}

	@Post()
	//@UseGuards(JwtAuthGuard)
	@Roles('patient')
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

	@Get('myOwn')
	@Roles('doctor')
	@UseGuards(RolesGuard)
	findRequestByDoctorId(@Request() req) {
		return this.doctorsRequestService.findRequestByDoctorId(req.user);
	}

	@Patch(':id')
	@Roles('doctor')
	@UseGuards(RolesGuard)
	submit(@Param('id') id: string, @Request() req) {
		return this.doctorsRequestService.submit(+id, req.user);
	}

	@Delete(':id')
	@Roles('doctor')
	@UseGuards(RolesGuard)
	remove(@Param('id') id: string, @Request() req) {
		return this.doctorsRequestService.remove(+id, req.user);
	}
}
