
const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const router = express.Router();

// Configuration nodemailer
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// POST /api/contact - Envoyer un message de contact
router.post('/', [
  body('nom').notEmpty().withMessage('Nom requis'),
  body('email').isEmail().withMessage('Email valide requis'),
  body('message').notEmpty().withMessage('Message requis')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Données invalides', details: errors.array() });
    }

    const { nom, email, message } = req.body;
    
    // Obtenir l'adresse IP du client
    const ip_address = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 
                      (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
                      req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';

    // Sauvegarder le message en base
    const newContact = await Contact.create({
      nom,
      email,
      message,
      ip_address
    });

    // Envoyer un email à l'administrateur
    if (process.env.SMTP_HOST && process.env.ADMIN_EMAIL) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.SMTP_USER,
          to: process.env.ADMIN_EMAIL,
          subject: `Nouveau message de contact - ${nom}`,
          html: `
            <h2>Nouveau message de contact</h2>
            <p><strong>Nom:</strong> ${nom}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p><small>IP: ${ip_address}</small></p>
          `
        });

        // Envoyer un email de confirmation à l'utilisateur
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.SMTP_USER,
          to: email,
          subject: 'Confirmation de réception de votre message',
          html: `
            <h2>Merci pour votre message !</h2>
            <p>Bonjour ${nom},</p>
            <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
            <p>Votre message:</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p>Cordialement,<br>L'équipe</p>
          `
        });
      } catch (emailError) {
        console.error('Erreur envoi email:', emailError);
        // Ne pas faire échouer la requête si l'email échoue
      }
    }

    res.status(201).json({ 
      message: 'Message envoyé avec succès',
      data: newContact 
    });
  } catch (error) {
    console.error('Erreur envoi message:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
});

module.exports = router;
