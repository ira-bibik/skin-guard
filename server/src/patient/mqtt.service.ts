import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
	private client: mqtt.MqttClient;

	constructor() {
		this.client = mqtt.connect('mqtt://broker.emqx.io');

		this.client.on('connect', () => {
			console.log('Connected to MQTT broker');
		});

		this.client.on('error', (error) => {
			console.error('MQTT connection error:', error);
		});
	}

	publish(topic: string, message: string): void {
		this.client.publish(topic, message);
	}
}
