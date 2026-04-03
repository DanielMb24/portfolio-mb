# Déploiement Backend sur Vercel

## Prérequis

- Compte Vercel
- MongoDB Atlas configuré
- Variables d'environnement prêtes

## Étapes de déploiement

### 1. Installer Vercel CLI (optionnel)

```bash
npm install -g vercel
```

### 2. Se connecter à Vercel

```bash
vercel login
```

### 3. Déployer depuis le dossier backend

```bash
cd backend
vercel
```

### 4. Configurer les variables d'environnement sur Vercel

Aller dans les paramètres du projet sur Vercel et ajouter :

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=votre_secret_jwt_super_securise
FRONTEND_URL=https://votre-frontend.vercel.app
NODE_ENV=production
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
```

### 5. Redéployer après configuration

```bash
vercel --prod
```

## Structure des fichiers pour Vercel

```
backend/
├── api/
│   └── index.js          # Point d'entrée Vercel
├── config/
├── middleware/
├── models/
├── routes/
├── scripts/
├── server.js             # Application Express
├── vercel.json           # Configuration Vercel
├── .vercelignore         # Fichiers à ignorer
└── package.json
```

## Configuration vercel.json

Le fichier `vercel.json` configure :

- Le build avec `@vercel/node`
- Les routes pour rediriger vers `server.js`
- Les variables d'environnement

## Problèmes courants

### "Module not found"

- Vérifier que toutes les dépendances sont dans `package.json`
- S'assurer que `vercel.json` pointe vers le bon fichier

### Erreur de connexion MongoDB

- Vérifier que `MONGODB_URI` est bien configuré dans Vercel
- Autoriser l'IP de Vercel (0.0.0.0/0) dans MongoDB Atlas

### Uploads ne fonctionnent pas

- Vercel a un système de fichiers en lecture seule
- Utiliser un service externe (Cloudinary, AWS S3) pour les uploads en production

## Alternative : Déploiement via GitHub

1. Connecter le repo GitHub à Vercel
2. Sélectionner le dossier `backend` comme Root Directory
3. Configurer les variables d'environnement
4. Déployer automatiquement à chaque push

## URLs après déploiement

- Production: `https://votre-backend.vercel.app`
- API Health: `https://votre-backend.vercel.app/api/health`
- API Portfolio: `https://votre-backend.vercel.app/api/portfolio`

## Notes importantes

⚠️ **Limitations Vercel pour le backend :**

- Timeout de 10 secondes pour les fonctions serverless (plan gratuit)
- Système de fichiers en lecture seule (pas d'uploads locaux)
- Cold start possible (première requête plus lente)

💡 **Recommandations :**

- Utiliser MongoDB Atlas pour la base de données
- Utiliser Cloudinary ou AWS S3 pour les images
- Mettre en cache les requêtes fréquentes
- Considérer Railway, Render ou Heroku pour un backend traditionnel
