
const express = require('express');
const PersonalInfo = require('../models/PersonalInfo');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

const router = express.Router();

// GET /api/portfolio/info - Récupérer les informations personnelles
router.get('/info', async (req, res) => {
  try {
    const info = await PersonalInfo.get();
    if (!info) {
      // Retourner les informations par défaut de Mr MAKOSSO
      const defaultInfo = {
        nom_complet: "Mr MAKOSSO",
        profession: "Étudiant en informatique, spécialité Génie Logiciel",
        localisation: "Libreville, Gabon",
        description_courte: "Passionné par le développement web et la création de solutions numériques innovantes. Curieux, motivé et orienté vers les résultats.",
        email_contact: "tonemail@example.com",
        github_url: "https://github.com/tonprofil",
        linkedin_url: "https://linkedin.com/in/tonprofil",
        facebook_url: "https://facebook.com/tonprofil",
        photo_profil: null
      };
      return res.json(defaultInfo);
    }
    res.json(info);
  } catch (error) {
    console.error('Erreur récupération info personnelles:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des informations' });
  }
});

// GET /api/portfolio/projects - Récupérer tous les projets actifs
router.get('/projects', async (req, res) => {
  try {
    let projects = await Project.getAll(false); // Seulement les actifs
    
    // Si aucun projet en base, retourner les projets par défaut
    if (projects.length === 0) {
      const defaultProjects = [
        {
          id: 1,
          titre: "Système numérique de dépôt et suivi des candidatures aux concours gabonais",
          description: "Plateforme complète permettant aux candidats de déposer leurs candidatures en ligne et de suivre l'état de leur dossier en temps réel.",
          technologies: ["React", "Node.js", "MySQL", "Express.js"],
          image_url: "/api/placeholder/600/400",
          github_url: "https://github.com/tonprofil/concours-gabon",
          demo_url: "https://concours-gabon-demo.com",
          statut: "actif"
        },
        {
          id: 2,
          titre: "Application de gestion des ressources humaines",
          description: "Système complet de gestion RH incluant la gestion des employés, des congés, de la paie et des évaluations de performance.",
          technologies: ["React", "Node.js", "MySQL", "TailwindCSS"],
          image_url: "/api/placeholder/600/400",
          github_url: "https://github.com/tonprofil/rh-management",
          demo_url: "https://rh-management-demo.com",
          statut: "actif"
        },
        {
          id: 3,
          titre: "Application de gestion scolaire",
          description: "Plateforme éducative pour la gestion des élèves, des notes, des emplois du temps et la communication école-famille.",
          technologies: ["React", "Node.js", "MySQL", "Express.js"],
          image_url: "/api/placeholder/600/400",
          github_url: "https://github.com/tonprofil/school-management",
          demo_url: "https://school-management-demo.com",
          statut: "actif"
        }
      ];
      projects = defaultProjects;
    }
    
    res.json(projects);
  } catch (error) {
    console.error('Erreur récupération projets:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des projets' });
  }
});

// GET /api/portfolio/skills - Récupérer toutes les compétences
router.get('/skills', async (req, res) => {
  try {
    let skills = await Skill.getAll();
    
    // Si aucune compétence en base, retourner les compétences par défaut
    if (Object.keys(skills).length === 0) {
      const defaultSkills = {
        "Frontend": [
          { nom: "HTML", niveau: 95, icone: "Code" },
          { nom: "CSS", niveau: 90, icone: "Palette" },
          { nom: "JavaScript", niveau: 88, icone: "Code" },
          { nom: "TypeScript", niveau: 82, icone: "Code" },
          { nom: "React", niveau: 85, icone: "Code" },
          { nom: "TailwindCSS", niveau: 90, icone: "Palette" }
        ],
        "Backend": [
          { nom: "Node.js", niveau: 80, icone: "Database" },
          { nom: "Express.js", niveau: 78, icone: "Database" },
          { nom: "MySQL", niveau: 75, icone: "Database" },
          { nom: "Laravel", niveau: 70, icone: "Database" }
        ],
        "Outils": [
          { nom: "Git", niveau: 85, icone: "Settings" },
          { nom: "VS Code", niveau: 90, icone: "Settings" },
          { nom: "C#", niveau: 65, icone: "Code" }
        ]
      };
      skills = defaultSkills;
    }
    
    res.json(skills);
  } catch (error) {
    console.error('Erreur récupération compétences:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des compétences' });
  }
});

module.exports = router;
