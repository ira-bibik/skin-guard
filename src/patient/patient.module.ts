import { Module, forwardRef } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { UploadFilesModule } from 'src/upload-files/upload-files.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Patient]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '30d' },
			}),
			inject: [ConfigService],
		}),
		forwardRef(() => ScheduleModule),
		UploadFilesModule
	],
	controllers: [PatientController],
	providers: [PatientService],
	exports: [PatientService],
})
export class PatientModule {}
