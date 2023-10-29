import { Module, forwardRef } from '@nestjs/common';
import { DoctorsRequestService } from './doctors-request.service';
import { DoctorsRequestController } from './doctors-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DoctorsRequest } from './entities/doctors-request.entity';
import { PatientModule } from 'src/patient/patient.module';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([DoctorsRequest]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '30d' },
			}),
			inject: [ConfigService],
		}),
		PatientModule,
		forwardRef(()=>DoctorModule)
	],
	controllers: [DoctorsRequestController],
	providers: [DoctorsRequestService],
	exports: [DoctorsRequestService]
})
export class DoctorsRequestModule {}
