# Azure Container Apps Environment Variables Setup

## ⚠️ Önemli: Azure Naming Rules

Azure Container Apps environment variable isimleri:
- ✅ Sadece **küçük harf**, **rakam** ve **tire (-)** içerebilir
- ✅ Başlangıç ve bitiş **alfanumerik** olmalı
- ❌ **Underscore (_)** kullanılamaz
- ❌ **Büyük harf** kullanılamaz

## 🔧 Çözüm

Backend'e `src/config/env.ts` dosyası eklendi. Bu dosya Azure'ın kebab-case formatını otomatik olarak uygulama formatına (UPPER_SNAKE_CASE) çevirir.

## 📝 Azure Portal'da Ayarlanacak Environment Variables

Azure Portal → Container Apps → demohub-backend → Environment Variables:

| Name | Value | Description |
|------|-------|-------------|
| `database-url` | `postgresql://user:pass@host:5432/db` | PostgreSQL connection string |
| `jwt-secret` | `your-secret-min-32-chars` | JWT signing key |
| `jwt-refresh-secret` | `your-refresh-secret` | JWT refresh token key |
| `jwt-expires-in` | `30m` | Access token expiry |
| `jwt-refresh-expires-in` | `7d` | Refresh token expiry |
| `cloudinary-cloud-name` | `your_cloud_name` | Cloudinary cloud name |
| `cloudinary-api-key` | `your_api_key` | Cloudinary API key |
| `cloudinary-api-secret` | `your_api_secret` | Cloudinary API secret |
| `admin-email` | `admin@demohub.com` | Initial admin email |
| `admin-password` | `YourStrongPass123!` | Initial admin password |
| `port` | `4000` | Application port |
| `node-env` | `production` | Node environment |
| `cors-origin` | `https://your-frontend.azurestaticapps.net` | Frontend URL |

## 🔄 Otomatik Mapping

Backend başlatıldığında `src/config/env.ts` şu dönüşümleri yapar:

```
database-url          → DATABASE_URL
jwt-secret            → JWT_SECRET
jwt-refresh-secret    → JWT_REFRESH_SECRET
cloudinary-cloud-name → CLOUDINARY_CLOUD_NAME
cloudinary-api-key    → CLOUDINARY_API_KEY
cloudinary-api-secret → CLOUDINARY_API_SECRET
admin-email           → ADMIN_EMAIL
admin-password        → ADMIN_PASSWORD
cors-origin           → CORS_ORIGIN
node-env              → NODE_ENV
port                  → PORT
```

## ✅ Doğrulama

Deployment sonrası health check endpoint'ini test edin:

```bash
curl https://demohub-backend.azurecontainerapps.io/health
```

Beklenen yanıt:
```json
{
  "success": true,
  "message": "DemoHub API is running",
  "timestamp": "2025-10-30T...",
  "environment": "production"
}
```

## 🚀 Deployment Adımları

1. ✅ GitHub'a push yapın (workflow otomatik çalışacak)
2. ⏳ Workflow tamamlanmasını bekleyin (~5-10 dakika)
3. 🔧 Azure Portal'dan environment variables'ları yukarıdaki tabloya göre ayarlayın
4. 🔄 Container'ı restart edin (Azure Portal → Restart)
5. ✅ Health check endpoint'ini test edin
6. 🗄️ Database migration çalıştırın:
   ```bash
   az containerapp exec --name demohub-backend --resource-group demohub-rg \
     --command "npx prisma migrate deploy"
   ```
7. 🌱 Seed data ekleyin (opsiyonel):
   ```bash
   az containerapp exec --name demohub-backend --resource-group demohub-rg \
     --command "npx prisma db seed"
   ```

## 🐛 Troubleshooting

### Container başlamıyor
```bash
az containerapp logs show --name demohub-backend --resource-group demohub-rg --follow
```

### Environment variables kontrol
```bash
az containerapp show --name demohub-backend --resource-group demohub-rg \
  --query properties.template.containers[0].env
```

### Common Issues

1. **"The key must consist of lower case..."**
   - ❌ `DATABASE_URL` kullanmayın
   - ✅ `database-url` kullanın

2. **Database connection error**
   - `database-url` değerini kontrol edin
   - PostgreSQL'in Azure Container Apps'ten erişilebilir olduğundan emin olun

3. **CORS error**
   - `cors-origin` değerini frontend URL'iniz ile güncelleyin
   - Protokol dahil tam URL kullanın: `https://...`

4. **Image upload fails**
   - Cloudinary credentials'larını kontrol edin
   - Cloudinary hesabınızın aktif olduğundan emin olun
