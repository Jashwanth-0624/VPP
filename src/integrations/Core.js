// Mock LLM integration for demo purposes
// In a real application, this would connect to an actual AI service
export const InvokeLLM = async ({ prompt, response_json_schema }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Generate mock data based on the prompt and schema
  const mockData = generateMockData(prompt, response_json_schema);
  
  return mockData;
};

const generateMockData = (prompt, schema) => {
  const data = {};
  
  if (schema.properties) {
    Object.keys(schema.properties).forEach(key => {
      const property = schema.properties[key];
      
      switch (property.type) {
        case 'number':
          data[key] = Math.random() * 1000 + 100;
          break;
        case 'string':
          data[key] = generateMockString(key);
          break;
        case 'boolean':
          data[key] = Math.random() > 0.5;
          break;
        case 'array':
          data[key] = generateMockArray(property.items);
          break;
        case 'object':
          data[key] = generateMockObject(property.properties);
          break;
        default:
          data[key] = null;
      }
    });
  }
  
  return data;
};

const generateMockString = (key) => {
  const mockStrings = {
    action: ['Optimize HVAC', 'Shift Load', 'Charge Battery', 'Export to Grid'],
    asset: ['Solar Panel Array', 'Wind Turbine', 'Battery Bank', 'Smart Meter'],
    priority: ['High', 'Medium', 'Low'],
    title: ['Energy Optimization', 'Load Management', 'Battery Control'],
    description: ['Automated energy management', 'Smart grid integration', 'Renewable optimization'],
    impact: ['High savings potential', 'Moderate impact', 'Low risk']
  };
  
  const options = mockStrings[key] || ['Default Value'];
  return options[Math.floor(Math.random() * options.length)];
};

const generateMockArray = (itemSchema) => {
  const length = Math.floor(Math.random() * 5) + 1;
  const array = [];
  
  for (let i = 0; i < length; i++) {
    if (itemSchema.type === 'object') {
      array.push(generateMockObject(itemSchema.properties));
    } else {
      array.push(generateMockData('', itemSchema));
    }
  }
  
  return array;
};

const generateMockObject = (properties) => {
  const obj = {};
  
  if (properties) {
    Object.keys(properties).forEach(key => {
      const property = properties[key];
      obj[key] = generateMockData('', { properties: { [key]: property } })[key];
    });
  }
  
  return obj;
};
