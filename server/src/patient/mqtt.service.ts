import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Console } from 'console';

@Injectable()
export class MqttService {
	private client: mqtt.MqttClient;

	constructor(private readonly patientService: PatientService) {
		this.client = mqtt.connect('mqtt://broker.emqx.io');

		this.client.on('connect', () => {
			console.log('Connected to MQTT broker');
		});

		this.client.on('error', (error) => {
			console.error('MQTT connection error:', error);
		});
	}

	publish(id: string): void {
		// const data = this.client.subscribe(
		// 	'NewTopic/SkinGuard/skinType/receive',
		// 	function onSubscribe(err, granted) {
		// 		if (err) {
		// 			console.log('subscribe errors:', err);
		// 		}
		// 		if (granted) {
		// 			console.log('subscribe granted:', granted);
		// 		}
		// 	}
		// );
		this.client.publish('NewTopic/SkinGuard/skinType', id);
	}

	updateSkinType(patientd: string, type: string) {
		const updatePatientDto: UpdatePatientDto = {
			skinType: type,
		};
		this.patientService.update(patientd, updatePatientDto);
	}
}
