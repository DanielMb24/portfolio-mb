
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import ApiService, { Skill } from '@/services/api';

const skillSchema = z.object({
  nom: z.string().min(1, 'Nom requis'),
  niveau: z.number().min(0).max(100),
  categorie: z.string().min(1, 'Catégorie requise'),
  icone: z.string().optional(),
});

type SkillForm = z.infer<typeof skillSchema>;

interface SkillFormProps {
  skill?: Skill | null;
  onSuccess: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ skill, onSuccess }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<SkillForm>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      nom: '',
      niveau: 50,
      categorie: '',
      icone: '',
    },
  });

  const niveau = watch('niveau');

  useEffect(() => {
    if (skill) {
      reset({
        nom: skill.nom,
        niveau: skill.niveau,
        categorie: skill.categorie,
        icone: skill.icone || '',
      });
    }
  }, [skill, reset]);

  const createMutation = useMutation({
    mutationFn: (data: SkillForm) => {
      const skillData: Omit<Skill, 'id'> = {
        nom: data.nom,
        niveau: data.niveau,
        categorie: data.categorie,
        icone: data.icone || undefined,
      };
      return ApiService.createSkill(skillData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
      toast({
        title: 'Succès',
        description: 'Compétence créée avec succès',
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
    mutationFn: (data: SkillForm) => {
      const skillData: Partial<Skill> = {
        nom: data.nom,
        niveau: data.niveau,
        categorie: data.categorie,
        icone: data.icone || undefined,
      };
      return ApiService.updateSkill(skill!.id!, skillData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
      toast({
        title: 'Succès',
        description: 'Compétence mise à jour avec succès',
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

  const onSubmit = (data: SkillForm) => {
    if (skill) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const commonCategories = ['Frontend', 'Backend', 'Mobile', 'Design', 'Cloud & DevOps', 'Outils'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nom">Nom de la compétence *</Label>
        <Input
          id="nom"
          {...register('nom')}
          placeholder="Ex: React, Node.js, Photoshop..."
          error={errors.nom?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="categorie">Catégorie *</Label>
        <Input
          id="categorie"
          {...register('categorie')}
          placeholder="Ex: Frontend, Backend, Design..."
          error={errors.categorie?.message}
          list="categories"
        />
        <datalist id="categories">
          {commonCategories.map(cat => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
      </div>

      <div className="space-y-2">
        <Label>Niveau de maîtrise: {niveau}%</Label>
        <Slider
          value={[niveau]}
          onValueChange={(value) => setValue('niveau', value[0])}
          max={100}
          step={5}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icone">Icône (optionnel)</Label>
        <Input
          id="icone"
          {...register('icone')}
          placeholder="Nom de l'icône Lucide (ex: Code, Database...)"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sauvegarde...' : (skill ? 'Mettre à jour' : 'Créer la compétence')}
      </Button>
    </form>
  );
};

export default SkillForm;
