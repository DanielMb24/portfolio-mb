
# Portfolio Backend - Mr MAKOSSO

## Description
Backend API Node.js/Express/MySQL pour le portfolio personnel de Mr MAKOSSO, étudiant en informatique spécialisé en Génie Logiciel.

## Fonctionnalités
- 🔐 **Authentification JWT** pour l'administration
- 📊 **API REST complète** pour le portfolio public
- 🛡️ **Interface admin sécurisée** pour la gestion de contenu
- 📁 **Upload d'images** pour les projets et photo de profil
- 📧 **Système de contact** avec stockage des messages
- 🗄️ **Base de données MySQL** avec modèles structurés

## Installation et configuration

### Prérequis
- Node.js (v14 ou supérieur)
- MySQL (v8.0 ou supérieur)
- npm ou yarn

### Installation

1. **Cloner le projet**
```bash
cd backend
npm install
```

2. **Configuration de la base de données**
```bash
# Créer la base de données MySQL
mysql -u root -p
CREATE DATABASE portfolio_makosso;
exit
```

3. **Configuration des variables d'environnement**
```bash
# Copier le fichier d'exemple
cp .env .env

# Éditer les variables dans .env
nano .env
```

4. **Initialiser la base de données**
```bash
# Créer les tables et données par défaut
npm run init-db
```

5. **Créer le dossier uploads**
```bash
mkdir uploads
```

6. **Démarrer le serveur**
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

Le serveur sera accessible sur `http://localhost:5000`

## Configuration .env

```env
# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=portfolio_makosso

# JWT
JWT_SECRET=votre_jwt_secret_tres_securise_ici
JWT_EXPIRES_IN=24h

# Serveur
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Admin par défaut
ADMIN_EMAIL=admin@makosso-portfolio.com
ADMIN_PASSWORD=AdminSecure123!
```

## API Routes

### Routes publiques (Portfolio)
- `GET /api/portfolio/info` - Informations personnelles
- `GET /api/portfolio/projects` - Liste des projets
- `GET /api/portfolio/skills` - Compétences par catégorie
- `POST /api/contact` - Envoyer un message de contact

### Routes d'authentification
- `POST /api/auth/login` - Connexion admin
- `GET /api/auth/verify` - Vérifier le token
- `POST /api/auth/logout` - Déconnexion

### Routes admin (Authentification requise)
- `PUT /api/admin/personal-info` - Modifier les informations personnelles
- `GET /api/admin/projects` - Liste complète des projets
- `POST /api/admin/projects` - Créer un projet
- `PUT /api/admin/projects/:id` - Modifier un projet
- `DELETE /api/admin/projects/:id` - Supprimer un projet
- `GET /api/admin/skills` - Gestion des compétences
- `POST /api/admin/skills` - Ajouter une compétence
- `PUT /api/admin/skills/:id` - Modifier une compétence
- `DELETE /api/admin/skills/:id` - Supprimer une compétence
- `GET /api/admin/contacts` - Messages de contact
- `PUT /api/admin/contacts/:id/read` - Marquer comme lu
- `DELETE /api/admin/contacts/:id` - Supprimer un message
- `POST /api/admin/upload` - Upload d'image

## Structure de la base de données

### Table `users`
- Gestion des utilisateurs administrateurs
- Authentification sécurisée avec mot de passe haché

### Table `personal_info`
- Informations personnelles de Mr MAKOSSO
- Photo de profil et liens réseaux sociaux

### Table `projects`
- Projets du portfolio avec descriptions
- Technologies utilisées (stockées en JSON)
- Liens GitHub et démonstration

### Table `skills`
- Compétences techniques par catégorie
- Niveaux de maîtrise (0-100%)
- Icônes pour l'affichage

### Table `contacts`
- Messages envoyés via le formulaire de contact
- Suivi des messages lus/non lus

## Données par défaut

Le script d'initialisation ajoute automatiquement :

**Informations personnelles :**
- Nom : Mr MAKOSSO
- Profession : Étudiant en informatique, spécialité Génie Logiciel
- Localisation : Libreville, Gabon
- Compétences : HTML, CSS, JavaScript, TypeScript, React, Node.js, etc.

**Projets :**
1. Système de candidatures aux concours gabonais
2. Application de gestion RH
3. Application de gestion scolaire

**Utilisateur admin par défaut :**
- Email : admin@makosso-portfolio.com
- Mot de passe : AdminSecure123!

## Sécurité

- 🔐 Authentification JWT avec expiration
- 🛡️ Middleware de sécurité (Helmet)
- 📊 Rate limiting pour éviter les abus
- ✅ Validation des données d'entrée
- 🔒 Mots de passe hachés avec bcrypt
- 🚫 Protection CORS configurée

## Scripts disponibles

- `npm start` - Démarrer en mode production
- `npm run dev` - Démarrer en mode développement avec nodemon
- `npm run init-db` - Initialiser la base de données

## Déploiement

### En local
1. Suivre les étapes d'installation ci-dessus
2. Configurer MySQL localement
3. Démarrer avec `npm run dev`

### En production
1. Utiliser un service comme Heroku, DigitalOcean, ou AWS
2. Configurer une base de données MySQL hébergée
3. Définir les variables d'environnement de production
4. Utiliser `npm start` pour le démarrage

## Support et contact

Pour toute question ou suggestion concernant ce backend :
- Email : tonemail@example.com
- GitHub : https://github.com/tonprofil

---
*Développé avec ❤️ par Mr MAKOSSO - Étudiant en Génie Logiciel*
```
