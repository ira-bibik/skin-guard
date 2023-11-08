import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { ProductModule } from './product/product.module';
import { ScheduleModule } from './schedule/schedule.module';
import { DoctorsRequestModule } from './doctors-request/doctors-request.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFilesModule } from './upload-files/upload-files.module';

@Module({
	imports: [
		UserModule,
		DoctorModule,
		PatientModule,
		ProductModule,
		ScheduleModule,
		DoctorsRequestModule,
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configSevice: ConfigService) => ({
				type: 'postgres',
				host: configSevice.get('DB_HOST'),
				port: configSevice.get('DB_PORT'),
				username: configSevice.get('DB_USERNAME'),
				password: configSevice.get('DB_PASSWORD'),
				database: configSevice.get('DB_NAME'),
				synchronize: true,
				entities: [__dirname + '/**/*.entity{.js, .ts}'],
			}),
			inject: [ConfigService],
		}),
		UploadFilesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
