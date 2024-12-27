import { config } from '../config';

export function isDevelopment() {
  return config.app.env === 'local' || config.app.env === 'development';
}

export function isProduction() {
  return config.app.env === 'production';
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}