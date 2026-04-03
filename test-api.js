#!/usr/bin/env node

/**
 * Script de test de l'API déployée sur Vercel
 * Usage: node test-api.js
 */

const API_URL = "https://danielmb-api.vercel.app/api";

async function testEndpoint(name, url, options = {}) {
  try {
    console.log(`\n🧪 Test: ${name}`);
    console.log(`   URL: ${url}`);

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      console.log(`   ✅ Succès (${response.status})`);
      console.log(
        `   📦 Données:`,
        JSON.stringify(data, null, 2).substring(0, 200) + "...",
      );
      return true;
    } else {
      console.log(`   ❌ Échec (${response.status})`);
      console.log(`   ⚠️  Erreur:`, data);
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Erreur réseau:`, error.message);
    return false;
  }
}

async function runTests() {
  console.log("🚀 Test de l'API Backend - danielmb-api.vercel.app");
  console.log("=".repeat(60));

  let passed = 0;
  let failed = 0;

  // Test 1: Health Check
  if (await testEndpoint("Health Check", `${API_URL}/health`)) {
    passed++;
  } else {
    failed++;
  }

  // Test 2: Get Personal Info
  if (await testEndpoint("Personal Info", `${API_URL}/portfolio/info`)) {
    passed++;
  } else {
    failed++;
  }

  // Test 3: Get Projects
  if (await testEndpoint("Projects", `${API_URL}/portfolio/projects`)) {
    passed++;
  } else {
    failed++;
  }

  // Test 4: Get Skills
  if (await testEndpoint("Skills", `${API_URL}/portfolio/skills`)) {
    passed++;
  } else {
    failed++;
  }

  // Test 5: Contact (POST)
  if (
    await testEndpoint("Contact Form", `${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: "Test User",
        email: "test@example.com",
        message: "Test message from API test script",
      }),
    })
  ) {
    passed++;
  } else {
    failed++;
  }

  // Résumé
  console.log("\n" + "=".repeat(60));
  console.log("📊 RÉSUMÉ DES TESTS");
  console.log("=".repeat(60));
  console.log(`✅ Tests réussis: ${passed}`);
  console.log(`❌ Tests échoués: ${failed}`);
  console.log(
    `📈 Taux de réussite: ${Math.round((passed / (passed + failed)) * 100)}%`,
  );

  if (failed === 0) {
    console.log(
      "\n🎉 Tous les tests sont passés! L'API fonctionne correctement.",
    );
    process.exit(0);
  } else {
    console.log("\n⚠️  Certains tests ont échoué. Vérifiez la configuration.");
    console.log("\n📖 Consultez VERCEL_CONFIG.md pour plus d'informations.");
    process.exit(1);
  }
}

// Exécuter les tests
runTests().catch((error) => {
  console.error("❌ Erreur fatale:", error);
  process.exit(1);
});
