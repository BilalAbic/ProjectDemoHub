/**
 * Environment Variable Mapping
 * Azure Container Apps requires kebab-case env vars (lowercase with hyphens)
 * This file maps them to the underscore format used in the application
 */

// Map Azure-friendly names to application names
const envMapping: Record<string, string> = {
  'database-url': 'DATABASE_URL',
  'jwt-secret': 'JWT_SECRET',
  'jwt-refresh-secret': 'JWT_REFRESH_SECRET',
  'jwt-expires-in': 'JWT_EXPIRES_IN',
  'jwt-refresh-expires-in': 'JWT_REFRESH_EXPIRES_IN',
  'cloudinary-cloud-name': 'CLOUDINARY_CLOUD_NAME',
  'cloudinary-api-key': 'CLOUDINARY_API_KEY',
  'cloudinary-api-secret': 'CLOUDINARY_API_SECRET',
  'admin-email': 'ADMIN_EMAIL',
  'admin-password': 'ADMIN_PASSWORD',
  'cors-origin': 'CORS_ORIGIN',
  'node-env': 'NODE_ENV',
  'port': 'PORT',
};

// Apply mapping at startup
Object.entries(envMapping).forEach(([azureName, appName]) => {
  const azureValue = process.env[azureName];
  if (azureValue && !process.env[appName]) {
    process.env[appName] = azureValue;
  }
});

export default envMapping;
