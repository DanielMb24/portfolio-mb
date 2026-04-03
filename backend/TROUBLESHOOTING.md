# Résolution des problèmes de déploiement Vercel

## Erreur "Module not found"

### Causes possibles :

1. **Dépendances manquantes dans package.json**

   ```bash
   # Vérifier que toutes les dépendances sont installées
   cd backend
   npm install
   ```

2. **Chemins d'import incorrects**
   - Vérifier que tous les `require()` utilisent des chemins relatifs corrects
   - Exemple : `require('./config/database')` au lieu de `require('config/database')`

3. **Fichiers manquants dans le déploiement**
   - Vérifier que `.vercelignore` n'exclut pas de fichiers nécessaires
   - S'assurer que tous les fichiers sont commités dans Git

### Solutions :

#### Solution 1 : Vérifier la structure

```bash
# Dans le dossier backend
ls -la routes/
ls -la config/
ls -la models/
ls -la middleware/
```

#### Solution 2 : Réinstaller les dépendances

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

#### Solution 3 : Tester localement

```bash
cd backend
npm start
# Vérifier que le serveur démarre sans erreur
```

#### Solution 4 : Déployer avec Vercel CLI

```bash
cd backend
vercel --prod
# Suivre les logs pour voir l'erreur exacte
```

## Erreur de connexion MongoDB

### Vérifications :

1. MongoDB Atlas autorise l'IP `0.0.0.0/0`
2. Variable `MONGODB_URI` configurée dans Vercel
3. Format de l'URI correct : `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

## Erreur CORS

### Solution :

Ajouter l'URL du frontend dans les variables d'environnement Vercel :

```
FRONTEND_URL=https://votre-frontend.vercel.app
```

## Timeout Vercel (10 secondes)

### Solutions :

1. Optimiser les requêtes MongoDB (indexes)
2. Utiliser le caching
3. Considérer un autre hébergeur (Railway, Render)

## Uploads ne fonctionnent pas

### Problème :

Vercel a un système de fichiers en lecture seule

### Solution :

Utiliser un service externe :

- Cloudinary (recommandé)
- AWS S3
- Uploadcare

## Commandes utiles

### Voir les logs Vercel

```bash
vercel logs
```

### Redéployer

```bash
vercel --prod --force
```

### Tester en local avec variables Vercel

```bash
vercel env pull .env.local
npm start
```

## Checklist avant déploiement

- [ ] Toutes les dépendances dans `package.json`
- [ ] `vercel.json` configuré
- [ ] Variables d'environnement ajoutées sur Vercel
- [ ] MongoDB Atlas accessible (IP 0.0.0.0/0)
- [ ] Tests locaux réussis
- [ ] `.vercelignore` configuré
- [ ] `server.js` exporte l'app Express

## Contact support

Si le problème persiste :

1. Vérifier les logs Vercel
2. Tester avec `vercel dev` en local
3. Consulter la documentation : https://vercel.com/docs
