# Déploiement des Corrections

## Modifications à Déployer

1. ✅ Ajout des méthodes génériques dans `src/services/api.ts`
2. ✅ Correction de `SubdomainManager.tsx`
3. ✅ Ajout du domaine `daniel-mb.vercel.app` dans CORS
4. ✅ Groupement des skills par catégorie dans les routes backend

## Étapes de Déploiement

### 1. Backend (Vercel)

```bash
cd backend
vercel --prod
```

Ou via Git (si configuré) :

```bash
git add .
git commit -m "fix: CORS et groupement skills par catégorie"
git push origin main
```

Vercel déploiera automatiquement si le projet est lié à Git.

### 2. Frontend (Netlify/Vercel)

```bash
# Build
npm run build

# Déployer sur Netlify
netlify deploy --prod

# OU déployer sur Vercel
vercel --prod
```

Ou via Git :

```bash
git add .
git commit -m "fix: API service avec méthodes génériques"
git push origin main
```

### 3. Vérification

Après déploiement, vérifiez :

1. **CORS** : Ouvrez la console du navigateur sur `https://daniel-mb.vercel.app`
   - Pas d'erreur CORS
   - Les requêtes API passent

2. **Skills** : Allez dans Admin > Compétences
   - Les compétences s'affichent groupées par catégorie
   - Pas d'erreur `.map()` dans la console

3. **Sous-domaine** : Allez dans Admin > Sous-domaine
   - La page se charge sans erreur
   - Vous pouvez sauvegarder un sous-domaine

## Commandes Rapides

### Déploiement Complet (Backend + Frontend)

```bash
# Backend
cd backend
vercel --prod

# Frontend
cd ..
npm run build
netlify deploy --prod
```

### Vérification des Logs

```bash
# Logs Backend (Vercel)
vercel logs danielmb-api

# Logs Frontend (Netlify)
netlify logs
```

## Variables d'Environnement

Assurez-vous que ces variables sont configurées :

### Backend (Vercel)

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=votre_secret
MAIN_DOMAIN=daniel-mb.vercel.app
FRONTEND_URL=https://daniel-mb.vercel.app
```

### Frontend (Netlify/Vercel)

```env
VITE_API_URL=https://danielmb-api.vercel.app/api
VITE_MAIN_DOMAIN=daniel-mb.vercel.app
```

## Troubleshooting

### Erreur CORS persiste

1. Vérifiez que le backend est bien déployé
2. Vérifiez les logs backend : `vercel logs danielmb-api`
3. Vérifiez que `FRONTEND_URL` est configuré dans les variables d'environnement Vercel

### Erreur `.map()` persiste

1. Videz le cache du navigateur
2. Vérifiez que le backend retourne bien un objet groupé :
   ```bash
   curl https://danielmb-api.vercel.app/api/admin/skills \
     -H "Authorization: Bearer VOTRE_TOKEN"
   ```
3. La réponse doit être un objet, pas un tableau

### Sous-domaine ne fonctionne pas

1. Vérifiez que les méthodes génériques sont bien dans `api.ts`
2. Vérifiez la console pour voir les erreurs
3. Testez l'endpoint directement :
   ```bash
   curl https://danielmb-api.vercel.app/api/admin/subdomain \
     -H "Authorization: Bearer VOTRE_TOKEN"
   ```

## Checklist Post-Déploiement

- [ ] Backend déployé sur Vercel
- [ ] Frontend déployé sur Netlify/Vercel
- [ ] Pas d'erreur CORS dans la console
- [ ] Skills s'affichent correctement
- [ ] Sous-domaine fonctionne
- [ ] Tous les tests passent

---

**Date**: 4 avril 2026  
**Statut**: Prêt pour déploiement
