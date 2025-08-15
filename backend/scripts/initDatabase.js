
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Script d'initialisation de la base de données
async function initializeDatabase() {
  let connection;
  
  try {
    console.log('🔄 Initialisation de la base de données...');
    
    // Connexion sans spécifier la base (pour la créer)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    // Créer la base de données
    const dbName = process.env.DB_NAME || 'portfolio_makosso';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.execute(`USE \`${dbName}\``);
    
    console.log(`✅ Base de données "${dbName}" créée/sélectionnée`);

    // Créer la table users
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nom VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'admin',
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      )
    `);

    // Créer la table personal_info
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS personal_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom_complet VARCHAR(255) NOT NULL,
        profession VARCHAR(255) NOT NULL,
        localisation VARCHAR(255),
        description_courte TEXT,
        photo_profil VARCHAR(500),
        email_contact VARCHAR(255),
        github_url VARCHAR(500),
        linkedin_url VARCHAR(500),
        facebook_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Créer la table projects
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        technologies JSON,
        image_url VARCHAR(500),
        github_url VARCHAR(500),
        demo_url VARCHAR(500),
        statut ENUM('actif', 'inactif', 'brouillon') DEFAULT 'actif',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_statut (statut)
      )
    `);

    // Créer la table skills
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        niveau INT NOT NULL CHECK (niveau >= 0 AND niveau <= 100),
        categorie VARCHAR(100) NOT NULL,
        icone VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_categorie (categorie)
      )
    `);

    // Créer la table contacts
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        ip_address VARCHAR(45),
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_is_read (is_read),
        INDEX idx_created_at (created_at)
      )
    `);

    console.log('✅ Tables créées avec succès');

    // Créer l'utilisateur admin par défaut
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@makosso-portfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecure123!';
    
    // Vérifier si l'admin existe déjà
    const [existingAdmin] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [adminEmail]
    );

    if (existingAdmin.length === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      await connection.execute(
        'INSERT INTO users (email, password, nom, role) VALUES (?, ?, ?, ?)',
        [adminEmail, hashedPassword, 'Administrateur', 'admin']
      );
      console.log('✅ Utilisateur admin créé');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Mot de passe: ${adminPassword}`);
    } else {
      console.log('ℹ️  Utilisateur admin existe déjà');
    }

    // Insérer les informations personnelles par défaut de Mr MAKOSSO
    const [existingInfo] = await connection.execute('SELECT id FROM personal_info LIMIT 1');
    
    if (existingInfo.length === 0) {
      await connection.execute(`
        INSERT INTO personal_info 
        (nom_complet, profession, localisation, description_courte, email_contact, github_url, linkedin_url, facebook_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        'Mr MAKOSSO',
        'Étudiant en informatique, spécialité Génie Logiciel',
        'Libreville, Gabon',
        'Passionné par le développement web et la création de solutions numériques innovantes. Curieux, motivé et orienté vers les résultats.',
        'tonemail@example.com',
        'https://github.com/tonprofil',
        'https://linkedin.com/in/tonprofil',
        'https://facebook.com/tonprofil'
      ]);
      console.log('✅ Informations personnelles par défaut ajoutées');
    }

    // Insérer les compétences par défaut
    const [existingSkills] = await connection.execute('SELECT id FROM skills LIMIT 1');
    
    if (existingSkills.length === 0) {
      const defaultSkills = [
        // Frontend
        ['HTML', 95, 'Frontend', 'Code'],
        ['CSS', 90, 'Frontend', 'Palette'],
        ['JavaScript', 88, 'Frontend', 'Code'],
        ['TypeScript', 82, 'Frontend', 'Code'],
        ['React', 85, 'Frontend', 'Code'],
        ['TailwindCSS', 90, 'Frontend', 'Palette'],
        
        // Backend
        ['Node.js', 80, 'Backend', 'Database'],
        ['Express.js', 78, 'Backend', 'Database'],
        ['MySQL', 75, 'Backend', 'Database'],
        ['Laravel', 70, 'Backend', 'Database'],
        
        // Outils
        ['Git', 85, 'Outils', 'Settings'],
        ['VS Code', 90, 'Outils', 'Settings'],
        ['C#', 65, 'Outils', 'Code']
      ];

      for (const skill of defaultSkills) {
        await connection.execute(
          'INSERT INTO skills (nom, niveau, categorie, icone) VALUES (?, ?, ?, ?)',
          skill
        );
      }
      console.log('✅ Compétences par défaut ajoutées');
    }

    // Insérer les projets par défaut
    const [existingProjects] = await connection.execute('SELECT id FROM projects LIMIT 1');
    
    if (existingProjects.length === 0) {
      const defaultProjects = [
        [
          'Système numérique de dépôt et suivi des candidatures aux concours gabonais',
          'Plateforme complète permettant aux candidats de déposer leurs candidatures en ligne et de suivre l\'état de leur dossier en temps réel.',
          JSON.stringify(['React', 'Node.js', 'MySQL', 'Express.js']),
          '/api/placeholder/600/400',
          'https://github.com/tonprofil/concours-gabon',
          'https://concours-gabon-demo.com',
          'actif'
        ],
        [
          'Application de gestion des ressources humaines',
          'Système complet de gestion RH incluant la gestion des employés, des congés, de la paie et des évaluations de performance.',
          JSON.stringify(['React', 'Node.js', 'MySQL', 'TailwindCSS']),
          '/api/placeholder/600/400',
          'https://github.com/tonprofil/rh-management',
          'https://rh-management-demo.com',
          'actif'
        ],
        [
          'Application de gestion scolaire',
          'Plateforme éducative pour la gestion des élèves, des notes, des emplois du temps et la communication école-famille.',
          JSON.stringify(['React', 'Node.js', 'MySQL', 'Express.js']),
          '/api/placeholder/600/400',
          'https://github.com/tonprofil/school-management',
          'https://school-management-demo.com',
          'actif'
        ]
      ];

      for (const project of defaultProjects) {
        await connection.execute(
          'INSERT INTO projects (titre, description, technologies, image_url, github_url, demo_url, statut) VALUES (?, ?, ?, ?, ?, ?, ?)',
          project
        );
      }
      console.log('✅ Projets par défaut ajoutés');
    }

    console.log('\n🎉 Initialisation terminée avec succès !');
    console.log('\n📋 Résumé:');
    console.log(`   - Base de données: ${dbName}`);
    console.log(`   - Email admin: ${adminEmail}`);
    console.log(`   - Mot de passe admin: ${adminPassword}`);
    console.log('\n💡 N\'oubliez pas de créer le dossier "uploads" pour les images');

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Exécuter l'initialisation
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
