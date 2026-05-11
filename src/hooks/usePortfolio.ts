import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api";
import type { PersonalInfo, Project, Skill } from "@/services/api";
import {
  StaticDataService,
  staticPersonalInfo,
  staticProjects,
  staticSkills,
} from "@/services/staticData";

export const usePersonalInfo = () => {
  return useQuery({
    queryKey: ["personalInfo"],
    queryFn: async () => {
      try {
        return await apiService.getPersonalInfo();
      } catch (error) {
        console.warn(
          "API non disponible, utilisation des données statiques",
          error,
        );
        return staticPersonalInfo;
      }
    },
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        return await apiService.getProjects();
      } catch (error) {
        console.warn(
          "API non disponible, utilisation des données statiques",
          error,
        );
        return staticProjects.filter((project) => project.statut === "actif");
      }
    },
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      try {
        return await apiService.getSkills();
      } catch (error) {
        console.warn(
          "API non disponible, utilisation des données statiques",
          error,
        );
        return staticSkills;
      }
    },
  });
};

export const useProject = (id: string | undefined) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) throw new Error("ID du projet requis");
      try {
        return await apiService.getProjectById(id);
      } catch (error) {
        console.warn(
          "API non disponible, utilisation des données statiques",
          error,
        );
        const project = staticProjects.find(
          (p) => p._id === id || String(p.id) === id,
        );
        if (!project) throw new Error("Projet non trouvé");
        return project;
      }
    },
    enabled: !!id,
  });
};

// Types exportés pour l'utilisation dans les composants
export type { PersonalInfo, Project, Skill };
