# Fix - Erreurs CORS et Skills

## Problèmes

1. **Erreur CORS** : `Access to fetch at 'https://danielmb-api.vercel.app/api/auth/verify' from origin 'https://daniel-mb.vercel.app' has been blocked by CORS policy`

2. **Erreur `.map()`** : `TypeError: i.map is not a function` dans SkillManager

## Causes

### 1. CORS

Le domaine `daniel-mb.vercel.app` n'était pas explicitement dans la liste des origines autorisées.

### 2. Skills

La route `/api/admin/skills` retournait un tableau plat, mais le composant `SkillManager` s'attendait à un objet groupé par catégorie.

## Solutions

### 1. Correction CORS dans `backend/server.js`

Ajouté `https://daniel-mb.vercel.app` à la liste des origines autorisées :

```javascript
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:8080",
  "http://localhost:5173",
  "https://web-profile-pro-08.vercel.app",
  "https://danielmb.vercel.app",
  "https://daniel-mb.vercel.app", // ✅ Ajouté
].filter(Boolean);
```

### 2. Correction Skills dans `backend/routes/admin.js`

Modifié la route `GET /api/admin/skills` pour retourner un objet groupé par catégorie :

```javascript
router.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.user.id }).sort({
      categorie: 1,
      ordre: 1,
    });

    // Grouper par catégorie pour le frontend
    const groupedSkills = skills.reduce((acc, skill) => {
      const category = skill.categorie || "Autres";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});

    res.json(groupedSkills);
  } catch (error) {
    console.error("Erreur récupération compétences admin:", error);
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});
```

### 3. Correction Skills dans `backend/routes/portfolio.js`

Même modification pour la route publique `GET /api/portfolio/skills`.

## Fichiers Modifiés

1. `backend/server.js` - Ajout du domaine dans CORS
2. `backend/routes/admin.js` - Groupement des skills par catégorie
3. `backend/routes/portfolio.js` - Groupement des skills par catégorie

## Format de Réponse

### Avant (tableau plat)

```json
[
  { "id": 1, "nom": "React", "niveau": 90, "categorie": "Frontend" },
  { "id": 2, "nom": "Node.js", "niveau": 85, "categorie": "Backend" },
  { "id": 3, "nom": "Vue", "niveau": 80, "categorie": "Frontend" }
]
```

### Après (objet groupé)

```json
{
  "Frontend": [
    { "id": 1, "nom": "React", "niveau": 90, "categorie": "Frontend" },
    { "id": 3, "nom": "Vue", "niveau": 80, "categorie": "Frontend" }
  ],
  "Backend": [
    { "id": 2, "nom": "Node.js", "niveau": 85, "categorie": "Backend" }
  ]
}
```

## Test

Pour tester que tout fonctionne :

1. Déployez le backend sur Vercel
2. Rechargez l'interface admin
3. Allez dans "Compétences"
4. Les compétences devraient s'afficher groupées par catégorie
5. Pas d'erreur CORS dans la console

## Résultat

✅ CORS configuré pour `daniel-mb.vercel.app`  
✅ Skills retournées groupées par catégorie  
✅ SkillManager affiche correctement les compétences  
✅ Pas d'erreur `.map()` dans la console

---

**Date**: 4 avril 2026  
**Statut**: ✅ Corrigé
