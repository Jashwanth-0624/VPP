import { BaseEntity } from './BaseEntity.js';

export class Alert extends BaseEntity {
  constructor(data = {}) {
    super(data);
    this.type = data.type || 'info';
    this.title = data.title || '';
    this.message = data.message || '';
    this.priority = data.priority || 'low';
    this.status = data.status || 'active';
    this.action_required = data.action_required || false;
    this.resolved_date = data.resolved_date || null;
  }

  // Generate sample alerts
  static async generateSampleData() {
    const sampleAlerts = [
      {
        type: 'warning',
        title: 'High Grid Usage',
        message: 'Campus consuming more than optimal from grid. Consider load shifting.',
        priority: 'medium',
        action_required: true,
        status: 'active'
      },
      {
        type: 'recommendation',
        title: 'Solar Surplus Available',
        message: 'Excess solar generation detected. Ideal time to run non-critical loads.',
        priority: 'low',
        action_required: false,
        status: 'active'
      },
      {
        type: 'info',
        title: 'Battery Charging',
        message: 'Battery system automatically charging from solar surplus.',
        priority: 'low',
        action_required: false,
        status: 'active'
      },
      {
        type: 'critical',
        title: 'System Maintenance Required',
        message: 'Wind turbine requires scheduled maintenance within 48 hours.',
        priority: 'high',
        action_required: true,
        status: 'active'
      }
    ];

    for (const alertData of sampleAlerts) {
      await this.create(alertData);
    }
  }
}
