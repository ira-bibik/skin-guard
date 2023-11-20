import { Module } from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => [
				{
					ttl: configService.getOrThrow('UPLOAD_RATE_TTL'),
					limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
				},
			],
			inject: [ConfigService],
		}),
	],
	providers: [
		UploadFilesService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
	exports: [UploadFilesService],
})
export class UploadFilesModule {}
