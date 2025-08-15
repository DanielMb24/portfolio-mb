
const db = require('../config/database');

class PersonalInfo {
  // Récupérer les informations personnelles
  static async get() {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM personal_info ORDER BY id DESC LIMIT 1'
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour les informations personnelles
  static async update(data) {
    const {
      nom_complet,
      profession,
      localisation,
      description_courte,
      photo_profil,
      email_contact,
      github_url,
      linkedin_url,
      facebook_url
    } = data;

    try {
      // Vérifier s'il existe déjà un enregistrement
      const existing = await this.get();
      
      if (existing) {
        // Mise à jour - convertir undefined en null
        const [result] = await db.execute(
          `UPDATE personal_info SET 
           nom_complet = ?, profession = ?, localisation = ?, 
           description_courte = ?, photo_profil = ?, email_contact = ?,
           github_url = ?, linkedin_url = ?, facebook_url = ?, 
           updated_at = NOW()
           WHERE id = ?`,
          [
            nom_complet,
            profession,
            localisation,
            description_courte,
            photo_profil || null,
            email_contact,
            github_url || null,
            linkedin_url || null,
            facebook_url || null,
            existing.id
          ]
        );
        return { id: existing.id, ...data };
      } else {
        // Création - convertir undefined en null
        const [result] = await db.execute(
          `INSERT INTO personal_info 
           (nom_complet, profession, localisation, description_courte, 
            photo_profil, email_contact, github_url, linkedin_url, 
            facebook_url, created_at, updated_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            nom_complet,
            profession,
            localisation,
            description_courte,
            photo_profil || null,
            email_contact,
            github_url || null,
            linkedin_url || null,
            facebook_url || null
          ]
        );
        return { id: result.insertId, ...data };
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PersonalInfo;
