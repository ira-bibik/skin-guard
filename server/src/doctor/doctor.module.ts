import { Module, forwardRef } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PatientModule } from '../patient/patient.module';
import { DoctorsRequestModule } from '../doctors-request/doctors-request.module';
import { UploadFilesModule } from '../upload-files/upload-files.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Doctor]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '30d' },
			}),
			inject: [ConfigService],
		}),
		PatientModule,
		forwardRef(() => DoctorsRequestModule),
		UploadFilesModule
	],
	controllers: [DoctorController],
	providers: [DoctorService],
	exports: [DoctorService],
})
export class DoctorModule {}
