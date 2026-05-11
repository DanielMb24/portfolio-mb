export interface ExperienceProject {
  title: string;
  description: string;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  position: string;
  period: string;
  website?: string;
  description: string;
  technologies: string[];
  type: "Stage" | "Collaboration";
  overview: string;
  missions: string[];
  projects: ExperienceProject[];
  deliverables: string[];
  learnings: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "oxilyum-developpement-web",
    company: "Oxilyum",
    location: "Libreville",
    position: "Stage en développement d'application web",
    period: "05 Mai 2025 - 05 Août 2025",
    description:
      "Développement complet d'application web et élaboration de documents techniques.",
    technologies: ["React", "TailwindCSS", "Node.js", "Express.js", "MySQL"],
    type: "Stage",
    overview:
      "Stage orienté conception et développement web, avec une implication sur les interfaces, la logique applicative et la documentation technique autour d'une application métier.",
    missions: [
      "Concevoir des interfaces web responsives et faciles à utiliser.",
      "Mettre en place des composants React réutilisables.",
      "Participer à la structuration de la logique backend avec Node.js et Express.",
      "Documenter les choix techniques et les fonctionnalités développées.",
    ],
    projects: [
      {
        title: "Application web interne",
        description:
          "Participation au développement d'une application web complète, de l'interface utilisateur à la logique serveur.",
        tags: ["React", "Express.js", "MySQL"],
      },
      {
        title: "Documentation technique",
        description:
          "Rédaction de supports permettant de comprendre les fonctionnalités, l'installation et les choix techniques.",
        tags: ["Analyse", "Rédaction", "UML"],
      },
    ],
    deliverables: [
      "Interfaces responsives",
      "Composants frontend",
      "Routes et logique serveur",
      "Documents techniques",
    ],
    learnings: [
      "Structurer un projet web complet",
      "Travailler entre frontend et backend",
      "Formaliser une solution avec une documentation claire",
    ],
  },
  {
    id: "mairie-centrale-maintenance",
    company: "Mairie Centrale",
    location: "Port-Gentil",
    position: "Stage en maintenance informatique",
    period: "Juillet 2023 - Septembre 2023",
    description:
      "Assistance technique aux utilisateurs sur divers outils et applications, avec rédaction de documents techniques.",
    technologies: ["Maintenance", "Support utilisateur", "Microsoft Office"],
    type: "Stage",
    overview:
      "Stage centré sur l'assistance informatique, la résolution de problèmes utilisateurs et l'accompagnement autour des outils bureautiques et applicatifs.",
    missions: [
      "Assister les utilisateurs dans l'utilisation des outils et applications.",
      "Diagnostiquer des problèmes informatiques courants.",
      "Participer aux interventions de maintenance matérielle et logicielle.",
      "Produire des documents techniques simples pour faciliter le support.",
    ],
    projects: [
      {
        title: "Support utilisateurs",
        description:
          "Accompagnement des agents dans la résolution de problèmes liés aux outils numériques du quotidien.",
        tags: ["Support", "Diagnostic", "Maintenance"],
      },
      {
        title: "Documents de suivi",
        description:
          "Élaboration de documents techniques pour suivre les interventions et clarifier les procédures.",
        tags: ["Word", "Excel", "Documentation"],
      },
    ],
    deliverables: [
      "Assistance utilisateurs",
      "Diagnostics techniques",
      "Documents de suivi",
      "Procédures de base",
    ],
    learnings: [
      "Comprendre les besoins réels des utilisateurs",
      "Communiquer clairement pendant une intervention",
      "Gérer des problèmes techniques dans un contexte professionnel",
    ],
  },
  {
    id: "companyviene-fullstack",
    company: "CompanyViene",
    location: "Remote / Libreville",
    position: "Développeur Full Stack",
    period: "2024 - Présent",
    website: "https://companyviene.com",
    description:
      "Développement d'applications web modernes et solutions digitales pour les clients.",
    technologies: ["React", "Node.js", "TypeScript", "MongoDB"],
    type: "Collaboration",
    overview:
      "Collaboration sur des solutions digitales orientées client, avec un travail sur l'expérience utilisateur, la performance et la structuration technique.",
    missions: [
      "Développer des interfaces web modernes avec React.",
      "Intégrer des fonctionnalités backend et des API.",
      "Améliorer la lisibilité, la performance et la maintenabilité du code.",
      "Participer à l'évolution de solutions digitales existantes.",
    ],
    projects: [
      {
        title: "Sites et interfaces client",
        description:
          "Développement d'interfaces web adaptées aux besoins des clients et aux contraintes de présentation.",
        tags: ["React", "TypeScript", "UI"],
      },
      {
        title: "Fonctionnalités full stack",
        description:
          "Mise en place de fonctionnalités reliant interfaces, API et données.",
        tags: ["Node.js", "MongoDB", "API"],
      },
    ],
    deliverables: [
      "Interfaces client",
      "Composants réutilisables",
      "Intégrations API",
      "Améliorations UI",
    ],
    learnings: [
      "Livrer des interfaces orientées usage",
      "Travailler avec une stack JavaScript complète",
      "Adapter les solutions aux besoins client",
    ],
  },
  {
    id: "devgroup-africa-web",
    company: "DevGroup Africa",
    location: "Gabon",
    position: "Développeur Web",
    period: "2023 - Présent",
    website: "https://devgroup.ga",
    description:
      "Participation au développement de projets web innovants et accompagnement technique.",
    technologies: ["JavaScript", "PHP", "MySQL", "TailwindCSS"],
    type: "Collaboration",
    overview:
      "Collaboration web autour de projets variés, avec un accent sur l'intégration, les bases de données et les interfaces responsives.",
    missions: [
      "Développer des pages et fonctionnalités web.",
      "Participer à l'intégration frontend avec TailwindCSS.",
      "Contribuer à la logique PHP et aux opérations CRUD.",
      "Travailler avec des bases de données MySQL.",
    ],
    projects: [
      {
        title: "Interfaces web responsives",
        description:
          "Création et amélioration de pages web adaptées aux supports desktop et mobile.",
        tags: ["JavaScript", "TailwindCSS", "Responsive"],
      },
      {
        title: "Modules CRUD",
        description:
          "Participation à des fonctionnalités de création, lecture, modification et suppression de données.",
        tags: ["PHP", "MySQL", "CRUD"],
      },
    ],
    deliverables: [
      "Pages web",
      "Modules CRUD",
      "Intégrations responsive",
      "Corrections techniques",
    ],
    learnings: [
      "Renforcer les bases PHP/MySQL",
      "Construire des interfaces simples à maintenir",
      "Collaborer sur des projets web évolutifs",
    ],
  },
];

export const cvSkills = [
  "PHP CRUD",
  "Express.js",
  "Node.js",
  "React.js",
  "TailwindCSS",
  "UML",
  "MySQL",
  "MongoDB",
  "Adobe XD",
  "WampServer",
];

export const getExperienceById = (id: string | undefined) =>
  experiences.find((experience) => experience.id === id);
