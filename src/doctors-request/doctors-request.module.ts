import { Module } from '@nestjs/common';
import { DoctorsRequestService } from './doctors-request.service';
import { DoctorsRequestController } from './doctors-request.controller';

@Module({
  controllers: [DoctorsRequestController],
  providers: [DoctorsRequestService],
})
export class DoctorsRequestModule {}
