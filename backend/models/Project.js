
const db = require('../config/database');

class Project {
  // Créer un nouveau projet
  static async create(projectData) {
    const {
      titre,
      description,
      technologies,
      image_url,
      github_url,
      demo_url,
      statut = 'actif'
    } = projectData;

    try {
      const [result] = await db.execute(
        `INSERT INTO projects 
         (titre, description, technologies, image_url, github_url, demo_url, statut, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          titre,
          description,
          JSON.stringify(technologies),
          image_url || null,
          github_url || null,
          demo_url || null,
          statut
        ]
      );

      return { id: result.insertId, ...projectData };
    } catch (error) {
      throw error;
    }
  }

  // Récupérer tous les projets actifs
  static async getAll(includeInactive = false) {
    try {
      const query = includeInactive 
        ? 'SELECT * FROM projects ORDER BY created_at DESC'
        : 'SELECT * FROM projects WHERE statut = "actif" ORDER BY created_at DESC';
      
      const [rows] = await db.execute(query);
      
      return rows.map(project => ({
        ...project,
        technologies: JSON.parse(project.technologies || '[]')
      }));
    } catch (error) {
      throw error;
    }
  }

  // Récupérer un projet par ID
  static async getById(id) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM projects WHERE id = ?',
        [id]
      );
      
      if (rows[0]) {
        return {
          ...rows[0],
          technologies: JSON.parse(rows[0].technologies || '[]')
        };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour un projet
  static async update(id, projectData) {
    const {
      titre,
      description,
      technologies,
      image_url,
      github_url,
      demo_url,
      statut
    } = projectData;

    try {
      const [result] = await db.execute(
        `UPDATE projects SET 
         titre = ?, description = ?, technologies = ?, image_url = ?,
         github_url = ?, demo_url = ?, statut = ?, updated_at = NOW()
         WHERE id = ?`,
        [
          titre,
          description,
          JSON.stringify(technologies),
          image_url || null,
          github_url || null,
          demo_url || null,
          statut,
          id
        ]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer un projet
  static async delete(id) {
    try {
      const [result] = await db.execute(
        'DELETE FROM projects WHERE id = ?',
        [id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Project;
