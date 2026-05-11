import {
  Code,
  Database,
  Globe,
  Palette,
  Settings,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { Skill } from "@/services/api";

export interface SkillCategoryDisplay {
  name: string;
  icon: LucideIcon;
  skills: {
    name: string;
    level: number;
  }[];
}

export const getSkillIcon = (categoryName: string) => {
  const normalized = categoryName.toLowerCase();

  if (normalized.includes("frontend")) return Code;
  if (normalized.includes("backend")) return Database;
  if (normalized.includes("design")) return Palette;
  if (normalized.includes("mobile")) return Smartphone;
  if (normalized.includes("cloud") || normalized.includes("devops")) {
    return Globe;
  }
  if (normalized.includes("outils") || normalized.includes("tools")) {
    return Settings;
  }

  return Code;
};

export const toSkillCategories = (
  skillsData: Record<string, Skill[]>,
): SkillCategoryDisplay[] =>
  Object.entries(skillsData).map(([categoryName, skills]) => ({
    name: categoryName,
    icon: getSkillIcon(categoryName),
    skills: skills.map((skill) => ({
      name: skill.nom,
      level: skill.niveau,
    })),
  }));

export const getAverageLevel = (skills: { level: number }[]) => {
  if (skills.length === 0) return 0;
  return Math.round(
    skills.reduce((total, skill) => total + skill.level, 0) / skills.length,
  );
};
