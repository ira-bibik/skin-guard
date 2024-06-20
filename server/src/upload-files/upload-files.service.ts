import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadFilesService {
	private readonly s3Client = new S3Client({
		region: this.configService.getOrThrow('AWS_S3_REGION'),
		credentials: {
			accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
			secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
		},
	});

	constructor(private readonly configService: ConfigService) {}

	async uploadFile(originalname: string, dataBuffer: Buffer) {
		const fileName = `${uuidv4()}-${originalname}`;
		const encodeFileName = encodeURIComponent(fileName);
		const bucketName = this.configService.get('AWS_BUCKET_NAME');
		const command: PutObjectCommand = new PutObjectCommand({
			Bucket: bucketName,
			Key: fileName,
			Body: dataBuffer,
			ACL: 'public-read',
		});

		const uploadResult = await this.s3Client.send(command);

		return `https://${bucketName}.s3.amazonaws.com/${encodeFileName}`;

	}
}
