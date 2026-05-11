export interface PersonalInfo {
  id?: number;
  nom_complet: string;
  profession: string;
  localisation: string;
  description_courte: string;
  photo_profil?: string;
  email_contact: string;
  github_url?: string;
  linkedin_url?: string;
  facebook_url?: string;
}

export interface Project {
  id?: number;
  _id?: string;
  titre: string;
  description: string;
  technologies: string[];
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  statut: "actif" | "inactif";
}

export interface Skill {
  id?: number;
  nom: string;
  niveau: number;
  categorie: string;
  icone?: string;
}

// Données statiques
export const staticPersonalInfo: PersonalInfo = {
  nom_complet: "BOUKA MAKOSSO Pierre Daniel",
  profession: "Développeur web & étudiant en ingénierie informatique",
  localisation: "Libreville, Gabon",
  description_courte:
    "Développeur passionné, je conçois des applications modernes et performantes. Curieux et rigoureux, j'aime apprendre de nouvelles technologies et contribuer à des projets innovants.",
  email_contact: "mb.daniel241@gmail.com",

  github_url: "https://github.com/DanielMBD",
  linkedin_url: "https://www.linkedin.com/in/daniel-makosso",
  facebook_url: "https://www.facebook.com/daniel.devfullstak",
  photo_profil: "/5.jpg",
};

export const staticProjects: Project[] = [
  {
    id: 1,
    _id: "portfolio-professionnel",
    titre: "Porfolio professionnel",
    description:
      "Porfolio professionnel, presente les projets, les technologies etc",
    technologies: ["React", "TypeScript", "TailwindCSS"],
    image_url: "/image.png",
    // github_url: "https://github.com/DanielMb24/web-profile-pro-08",
    demo_url: "https://web-profile-pro-08.vercel.app/",
    statut: "actif",
  },
  {
    id: 2,
    _id: "application-gestion-taches",
    titre: "Application de gestion des taches",
    description:
      'Application de gestion de tâches inspirée de Trello, conçue avec React, TailwindCSS. Elle permet d’ajouter, modifier, supprimer et organiser les tâches dans trois colonnes ("À faire", "En cours", "Terminé"). La recherche par mots-clés, le dark mode et la sauvegarde automatique via localStorage assurent une expérience utilisateur complète et professionnelle.',
    technologies: ["React", "TypeScript", "Node.js", "TailwindCSS"],
    image_url: "/cpe_my_tf.png",
    // github_url: "https://github.com/DanielMb24/my_Task",
    demo_url: "https://my-tf.vercel.app/",
    statut: "actif",
  },
  {
    id: 3,
    _id: "application-gestion-modules",
    titre: "Application de gestion de modules",
    description:
      "Application web interactive développée avec React, TailwindCSS et Chart.js, permettant aux utilisateurs de suivre la progression de leurs modules de formation. Elle offre un tableau de bord moderne avec cartes de modules, gestion de progression en temps réel, visualisation par graphique circulaire et persistance via localStorage. L’interface est responsive, intuitive et propose un mode sombre.",
    technologies: ["React", "TypeScript", "Node.js", "TailwindCSS"],
    image_url: "/cpe_my_md.png",
    // github_url: "https://github.com/DanielMb24/mes-modules",
    demo_url: "https://my-md.vercel.app/",
    statut: "actif",
  },
  // {
  //   id: 4,
  //   titre: "E-commerce Platform",
  //   description: "Plateforme e-commerce moderne avec panier d'achat, système de paiement intégré et gestion des commandes. Interface administrateur complète.",
  //   technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Vercel"],
  //   image_url: "/placeholder.svg",
  //   github_url: "https://github.com/makosso-dev/ecommerce-platform",
  //   demo_url: "https://ecommerce-demo.vercel.app",
  //   statut: "actif"
  // }
];

export const staticSkills: Record<string, Skill[]> = {
  Frontend: [
    { nom: "HTML5", niveau: 70, categorie: "Frontend", icone: "Code" },
    { nom: "CSS3", niveau: 70, categorie: "Frontend", icone: "Palette" },
    { nom: "JavaScript", niveau: 65, categorie: "Frontend", icone: "Code" },
    { nom: "TypeScript", niveau: 65, categorie: "Frontend", icone: "Code" },
    { nom: "React", niveau: 60, categorie: "Frontend", icone: "Code" },
    { nom: "Next.js", niveau: 55, categorie: "Frontend", icone: "Code" },
    { nom: "TailwindCSS", niveau: 70, categorie: "Frontend", icone: "Palette" },
  ],
  Backend: [
    { nom: "Node.js", niveau: 60, categorie: "Backend", icone: "Database" },
    { nom: "Express.js", niveau: 60, categorie: "Backend", icone: "Database" },
    { nom: "MySQL", niveau: 75, categorie: "Backend", icone: "Database" },
    { nom: "PostgreSQL", niveau: 50, categorie: "Backend", icone: "Database" },

    { nom: "PHP", niveau: 60, categorie: "Backend", icone: "Code" },
    { nom: "API REST", niveau: 48, categorie: "Backend", icone: "Database" },
  ],
  "Outils & Technologies": [
    {
      nom: "Git/GitHub",
      niveau: 60,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "VS Code",
      niveau: 100,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "Adobe XD",
      niveau: 85,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "Figma",
      niveau: 60,
      categorie: "Outils & Technologies",
      icone: "Palette",
    },
    {
      nom: "Postman",
      niveau: 70,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "Vercel",
      niveau: 55,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "PhpStorm",
      niveau: 70,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "WebStorm",
      niveau: 85,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "intelliJ",
      niveau: 80,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
    {
      nom: "PyCharm",
      niveau: 85,
      categorie: "Outils & Technologies",
      icone: "Settings",
    },
  ],
  "Langages Programmations": [
    { nom: "C", niveau: 60, categorie: "Langages", icone: "Code" },
    { nom: "C++", niveau: 60, categorie: "Langages", icone: "Code" },
    { nom: "C#", niveau: 60, categorie: "Langages", icone: "Code" },
    { nom: "Python", niveau: 65, categorie: "Langages", icone: "Code" },
    { nom: "Java", niveau: 60, categorie: "Langages", icone: "Code" },
  ],
};

// Service pour récupérer les données statiques
export class StaticDataService {
  static async getPersonalInfo(): Promise<PersonalInfo> {
    // Simule un délai d'API
    await new Promise((resolve) => setTimeout(resolve, 300));
    return staticPersonalInfo;
  }

  static async getProjects(): Promise<Project[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return staticProjects.filter((project) => project.statut === "actif");
  }

  static async getSkills(): Promise<Record<string, Skill[]>> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return staticSkills;
  }
}
