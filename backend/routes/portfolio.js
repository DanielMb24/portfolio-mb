const express = require("express");
const PersonalInfo = require("../models/PersonalInfo");
const Project = require("../models/Project");
const Skill = require("../models/Skill");

const router = express.Router();

// GET /api/portfolio/info - Récupérer les informations personnelles
// Si userId fourni en query, récupérer pour cet utilisateur
router.get("/info", async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) {
      filter.userId = req.query.userId;
    }

    const info = await PersonalInfo.findOne(filter);
    if (!info) {
      return res.status(404).json({ error: "Informations non trouvées" });
    }
    res.json(info);
  } catch (error) {
    console.error("Erreur récupération info personnelles:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des informations" });
  }
});

// GET /api/portfolio/projects - Récupérer tous les projets actifs
// Si userId fourni en query, filtrer par utilisateur
router.get("/projects", async (req, res) => {
  try {
    const filter = { statut: "actif" };
    if (req.query.userId) {
      filter.userId = req.query.userId;
    }

    const projects = await Project.find(filter).sort({
      ordre: 1,
      date_creation: -1,
    });
    res.json(projects);
  } catch (error) {
    console.error("Erreur récupération projets:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des projets" });
  }
});

// GET /api/portfolio/skills - Récupérer toutes les compétences
// Si userId fourni en query, filtrer par utilisateur
router.get("/skills", async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) {
      filter.userId = req.query.userId;
    }

    const skills = await Skill.find(filter).sort({ categorie: 1, ordre: 1 });

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
    console.error("Erreur récupération compétences:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des compétences" });
  }
});

module.exports = router;
