const express = require("express");
const { body, validationResult } = require("express-validator");
const { authenticateToken, requireAdmin } = require("../middleware/auth");
const PersonalInfo = require("../models/PersonalInfo");
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Contact = require("../models/Contact");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configuration multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Seules les images sont autorisées (jpeg, jpg, png, webp)"));
    }
  },
});

// Appliquer l'authentification à toutes les routes admin
router.use(authenticateToken);
router.use(requireAdmin);

// GESTION DES INFORMATIONS PERSONNELLES
// GET /api/admin/personal-info - Récupérer les infos personnelles de l'utilisateur
router.get("/personal-info", async (req, res) => {
  try {
    const info = await PersonalInfo.findOne({ userId: req.user.id });
    if (!info) {
      return res.status(404).json({ error: "Informations non trouvées" });
    }
    res.json(info);
  } catch (error) {
    console.error("Erreur récupération info:", error);
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

// PUT /api/admin/personal-info - Mettre à jour les infos personnelles
router.put(
  "/personal-info",
  [
    body("nom_complet").notEmpty().withMessage("Nom complet requis"),
    body("profession").notEmpty().withMessage("Profession requise"),
    body("email_contact").isEmail().withMessage("Email valide requis"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "Données invalides", details: errors.array() });
      }

      // Ajouter userId aux données
      const dataWithUserId = { ...req.body, userId: req.user.id };

      // Mettre à jour ou créer les infos pour cet utilisateur
      const updatedInfo = await PersonalInfo.findOneAndUpdate(
        { userId: req.user.id },
        dataWithUserId,
        { new: true, upsert: true, runValidators: true },
      );

      res.json({ message: "Informations mises à jour", data: updatedInfo });
    } catch (error) {
      console.error("Erreur mise à jour info:", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
  },
);

// GESTION DES PROJETS
// GET /api/admin/projects - Récupérer tous les projets de l'utilisateur (actifs et inactifs)
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).sort({
      ordre: 1,
      date_creation: -1,
    });
    res.json(projects);
  } catch (error) {
    console.error("Erreur récupération projets admin:", error);
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

// POST /api/admin/projects - Créer un nouveau projet
router.post(
  "/projects",
  [
    body("titre").notEmpty().withMessage("Titre requis"),
    body("description").notEmpty().withMessage("Description requise"),
    body("technologies")
      .isArray()
      .withMessage("Technologies doivent être un tableau"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "Données invalides", details: errors.array() });
      }

      // Ajouter userId au projet
      const projectData = { ...req.body, userId: req.user.id };
      const newProject = await Project.create(projectData);
      res.status(201).json({ message: "Projet créé", data: newProject });
    } catch (error) {
      console.error("Erreur création projet:", error);
      res.status(500).json({ error: "Erreur lors de la création" });
    }
  },
);

// PUT /api/admin/projects/:id - Mettre à jour un projet
router.put(
  "/projects/:id",
  [
    body("titre").notEmpty().withMessage("Titre requis"),
    body("description").notEmpty().withMessage("Description requise"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "Données invalides", details: errors.array() });
      }

      // Vérifier que le projet appartient à l'utilisateur
      const project = await Project.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true, runValidators: true },
      );

      if (project) {
        res.json({ message: "Projet mis à jour", data: project });
      } else {
        res.status(404).json({ error: "Projet non trouvé" });
      }
    } catch (error) {
      console.error("Erreur mise à jour projet:", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
  },
);

// DELETE /api/admin/projects/:id - Supprimer un projet
router.delete("/projects/:id", async (req, res) => {
  try {
    // Vérifier que le projet appartient à l'utilisateur
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (project) {
      res.json({ message: "Projet supprimé" });
    } else {
      res.status(404).json({ error: "Projet non trouvé" });
    }
  } catch (error) {
    console.error("Erreur suppression projet:", error);
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

// GESTION DES COMPÉTENCES
// GET /api/admin/skills - Récupérer toutes les compétences de l'utilisateur
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

// POST /api/admin/skills - Créer une nouvelle compétence
router.post(
  "/skills",
  [
    body("nom").notEmpty().withMessage("Nom requis"),
    body("niveau")
      .isInt({ min: 0, max: 100 })
      .withMessage("Niveau doit être entre 0 et 100"),
    body("categorie").notEmpty().withMessage("Catégorie requise"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "Données invalides", details: errors.array() });
      }

      // Ajouter userId à la compétence
      const skillData = { ...req.body, userId: req.user.id };
      const newSkill = await Skill.create(skillData);
      res.status(201).json({ message: "Compétence créée", data: newSkill });
    } catch (error) {
      console.error("Erreur création compétence:", error);
      res.status(500).json({ error: "Erreur lors de la création" });
    }
  },
);

// PUT /api/admin/skills/:id - Mettre à jour une compétence
router.put(
  "/skills/:id",
  [
    body("nom").notEmpty().withMessage("Nom requis"),
    body("niveau")
      .isInt({ min: 0, max: 100 })
      .withMessage("Niveau doit être entre 0 et 100"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "Données invalides", details: errors.array() });
      }

      // Vérifier que la compétence appartient à l'utilisateur
      const skill = await Skill.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true, runValidators: true },
      );

      if (skill) {
        res.json({ message: "Compétence mise à jour", data: skill });
      } else {
        res.status(404).json({ error: "Compétence non trouvée" });
      }
    } catch (error) {
      console.error("Erreur mise à jour compétence:", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
  },
);

// DELETE /api/admin/skills/:id - Supprimer une compétence
router.delete("/skills/:id", async (req, res) => {
  try {
    // Vérifier que la compétence appartient à l'utilisateur
    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (skill) {
      res.json({ message: "Compétence supprimée" });
    } else {
      res.status(404).json({ error: "Compétence non trouvée" });
    }
  } catch (error) {
    console.error("Erreur suppression compétence:", error);
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

// GESTION DES MESSAGES DE CONTACT
// GET /api/admin/contacts - Récupérer tous les messages
router.get("/contacts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const contacts = await Contact.getAllPaginated(limit, skip);
    const unreadCount = await Contact.getUnreadCount();

    res.json({
      contacts,
      unreadCount,
      pagination: { page, limit },
    });
  } catch (error) {
    console.error("Erreur récupération contacts:", error);
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

// PUT /api/admin/contacts/:id/read - Marquer un message comme lu
router.put("/contacts/:id/read", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      await contact.markAsRead();
      res.json({ message: "Message marqué comme lu" });
    } else {
      res.status(404).json({ error: "Message non trouvé" });
    }
  } catch (error) {
    console.error("Erreur marquage lecture:", error);
    res.status(500).json({ error: "Erreur lors du marquage" });
  }
});

// DELETE /api/admin/contacts/:id - Supprimer un message
router.delete("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (contact) {
      res.json({ message: "Message supprimé" });
    } else {
      res.status(404).json({ error: "Message non trouvé" });
    }
  } catch (error) {
    console.error("Erreur suppression message:", error);
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

// UPLOAD D'IMAGES
// POST /api/admin/upload - Upload d'image
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier fourni" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({
      message: "Image uploadée avec succès",
      imageUrl,
    });
  } catch (error) {
    console.error("Erreur upload:", error);
    res.status(500).json({ error: "Erreur lors de l'upload" });
  }
});

// GESTION DU SOUS-DOMAINE
const User = require("../models/User");

// Sous-domaines réservés (ne peuvent pas être utilisés)
const RESERVED_SUBDOMAINS = [
  "www",
  "api",
  "admin",
  "app",
  "mail",
  "ftp",
  "localhost",
  "staging",
  "dev",
  "test",
  "demo",
  "blog",
  "shop",
  "store",
];

// GET /api/admin/subdomain - Récupérer les infos de sous-domaine
router.get("/subdomain", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "slug subdomain customDomain",
    );
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json({
      slug: user.slug,
      subdomain: user.subdomain,
      customDomain: user.customDomain,
    });
  } catch (error) {
    console.error("Erreur récupération sous-domaine:", error);
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

// PUT /api/admin/subdomain - Mettre à jour le sous-domaine
router.put(
  "/subdomain",
  [
    body("subdomain")
      .optional()
      .matches(/^[a-z0-9-]+$/)
      .withMessage(
        "Sous-domaine invalide (lettres minuscules, chiffres et tirets uniquement)",
      )
      .isLength({ min: 3, max: 30 })
      .withMessage("Le sous-domaine doit contenir entre 3 et 30 caractères"),
    body("customDomain")
      .optional()
      .matches(/^[a-z0-9.-]+\.[a-z]{2,}$/)
      .withMessage("Domaine personnalisé invalide"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "Données invalides", details: errors.array() });
      }

      const { subdomain, customDomain } = req.body;

      // Vérifier si le sous-domaine est réservé
      if (subdomain && RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())) {
        return res.status(400).json({ error: "Ce sous-domaine est réservé" });
      }

      // Vérifier si le sous-domaine est déjà utilisé
      if (subdomain) {
        const existingUser = await User.findOne({
          subdomain: subdomain.toLowerCase(),
          _id: { $ne: req.user.id },
        });
        if (existingUser) {
          return res
            .status(400)
            .json({ error: "Ce sous-domaine est déjà utilisé" });
        }
      }

      // Mettre à jour l'utilisateur
      const updateData = {};
      if (subdomain !== undefined) {
        updateData.subdomain = subdomain.toLowerCase();
        updateData.slug = subdomain.toLowerCase();
      }
      if (customDomain !== undefined) {
        updateData.customDomain = customDomain.toLowerCase();
      }

      const user = await User.findByIdAndUpdate(req.user.id, updateData, {
        new: true,
        runValidators: true,
      }).select("slug subdomain customDomain");

      res.json({
        message: "Sous-domaine mis à jour",
        data: {
          slug: user.slug,
          subdomain: user.subdomain,
          customDomain: user.customDomain,
        },
      });
    } catch (error) {
      console.error("Erreur mise à jour sous-domaine:", error);
      res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
  },
);

module.exports = router;
