import { Module, forwardRef } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PatientModule } from 'src/patient/patient.module';
import { Product } from 'src/product/entities/product.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Schedule, Product]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '30d' },
			}),
			inject: [ConfigService],
    }),
    forwardRef(() => PatientModule)
	],
	controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService]
})
export class ScheduleModule {}
