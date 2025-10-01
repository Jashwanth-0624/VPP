// Utility function to create page URLs
export const createPageUrl = (pageName) => {
  const pageMap = {
    'Dashboard': '/dashboard',
    'DigitalTwin': '/digital-twin',
    'Analytics': '/analytics',
    'Simulator': '/simulator',
    'Reports': '/reports',
    'Settings': '/settings'
  };
  
  return pageMap[pageName] || '/';
};

// Utility function to merge class names
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Format numbers with appropriate units
export const formatNumber = (num, decimals = 1) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  }
  return num.toFixed(decimals);
};

// Format currency (default to INR/Rupees)
export const formatCurrency = (amount, currency = 'INR') => {
  const value = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Format percentage
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Simple file download helper
export const downloadBlob = (blob, fileName) => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Theme persistence helpers
export const getStoredTheme = () => {
  try {
    return localStorage.getItem('vpp-theme') || 'light';
  } catch (_) {
    return 'light';
  }
};

export const setStoredTheme = (theme) => {
  try {
    localStorage.setItem('vpp-theme', theme);
  } catch (_) {}
};
