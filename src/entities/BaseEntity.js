// Base entity class for data management
export class BaseEntity {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.created_date = data.created_date || new Date().toISOString();
    this.updated_date = data.updated_date || new Date().toISOString();
    Object.assign(this, data);
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Mock storage - in a real app, this would connect to a database
  static storage = new Map();

  static async create(data) {
    const entity = new this(data);
    this.storage.set(entity.id, entity);
    return entity;
  }

  static async get(id) {
    return this.storage.get(id) || null;
  }

  static async list(sortBy = null, limit = null) {
    let entities = Array.from(this.storage.values());
    
    if (sortBy) {
      const [field, direction] = sortBy.startsWith('-') 
        ? [sortBy.slice(1), 'desc'] 
        : [sortBy, 'asc'];
      
      entities.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        
        if (direction === 'desc') {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }
    
    if (limit) {
      entities = entities.slice(0, limit);
    }
    
    return entities;
  }

  static async update(id, data) {
    const entity = this.storage.get(id);
    if (entity) {
      Object.assign(entity, data, { updated_date: new Date().toISOString() });
      this.storage.set(id, entity);
      return entity;
    }
    return null;
  }

  static async delete(id) {
    return this.storage.delete(id);
  }

  async save() {
    this.updated_date = new Date().toISOString();
    this.constructor.storage.set(this.id, this);
    return this;
  }
}
