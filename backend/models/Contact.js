
const db = require('../config/database');

class Contact {
  // Créer un nouveau message de contact
  static async create(contactData) {
    const { nom, email, message, ip_address } = contactData;

    try {
      const [result] = await db.execute(
        `INSERT INTO contacts (nom, email, message, ip_address, created_at)
         VALUES (?, ?, ?, ?, NOW())`,
        [nom, email, message, ip_address]
      );

      return { id: result.insertId, ...contactData };
    } catch (error) {
      throw error;
    }
  }

  // Récupérer tous les messages
  static async getAll(limit = 50, offset = 0) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [limit, offset]
      );

      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer un message par ID
  static async getById(id) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM contacts WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Marquer un message comme lu
  static async markAsRead(id) {
    try {
      const [result] = await db.execute(
        'UPDATE contacts SET is_read = 1 WHERE id = ?',
        [id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer un message
  static async delete(id) {
    try {
      const [result] = await db.execute(
        'DELETE FROM contacts WHERE id = ?',
        [id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Obtenir le nombre de messages non lus
  static async getUnreadCount() {
    try {
      const [rows] = await db.execute(
        'SELECT COUNT(*) as count FROM contacts WHERE is_read = 0'
      );
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Contact;
