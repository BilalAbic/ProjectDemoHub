# Backend Deployment Guide

## Azure Container Apps Deployment

### Required Environment Variables

⚠️ **IMPORTANT**: Azure Container Apps requires lowercase with hyphens (kebab-case).
The backend automatically maps these to UPPER_SNAKE_CASE format.

Azure Portal'da **Container Apps → Environment Variables** bölümünden şu değişkenleri ekleyin:

```bash
# Database (Azure PostgreSQL veya başka bir PostgreSQL instance)
database-url=postgresql://user:password@host:5432/database

# JWT Secrets (güçlü, rastgele değerler kullanın)
jwt-secret=your-super-secret-jwt-key-min-32-chars
jwt-refresh-secret=your-refresh-secret-key-even-longer

# Cloudinary (Image Storage)
cloudinary-cloud-name=your_cloud_name
cloudinary-api-key=your_api_key
cloudinary-api-secret=your_api_secret

# Admin User (İlk admin kullanıcısı için)
admin-email=admin@demohub.com
admin-password=YourStrongPassword123!

# Application Settings
port=4000
node-env=production
cors-origin=https://your-frontend-url.azurestaticapps.net
jwt-expires-in=30m
jwt-refresh-expires-in=7d
```

**Not**: Backend kodu bu değişkenleri otomatik olarak `DATABASE_URL`, `JWT_SECRET` vb. formatına çevirir.

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
