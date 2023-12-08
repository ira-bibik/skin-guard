import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class MqttService {
	private client: mqtt.MqttClient;

	constructor(private readonly patientService: PatientService) {
		this.client = mqtt.connect('mqtt://broker.emqx.io');

		this.client.on('connect', () => {
			console.log('Connected to MQTT broker');
			this.client.subscribe('NewTopic/SkinGuard/skinType/receive');
		});

		

		this.client.on('error', (error) => {
			console.error('MQTT connection error:', error);
		});
	}

	publish(id: string): void {
		this.client.publish('NewTopic/SkinGuard/skinType', id);
		this.client.on('message', (topic, message) => {
			this.updateSkinType(id, message.toString());
		});
	}

	updateSkinType(patientd: string, type: string) {
		const updatePatientDto: UpdatePatientDto = {
			skinType: type,
		};
		this.patientService.update(patientd, updatePatientDto);
	}
}
