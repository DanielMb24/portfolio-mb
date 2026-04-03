# Configuration Vercel - Portfolio MAKOSSO Daniel

## Backend déployé

✅ URL: `https://danielmb-api.vercel.app`

## Variables d'environnement à configurer sur Vercel (Backend)

Aller sur https://vercel.com/dashboard → Projet backend → Settings → Environment Variables

```env
MONGODB_URI=mongodb+srv://devgroupentreprise_db_user:LWC5S7GRgfB2KN84@cluster-dga-1.xylzvke.mongodb.net/daniel-makosso
JWT_SECRET=votre_jwt_secret_tres_securise_ici
JWT_EXPIRES_IN=24h
NODE_ENV=production
FRONTEND_URL=https://votre-frontend.vercel.app
ADMIN_EMAIL=admin@makosso-portfolio.com
ADMIN_PASSWORD=AdminSecure123!
MAX_FILE_SIZE=5242880
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mb.daniel241@gmail.com
SMTP_PASS=atsk egcv elxp epyk
EMAIL_FROM=Dapierre25@gmail.com
```

## Variables d'environnement à configurer sur Vercel (Frontend)

Aller sur https://vercel.com/dashboard → Projet frontend → Settings → Environment Variables

```env
VITE_API_URL=https://danielmb-api.vercel.app/api
```

## Déploiement Frontend

### Option 1: Via GitHub (Recommandé)

1. Push ton code sur GitHub
2. Connecte le repo à Vercel
3. Vercel détectera automatiquement Vite
4. Configure les variables d'environnement
5. Deploy!

### Option 2: Via CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

## Configuration MongoDB Atlas

1. Aller sur https://cloud.mongodb.com
2. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
3. Database Access → Vérifier que l'utilisateur a les droits nécessaires

## Tester l'API

### Health Check

```bash
curl https://danielmb-api.vercel.app/api/health
```

### Récupérer les projets

```bash
curl https://danielmb-api.vercel.app/api/portfolio/projects
```

### Récupérer les compétences

```bash
curl https://danielmb-api.vercel.app/api/portfolio/skills
```

### Récupérer les infos personnelles

```bash
curl https://danielmb-api.vercel.app/api/portfolio/info
```

## Structure des URLs

### Backend (API)

- Base: `https://danielmb-api.vercel.app`
- Health: `/api/health`
- Portfolio: `/api/portfolio/*`
- Auth: `/api/auth/*`
- Admin: `/api/admin/*`
- Contact: `/api/contact`

### Frontend

- Base: `https://votre-frontend.vercel.app`
- Home: `/`
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin/dashboard`

## CORS Configuration

Le backend accepte les requêtes de:

- `http://localhost:8080` (dev local)
- `http://localhost:5173` (Vite dev)
- `https://web-profile-pro-08.vercel.app`
- `https://danielmb.vercel.app`
- Tous les domaines `*.vercel.app`

## Problèmes courants

### 1. Erreur CORS

**Solution:** Ajouter l'URL du frontend dans `FRONTEND_URL` sur Vercel

### 2. MongoDB connection failed

**Solution:**

- Vérifier que l'IP 0.0.0.0/0 est autorisée dans MongoDB Atlas
- Vérifier que `MONGODB_URI` est correctement configuré

### 3. 404 sur les routes API

**Solution:** Vérifier que `vercel.json` est bien configuré dans le backend

### 4. Images ne s'affichent pas

**Solution:** Vercel a un système de fichiers en lecture seule. Utiliser Cloudinary ou AWS S3 pour les uploads en production.

## Commandes utiles

### Voir les logs backend

```bash
vercel logs danielmb-api
```

### Redéployer le backend

```bash
cd backend
vercel --prod --force
```

### Tester en local avec les variables Vercel

```bash
vercel env pull .env.local
npm run dev
```

## Checklist de déploiement

### Backend

- [x] Code pushé sur GitHub
- [x] Projet connecté à Vercel
- [x] `vercel.json` configuré
- [ ] Variables d'environnement configurées sur Vercel
- [ ] MongoDB Atlas accessible (IP 0.0.0.0/0)
- [x] CORS configuré pour le frontend
- [ ] Test de l'API health check

### Frontend

- [ ] Code pushé sur GitHub
- [ ] Projet connecté à Vercel
- [ ] `VITE_API_URL` configuré sur Vercel
- [ ] Build réussi
- [ ] Test de connexion à l'API
- [ ] Vérification du fallback sur données statiques

## Support

En cas de problème:

1. Vérifier les logs Vercel
2. Tester l'API avec curl
3. Vérifier la console du navigateur
4. Consulter `backend/TROUBLESHOOTING.md`
