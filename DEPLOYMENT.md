# 🚀 Deployment Guide - DemoHub

## 📋 Deployment Özeti

```
Frontend:  Azure Static Web Apps (Otomatik GitHub Actions)
Backend:   Railway / Render / Azure App Service
Database:  Railway PostgreSQL / Azure Database for PostgreSQL
Images:    Cloudinary (mevcut)
```

## ✅ Ön Hazırlık (Tamamlandı)

- [x] Frontend build test ✅
- [x] Backend build test ✅
- [x] TypeScript configuration ✅
- [x] Test dosyaları exclude edildi ✅
- [x] GitHub Actions workflow hazır ✅
- [x] Environment variables documented ✅

## 🎯 Azure Static Web Apps Deployment

### Adım 1: Azure Portal'da Static Web App Oluştur

1. **Azure Portal'a git**: https://portal.azure.com
2. **Create a resource** → **Static Web App**
3. **Basics** sekmesi:
   - **Subscription**: Seç
   - **Resource Group**: Yeni oluştur → `demohub-rg`
   - **Name**: `demohub-frontend`
   - **Plan type**: Free (hobby projeler için)
   - **Region**: `West Europe` veya `North Europe`
   - **Source**: GitHub
   - **GitHub Account**: Authorize et
   - **Organization**: Seç
   - **Repository**: `ProjectDemoHub` (veya repo adın)
   - **Branch**: `main`
4. **Build Details**:
   - **Build Presets**: Custom
   - **App location**: `/frontend`
   - **Api location**: (boş bırak)
   - **Output location**: `dist`
5. **Review + Create** → **Create**

### Adım 2: GitHub Secret Otomatik Eklenir

Azure otomatik olarak `AZURE_STATIC_WEB_APPS_API_TOKEN` secret'ını GitHub repo'na ekler.

Kontrol et:
- GitHub repo → **Settings** → **Secrets and variables** → **Actions**
- `AZURE_STATIC_WEB_APPS_API_TOKEN` görünmeli

### Adım 3: Environment Variables Ekle (Frontend)

Azure Portal → Static Web App → **Configuration** → **Application settings**

```
VITE_API_URL=https://your-backend.railway.app
```

### Adım 4: Deploy

```bash
# Commit ve push yap
git add .
git commit -m "feat: add Azure deployment configuration"
git push origin main

# GitHub Actions otomatik çalışır
# https://github.com/yourusername/ProjectDemoHub/actions
```

### Adım 5: Custom Domain (Opsiyonel)

Azure Portal → Static Web App → **Custom domains** → **Add**

---

## 🚂 Railway Backend Deployment

### Adım 1: Railway Hesabı

1. **Railway'e git**: https://railway.app
2. **Sign up with GitHub**
3. **New Project** → **Deploy from GitHub repo**
4. **Select Repository**: `ProjectDemoHub`
5. **Add variables** (sonraki adımda)

### Adım 2: PostgreSQL Ekle

1. Railway Dashboard → **New** → **Database** → **PostgreSQL**
2. Otomatik `DATABASE_URL` oluşur

### Adım 3: Environment Variables

Railway Dashboard → Backend Service → **Variables**

```env
# Database (otomatik eklenir)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# JWT
JWT_SECRET=your-super-secret-key-min-32-characters-long
JWT_ACCESS_EXPIRY=30m
JWT_REFRESH_EXPIRY=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# CORS
CORS_ORIGIN=https://demohub-frontend.azurestaticapps.net

# Node
NODE_ENV=production
PORT=4000
```

### Adım 4: Build Settings

Railway otomatik detect eder ama kontrol et:

- **Root Directory**: `/backend`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### Adım 5: Database Migration

Railway Dashboard → Backend Service → **Settings** → **Deploy**

Veya Railway CLI:
```bash
# Railway CLI kur
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Run migration
railway run npm run prisma:migrate deploy

# Seed database
railway run npm run prisma:seed
```

### Adım 6: Domain Al

Railway Dashboard → Backend Service → **Settings** → **Networking**
- **Generate Domain** → `your-app.railway.app`

---

## 🔄 CORS Güncelleme

Backend'de CORS'u Azure frontend URL'i ile güncelle:

```typescript
// backend/src/server.ts
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://demohub-frontend.azurestaticapps.net',
  credentials: true
}));
```

Commit ve push:
```bash
git add backend/src/server.ts
git commit -m "fix: update CORS for Azure frontend"
git push
```

---

## ✅ Deployment Checklist

### Frontend (Azure Static Web Apps)
- [ ] Azure Static Web App oluşturuldu
- [ ] GitHub Actions workflow çalışıyor
- [ ] `VITE_API_URL` environment variable eklendi
- [ ] Build başarılı
- [ ] Site açılıyor: `https://demohub-frontend.azurestaticapps.net`

### Backend (Railway)
- [ ] Railway project oluşturuldu
- [ ] PostgreSQL database eklendi
- [ ] Environment variables eklendi
- [ ] Build başarılı
- [ ] Database migration çalıştırıldı
- [ ] Database seed edildi
- [ ] API çalışıyor: `https://your-app.railway.app/health`

### Integration
- [ ] Frontend backend'e bağlanabiliyor
- [ ] CORS düzgün çalışıyor
- [ ] Login çalışıyor
- [ ] Image upload çalışıyor (Cloudinary)
- [ ] Tüm CRUD operasyonları çalışıyor

---

## 🧪 Test Deployment

### Frontend Test
```bash
# Azure URL'i aç
https://demohub-frontend.azurestaticapps.net

# Kontrol et:
- [ ] Ana sayfa açılıyor
- [ ] Projeler listeleniyor
- [ ] Filtreleme çalışıyor
- [ ] Pagination çalışıyor
- [ ] Project detail modal açılıyor
```

### Backend Test
```bash
# Health check
curl https://your-app.railway.app/health

# Technologies endpoint
curl https://your-app.railway.app/api/technologies

# Projects endpoint
curl https://your-app.railway.app/api/projects
```

### Admin Panel Test
```bash
# Login sayfası
https://demohub-frontend.azurestaticapps.net/admin/login

# Test credentials (seed data):
Email: admin@demohub.com
Password: admin123

# Kontrol et:
- [ ] Login çalışıyor
- [ ] Dashboard açılıyor
- [ ] Projects listesi görünüyor
- [ ] Project create çalışıyor
- [ ] Image upload çalışıyor
- [ ] Project edit çalışıyor
- [ ] Project delete çalışıyor
```

---

## 🐛 Troubleshooting

### Frontend Build Hatası
```bash
# Local'de test et
cd frontend
npm run build

# Hata varsa:
npm install
npm run build
```

### Backend Build Hatası
```bash
# Local'de test et
cd backend
npm run build

# Prisma generate
npm run prisma:generate
```

### CORS Hatası
```
Access to XMLHttpRequest at 'https://backend.railway.app' from origin 
'https://frontend.azurestaticapps.net' has been blocked by CORS policy
```

**Çözüm**: Backend'de `CORS_ORIGIN` environment variable'ı güncelle

### Database Connection Hatası
```
Error: P1001: Can't reach database server
```

**Çözüm**: 
1. Railway'de PostgreSQL çalışıyor mu kontrol et
2. `DATABASE_URL` doğru mu kontrol et
3. Railway'de database migration çalıştır

### 404 Hatası (Frontend Routes)
Azure Static Web Apps için `staticwebapp.config.json` gerekebilir:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/*.{css,js,png,jpg,gif,svg,ico}"]
  }
}
```

---

## 💰 Maliyet Tahmini

### Azure + Railway
```
Azure Static Web Apps:  Ücretsiz (100GB/ay)
Railway Backend:        $5-10/ay
Railway PostgreSQL:     Dahil
Cloudinary:            Ücretsiz (25 credits/ay)
────────────────────────────────────────
TOPLAM:                ~$5-10/ay
```

### İlk Ay Ücretsiz
- Railway: $5 ücretsiz credit
- Azure: Ücretsiz tier
- **İlk ay maliyet: $0**

---

## 📞 Support

Sorun yaşarsan:
1. GitHub Actions logs kontrol et
2. Railway logs kontrol et
3. Browser console kontrol et
4. Network tab kontrol et

---

## 🎉 Deployment Tamamlandı!

Deployment başarılı olduğunda:

**Frontend**: https://demohub-frontend.azurestaticapps.net  
**Backend**: https://your-app.railway.app  
**Admin**: https://demohub-frontend.azurestaticapps.net/admin

Tebrikler! 🚀
