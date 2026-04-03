#!/usr/bin/env node

/**
 * Script de vérification avant déploiement Vercel
 * Vérifie que tous les fichiers et configurations sont en place
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Vérification de la configuration de déploiement Vercel...\n");

let errors = 0;
let warnings = 0;

// Vérifier les fichiers essentiels
const requiredFiles = [
  "server.js",
  "package.json",
  "vercel.json",
  ".vercelignore",
  "config/database.js",
  "routes/auth.js",
  "routes/portfolio.js",
  "routes/admin.js",
  "routes/contact.js",
  "models/User.js",
  "middleware/auth.js",
];

console.log("📁 Vérification des fichiers essentiels...");
requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, "..", file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MANQUANT`);
    errors++;
  }
});

// Vérifier package.json
console.log("\n📦 Vérification de package.json...");
try {
  const packageJson = require("../package.json");

  const requiredDeps = [
    "express",
    "mongoose",
    "jsonwebtoken",
    "bcryptjs",
    "cors",
    "dotenv",
    "multer",
    "express-validator",
    "helmet",
    "express-rate-limit",
    "nodemailer",
  ];

  requiredDeps.forEach((dep) => {
    if (packageJson.dependencies[dep]) {
      console.log(`  ✅ ${dep}`);
    } else {
      console.log(`  ❌ ${dep} - MANQUANT`);
      errors++;
    }
  });

  // Vérifier les scripts
  if (packageJson.scripts.start) {
    console.log(`  ✅ Script "start" défini`);
  } else {
    console.log(`  ❌ Script "start" manquant`);
    errors++;
  }
} catch (error) {
  console.log(
    `  ❌ Erreur lors de la lecture de package.json: ${error.message}`,
  );
  errors++;
}

// Vérifier vercel.json
console.log("\n⚙️  Vérification de vercel.json...");
try {
  const vercelConfig = require("../vercel.json");

  if (vercelConfig.version === 2) {
    console.log(`  ✅ Version 2 configurée`);
  } else {
    console.log(`  ⚠️  Version ${vercelConfig.version} (recommandé: 2)`);
    warnings++;
  }

  if (vercelConfig.builds && vercelConfig.builds.length > 0) {
    console.log(`  ✅ Builds configurés`);
  } else {
    console.log(`  ❌ Builds non configurés`);
    errors++;
  }

  if (vercelConfig.routes && vercelConfig.routes.length > 0) {
    console.log(`  ✅ Routes configurées`);
  } else {
    console.log(`  ❌ Routes non configurées`);
    errors++;
  }
} catch (error) {
  console.log(
    `  ❌ Erreur lors de la lecture de vercel.json: ${error.message}`,
  );
  errors++;
}

// Vérifier .env.example ou documentation des variables
console.log("\n🔐 Variables d'environnement requises:");
const requiredEnvVars = [
  "MONGODB_URI",
  "JWT_SECRET",
  "FRONTEND_URL",
  "NODE_ENV",
  "EMAIL_USER",
  "EMAIL_PASS",
];

console.log("  ℹ️  Assurez-vous de configurer ces variables sur Vercel:");
requiredEnvVars.forEach((envVar) => {
  console.log(`     - ${envVar}`);
});

// Vérifier .vercelignore
console.log("\n🚫 Vérification de .vercelignore...");
if (fs.existsSync(path.join(__dirname, "..", ".vercelignore"))) {
  console.log(`  ✅ .vercelignore présent`);
} else {
  console.log(`  ⚠️  .vercelignore manquant (recommandé)`);
  warnings++;
}

// Résumé
console.log("\n" + "=".repeat(50));
console.log("📊 RÉSUMÉ");
console.log("=".repeat(50));

if (errors === 0 && warnings === 0) {
  console.log("✅ Tout est prêt pour le déploiement sur Vercel!");
  console.log("\n📝 Prochaines étapes:");
  console.log("   1. cd backend");
  console.log("   2. vercel (ou connecter via GitHub)");
  console.log("   3. Configurer les variables d'environnement sur Vercel");
  console.log("   4. vercel --prod");
  process.exit(0);
} else {
  if (errors > 0) {
    console.log(`❌ ${errors} erreur(s) trouvée(s)`);
  }
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} avertissement(s)`);
  }
  console.log("\n📖 Consultez TROUBLESHOOTING.md pour plus d'aide");
  process.exit(1);
}
