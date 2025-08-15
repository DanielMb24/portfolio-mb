
import { useQuery } from '@tanstack/react-query';
import ApiService from '@/services/api';

export const usePersonalInfo = () => {
  return useQuery({
    queryKey: ['personalInfo'],
    queryFn: () => ApiService.getPersonalInfo(),
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => ApiService.getProjects(),
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => ApiService.getSkills(),
  });
};
