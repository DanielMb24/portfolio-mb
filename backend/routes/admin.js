
const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const PersonalInfo = require('../models/PersonalInfo');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Contact = require('../models/Contact');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configuration multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées (jpeg, jpg, png, webp)'));
    }
  }
});

// Appliquer l'authentification à toutes les routes admin
router.use(authenticateToken);
router.use(requireAdmin);

// GESTION DES INFORMATIONS PERSONNELLES
// PUT /api/admin/personal-info - Mettre à jour les infos personnelles
router.put('/personal-info', [
  body('nom_complet').notEmpty().withMessage('Nom complet requis'),
  body('profession').notEmpty().withMessage('Profession requise'),
  body('email_contact').isEmail().withMessage('Email valide requis')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Données invalides', details: errors.array() });
    }

    const updatedInfo = await PersonalInfo.update(req.body);
    res.json({ message: 'Informations mises à jour', data: updatedInfo });
  } catch (error) {
    console.error('Erreur mise à jour info:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

// GESTION DES PROJETS
// GET /api/admin/projects - Récupérer tous les projets (actifs et inactifs)
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.getAll(true);
    res.json(projects);
  } catch (error) {
    console.error('Erreur récupération projets admin:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// POST /api/admin/projects - Créer un nouveau projet
router.post('/projects', [
  body('titre').notEmpty().withMessage('Titre requis'),
  body('description').notEmpty().withMessage('Description requise'),
  body('technologies').isArray().withMessage('Technologies doivent être un tableau')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Données invalides', details: errors.array() });
    }

    const newProject = await Project.create(req.body);
    res.status(201).json({ message: 'Projet créé', data: newProject });
  } catch (error) {
    console.error('Erreur création projet:', error);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
});

// PUT /api/admin/projects/:id - Mettre à jour un projet
router.put('/projects/:id', [
  body('titre').notEmpty().withMessage('Titre requis'),
  body('description').notEmpty().withMessage('Description requise')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Données invalides', details: errors.array() });
    }

    const success = await Project.update(req.params.id, req.body);
    if (success) {
      res.json({ message: 'Projet mis à jour' });
    } else {
      res.status(404).json({ error: 'Projet non trouvé' });
    }
  } catch (error) {
    console.error('Erreur mise à jour projet:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

// DELETE /api/admin/projects/:id - Supprimer un projet
router.delete('/projects/:id', async (req, res) => {
  try {
    const success = await Project.delete(req.params.id);
    if (success) {
      res.json({ message: 'Projet supprimé' });
    } else {
      res.status(404).json({ error: 'Projet non trouvé' });
    }
  } catch (error) {
    console.error('Erreur suppression projet:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// GESTION DES COMPÉTENCES
// GET /api/admin/skills - Récupérer toutes les compétences
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.getAll();
    res.json(skills);
  } catch (error) {
    console.error('Erreur récupération compétences admin:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// POST /api/admin/skills - Créer une nouvelle compétence
router.post('/skills', [
  body('nom').notEmpty().withMessage('Nom requis'),
  body('niveau').isInt({ min: 0, max: 100 }).withMessage('Niveau doit être entre 0 et 100'),
  body('categorie').notEmpty().withMessage('Catégorie requise')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Données invalides', details: errors.array() });
    }

    const newSkill = await Skill.create(req.body);
    res.status(201).json({ message: 'Compétence créée', data: newSkill });
  } catch (error) {
    console.error('Erreur création compétence:', error);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
});

// PUT /api/admin/skills/:id - Mettre à jour une compétence
router.put('/skills/:id', [
  body('nom').notEmpty().withMessage('Nom requis'),
  body('niveau').isInt({ min: 0, max: 100 }).withMessage('Niveau doit être entre 0 et 100')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Données invalides', details: errors.array() });
    }

    const success = await Skill.update(req.params.id, req.body);
    if (success) {
      res.json({ message: 'Compétence mise à jour' });
    } else {
      res.status(404).json({ error: 'Compétence non trouvée' });
    }
  } catch (error) {
    console.error('Erreur mise à jour compétence:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

// DELETE /api/admin/skills/:id - Supprimer une compétence
router.delete('/skills/:id', async (req, res) => {
  try {
    const success = await Skill.delete(req.params.id);
    if (success) {
      res.json({ message: 'Compétence supprimée' });
    } else {
      res.status(404).json({ error: 'Compétence non trouvée' });
    }
  } catch (error) {
    console.error('Erreur suppression compétence:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// GESTION DES MESSAGES DE CONTACT
// GET /api/admin/contacts - Récupérer tous les messages
router.get('/contacts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    
    const contacts = await Contact.getAll(limit, offset);
    const unreadCount = await Contact.getUnreadCount();
    
    res.json({ 
      contacts, 
      unreadCount,
      pagination: { page, limit }
    });
  } catch (error) {
    console.error('Erreur récupération contacts:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// PUT /api/admin/contacts/:id/read - Marquer un message comme lu
router.put('/contacts/:id/read', async (req, res) => {
  try {
    const success = await Contact.markAsRead(req.params.id);
    if (success) {
      res.json({ message: 'Message marqué comme lu' });
    } else {
      res.status(404).json({ error: 'Message non trouvé' });
    }
  } catch (error) {
    console.error('Erreur marquage lecture:', error);
    res.status(500).json({ error: 'Erreur lors du marquage' });
  }
});

// DELETE /api/admin/contacts/:id - Supprimer un message
router.delete('/contacts/:id', async (req, res) => {
  try {
    const success = await Contact.delete(req.params.id);
    if (success) {
      res.json({ message: 'Message supprimé' });
    } else {
      res.status(404).json({ error: 'Message non trouvé' });
    }
  } catch (error) {
    console.error('Erreur suppression message:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// UPLOAD D'IMAGES
// POST /api/admin/upload - Upload d'image
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ 
      message: 'Image uploadée avec succès', 
      imageUrl 
    });
  } catch (error) {
    console.error('Erreur upload:', error);
    res.status(500).json({ error: 'Erreur lors de l\'upload' });
  }
});

module.exports = router;
