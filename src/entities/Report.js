import { BaseEntity } from './BaseEntity.js';

export class Report extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.report_type = data.report_type || 'daily';
    this.start_date = data.start_date || new Date().toISOString();
    this.end_date = data.end_date || new Date().toISOString();
    this.format = data.format || 'pdf';
    this.total_generation = data.total_generation || 0;
    this.total_consumption = data.total_consumption || 0;
    this.grid_import = data.grid_import || 0;
    this.grid_export = data.grid_export || 0;
    this.cost_savings = data.cost_savings || 0;
    this.carbon_savings = data.carbon_savings || 0;
    this.renewable_percentage = data.renewable_percentage || 0;
    this.status = data.status || 'completed';
  }

  // Generate sample reports
  static async generateSampleData() {
    const sampleReports = [
      {
        report_type: 'daily',
        start_date: new Date(Date.now() - 86400000).toISOString(),
        end_date: new Date().toISOString(),
        total_generation: 2850.5,
        total_consumption: 3200.2,
        grid_import: 450.7,
        grid_export: 105.0,
        cost_savings: 125.50,
        carbon_savings: 285.2,
        renewable_percentage: 87.5,
        status: 'completed'
      },
      {
        report_type: 'weekly',
        start_date: new Date(Date.now() - 604800000).toISOString(),
        end_date: new Date().toISOString(),
        total_generation: 19950.5,
        total_consumption: 22400.2,
        grid_import: 3150.7,
        grid_export: 735.0,
        cost_savings: 878.50,
        carbon_savings: 1995.2,
        renewable_percentage: 89.1,
        status: 'completed'
      }
    ];

    for (const reportData of sampleReports) {
      await this.create(reportData);
    }
  }
}
