
const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Créer un nouvel utilisateur admin
  static async create(userData) {
    const { email, password, nom, role = 'admin' } = userData;
    
    try {
      // Hasher le mot de passe
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const [result] = await db.execute(
        'INSERT INTO users (email, password, nom, role, created_at) VALUES (?, ?, ?, ?, NOW())',
        [email, hashedPassword, nom, role]
      );
      
      return { id: result.insertId, email, nom, role };
    } catch (error) {
      throw error;
    }
  }

  // Trouver un utilisateur par email
  static async findByEmail(email) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Vérifier le mot de passe
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Mettre à jour le dernier login
  static async updateLastLogin(userId) {
    try {
      await db.execute(
        'UPDATE users SET last_login = NOW() WHERE id = ?',
        [userId]
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
