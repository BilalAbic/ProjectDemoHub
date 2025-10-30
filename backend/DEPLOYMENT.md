# Backend Deployment Guide

## Azure Container Apps Deployment

### Required Environment Variables

Azure Container Apps'te aşağıdaki environment variables'ları ayarlamanız gerekiyor:

```bash
# Database (Azure PostgreSQL veya başka bir PostgreSQL instance)
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT Secrets (güçlü, rastgele değerler kullanın)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-even-longer

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin User (İlk admin kullanıcısı için)
ADMIN_EMAIL=admin@demohub.com
ADMIN_PASSWORD=YourStrongPassword123!

# Application Settings
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.azurestaticapps.net
JWT_EXPIRES_IN=30m
JWT_REFRESH_EXPIRES_IN=7d
```

### Azure Container Apps Configuration

1. **Container Registry**: demohubregistry.azurecr.io
2. **Container App Name**: demohub-backend
3. **Resource Group**: demohub-rg
4. **Target Port**: 4000
5. **Min Replicas**: 1
6. **Max Replicas**: 3

### GitHub Secrets Required

Aşağıdaki secrets'ları GitHub repository'nizde ayarlayın:

```
DEMOHUBBACKEND_AZURE_CLIENT_ID
DEMOHUBBACKEND_AZURE_TENANT_ID
DEMOHUBBACKEND_AZURE_SUBSCRIPTION_ID
DEMOHUBBACKEND_REGISTRY_USERNAME
DEMOHUBBACKEND_REGISTRY_PASSWORD
```

### Database Migration

Container başlatıldıktan sonra, Prisma migrations'ı çalıştırmanız gerekebilir:

```bash
# Azure Container Apps Console'dan veya Azure CLI ile
az containerapp exec --name demohub-backend --resource-group demohub-rg \
  --command "npx prisma migrate deploy"
```

### Health Check

Deployment sonrası health check endpoint'ini test edin:

```bash
curl https://demohub-backend.azurecontainerapps.io/health
```

Expected response:
```json
{
  "success": true,
  "message": "DemoHub API is running",
  "timestamp": "2025-10-30T...",
  "environment": "production"
}
```

### Troubleshooting

1. **Container başlamıyor**: Environment variables'ları kontrol edin
2. **Database bağlantı hatası**: DATABASE_URL'i kontrol edin
3. **Image upload çalışmıyor**: Cloudinary credentials'ları kontrol edin
4. **CORS hatası**: CORS_ORIGIN'i frontend URL'iniz ile güncelleyin

### Monitoring

Azure Portal'dan Container Apps logs'larını izleyin:

```bash
az containerapp logs show --name demohub-backend --resource-group demohub-rg --follow
```
