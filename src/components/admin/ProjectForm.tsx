
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import ApiService, { Project } from '@/services/api';

const projectSchema = z.object({
  titre: z.string().min(1, 'Titre requis'),
  description: z.string().min(1, 'Description requise'),
  technologies: z.array(z.string()).min(1, 'Au moins une technologie requise'),
  image_url: z.string().optional(),
  github_url: z.string().url().optional().or(z.literal('')),
  demo_url: z.string().url().optional().or(z.literal('')),
  statut: z.enum(['actif', 'inactif']),
});

type ProjectForm = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project | null;
  onSuccess: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSuccess }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      titre: '',
      description: '',
      technologies: [],
      image_url: '',
      github_url: '',
      demo_url: '',
      statut: 'actif',
    },
  });

  const technologiesInput = watch('technologies');
  const statut = watch('statut');

  useEffect(() => {
    if (project) {
      reset({
        titre: project.titre,
        description: project.description,
        technologies: project.technologies,
        image_url: project.image_url || '',
        github_url: project.github_url || '',
        demo_url: project.demo_url || '',
        statut: project.statut,
      });
    }
  }, [project, reset]);

  const createMutation = useMutation({
    mutationFn: (data: ProjectForm) => {
      const projectData: Omit<Project, 'id'> = {
        titre: data.titre,
        description: data.description,
        technologies: data.technologies,
        image_url: data.image_url || undefined,
        github_url: data.github_url || undefined,
        demo_url: data.demo_url || undefined,
        statut: data.statut,
      };
      return ApiService.createProject(projectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast({
        title: 'Succès',
        description: 'Projet créé avec succès',
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la création',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ProjectForm) => {
      const projectData: Partial<Project> = {
        titre: data.titre,
        description: data.description,
        technologies: data.technologies,
        image_url: data.image_url || undefined,
        github_url: data.github_url || undefined,
        demo_url: data.demo_url || undefined,
        statut: data.statut,
      };
      return ApiService.updateProject(project!.id!, projectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast({
        title: 'Succès',
        description: 'Projet mis à jour avec succès',
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la mise à jour',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ProjectForm) => {
    if (project) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleTechnologiesChange = (value: string) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0);
    setValue('technologies', technologies);
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="titre">Titre du projet *</Label>
        <Input
          id="titre"
          {...register('titre')}
          placeholder="Mon super projet"
          error={errors.titre?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Description détaillée du projet..."
          rows={4}
          className={errors.description ? 'border-destructive' : ''}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="technologies">Technologies (séparées par des virgules) *</Label>
        <Input
          id="technologies"
          placeholder="React, Node.js, MySQL, TailwindCSS"
          defaultValue={technologiesInput?.join(', ') || ''}
          onChange={(e) => handleTechnologiesChange(e.target.value)}
        />
        {errors.technologies && (
          <p className="text-sm text-destructive">{errors.technologies.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">URL de l'image</Label>
        <Input
          id="image_url"
          {...register('image_url')}
          placeholder="https://..."
          error={errors.image_url?.message}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            {...register('github_url')}
            placeholder="https://github.com/..."
            error={errors.github_url?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo_url">Demo URL</Label>
          <Input
            id="demo_url"
            {...register('demo_url')}
            placeholder="https://..."
            error={errors.demo_url?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Statut</Label>
        <Select value={statut} onValueChange={(value: 'actif' | 'inactif') => setValue('statut', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="actif">Actif</SelectItem>
            <SelectItem value="inactif">Inactif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sauvegarde...' : (project ? 'Mettre à jour' : 'Créer le projet')}
      </Button>
    </form>
  );
};

export default ProjectForm;
