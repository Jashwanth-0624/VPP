import { BaseEntity } from './BaseEntity.js';

export class SensorData extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.timestamp = data.timestamp || new Date().toISOString();
    this.sensor_id = data.sensor_id || '';
    this.sensor_type = data.sensor_type || 'energy';
    this.value = data.value || 0;
    this.unit = data.unit || 'kW';
    this.location = data.location || '';
    this.status = data.status || 'active';
  }

  // Generate sample sensor data
  static async generateSampleData() {
    const sensorTypes = ['energy', 'temperature', 'voltage', 'current', 'frequency'];
    const locations = ['Building A', 'Building B', 'Building C', 'Campus Green', 'Energy Center'];
    
    for (let i = 0; i < 50; i++) {
      const sensorData = {
        sensor_id: `sensor_${i + 1}`,
        sensor_type: sensorTypes[Math.floor(Math.random() * sensorTypes.length)],
        value: Math.random() * 1000 + 100,
        unit: 'kW',
        location: locations[Math.floor(Math.random() * locations.length)],
        status: 'active',
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString()
      };
      
      await this.create(sensorData);
    }
  }
}
