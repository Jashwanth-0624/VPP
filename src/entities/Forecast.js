import { BaseEntity } from './BaseEntity.js';

export class Forecast extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.forecast_time = data.forecast_time || new Date().toISOString();
    this.horizon_hours = data.horizon_hours || 24;
    this.predicted_generation = data.predicted_generation || 0;
    this.predicted_demand = data.predicted_demand || 0;
    this.weather_forecast = data.weather_forecast || {
      temperature: 0,
      wind_speed: 0,
      cloud_cover: 0,
      solar_irradiance: 0
    };
    this.recommendations = data.recommendations || [];
  }

  // Generate sample forecast data
  static async generateSampleData() {
    const sampleForecast = {
      forecast_time: new Date().toISOString(),
      horizon_hours: 24,
      predicted_generation: 285.5,
      predicted_demand: 320.2,
      weather_forecast: {
        temperature: 22.5,
        wind_speed: 8.2,
        cloud_cover: 15,
        solar_irradiance: 850
      },
      recommendations: [
        {
          action: 'Optimize HVAC',
          asset: 'Building A',
          priority: 'High',
          savings_estimate: 25.5
        },
        {
          action: 'Shift Load',
          asset: 'Campus Load',
          priority: 'Medium',
          savings_estimate: 15.2
        }
      ]
    };

    await this.create(sampleForecast);
  }
}
