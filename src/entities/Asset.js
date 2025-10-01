import { BaseEntity } from './BaseEntity.js';

export class Asset extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.name = data.name || '';
    this.type = data.type || 'solar';
    this.capacity = data.capacity || 0;
    this.location = data.location || { x: 0, y: 0, building: '' };
    this.status = data.status || 'online';
    this.current_output = data.current_output || 0;
    this.efficiency = data.efficiency || 0;
  }

  // Generate some sample assets for demo
  static async generateSampleData() {
    const sampleAssets = [
      {
        name: 'Main Solar Array',
        type: 'solar',
        capacity: 250,
        location: { x: 100, y: 150, building: 'Engineering Building' },
        status: 'online',
        current_output: 180,
        efficiency: 92
      },
      {
        name: 'Wind Turbine A',
        type: 'wind',
        capacity: 100,
        location: { x: 200, y: 100, building: 'Campus Green' },
        status: 'online',
        current_output: 75,
        efficiency: 88
      },
      {
        name: 'Battery Bank 1',
        type: 'battery',
        capacity: 200,
        location: { x: 150, y: 200, building: 'Energy Center' },
        status: 'online',
        current_output: -45,
        efficiency: 95
      },
      {
        name: 'Grid Connection',
        type: 'grid',
        capacity: 500,
        location: { x: 50, y: 50, building: 'Main Substation' },
        status: 'online',
        current_output: 120,
        efficiency: 98
      },
      {
        name: 'Campus Load',
        type: 'load',
        capacity: 300,
        location: { x: 250, y: 250, building: 'All Buildings' },
        status: 'online',
        current_output: 280,
        efficiency: 85
      }
    ];

    for (const assetData of sampleAssets) {
      await this.create(assetData);
    }
  }
}
