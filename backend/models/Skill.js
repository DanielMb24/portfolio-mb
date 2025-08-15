
const db = require('../config/database');

class Skill {
  // Créer une nouvelle compétence
  static async create(skillData) {
    const { nom, niveau, categorie, icone } = skillData;

    try {
      const [result] = await db.execute(
        `INSERT INTO skills (nom, niveau, categorie, icone, created_at, updated_at)
         VALUES (?, ?, ?, ?, NOW(), NOW())`,
        [nom, niveau, categorie, icone || null]
      );

      return { id: result.insertId, ...skillData };
    } catch (error) {
      throw error;
    }
  }

  // Récupérer toutes les compétences groupées par catégorie
  static async getAll() {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM skills ORDER BY categorie, niveau DESC'
      );

      // Grouper par catégorie
      const skillsByCategory = rows.reduce((acc, skill) => {
        if (!acc[skill.categorie]) {
          acc[skill.categorie] = [];
        }
        acc[skill.categorie].push(skill);
        return acc;
      }, {});

      return skillsByCategory;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer une compétence par ID
  static async getById(id) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM skills WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour une compétence
  static async update(id, skillData) {
    const { nom, niveau, categorie, icone } = skillData;

    try {
      const [result] = await db.execute(
        `UPDATE skills SET 
         nom = ?, niveau = ?, categorie = ?, icone = ?, updated_at = NOW()
         WHERE id = ?`,
        [nom, niveau, categorie, icone || null, id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer une compétence
  static async delete(id) {
    try {
      const [result] = await db.execute(
        'DELETE FROM skills WHERE id = ?',
        [id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Skill;
