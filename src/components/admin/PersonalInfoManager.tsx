
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import ApiService, { PersonalInfo } from '@/services/api';

const personalInfoSchema = z.object({
  nom_complet: z.string().min(1, 'Nom complet requis'),
  profession: z.string().min(1, 'Profession requise'),
  localisation: z.string().min(1, 'Localisation requise'),
  description_courte: z.string().min(1, 'Description requise'),
  photo_profil: z.string().optional(),
  email_contact: z.string().email('Email valide requis'),
  github_url: z.string().url().optional().or(z.literal('')),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  facebook_url: z.string().url().optional().or(z.literal('')),
});

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

const PersonalInfoManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: personalInfo, isLoading } = useQuery({
    queryKey: ['personalInfo'],
    queryFn: () => ApiService.getPersonalInfo(),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    values: personalInfo ? {
      nom_complet: personalInfo.nom_complet,
      profession: personalInfo.profession,
      localisation: personalInfo.localisation,
      description_courte: personalInfo.description_courte,
      photo_profil: personalInfo.photo_profil || '',
      email_contact: personalInfo.email_contact,
      github_url: personalInfo.github_url || '',
      linkedin_url: personalInfo.linkedin_url || '',
      facebook_url: personalInfo.facebook_url || '',
    } : undefined,
  });

  const updateMutation = useMutation({
    mutationFn: (data: PersonalInfoForm) => {
      const personalInfoData: PersonalInfo = {
        nom_complet: data.nom_complet,
        profession: data.profession,
        localisation: data.localisation,
        description_courte: data.description_courte,
        email_contact: data.email_contact,
        photo_profil: data.photo_profil || undefined,
        github_url: data.github_url || undefined,
        linkedin_url: data.linkedin_url || undefined,
        facebook_url: data.facebook_url || undefined,
      };
      return ApiService.updatePersonalInfo(personalInfoData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['personalInfo'] });
      toast({
        title: 'Succès',
        description: 'Informations personnelles mises à jour',
      });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la mise à jour',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: PersonalInfoForm) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Informations personnelles</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos informations personnelles affichées sur le portfolio
        </p>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Modifier les informations</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nom_complet">Nom complet *</Label>
                <Input
                  id="nom_complet"
                  {...register('nom_complet')}
                  error={errors.nom_complet?.message}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession">Profession *</Label>
                <Input
                  id="profession"
                  {...register('profession')}
                  error={errors.profession?.message}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="localisation">Localisation *</Label>
                <Input
                  id="localisation"
                  {...register('localisation')}
                  error={errors.localisation?.message}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email_contact">Email de contact *</Label>
                <Input
                  id="email_contact"
                  type="email"
                  {...register('email_contact')}
                  error={errors.email_contact?.message}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_courte">Description courte *</Label>
              <Textarea
                id="description_courte"
                {...register('description_courte')}
                rows={3}
                className={errors.description_courte ? 'border-destructive' : ''}
              />
              {errors.description_courte && (
                <p className="text-sm text-destructive">{errors.description_courte.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo_profil">URL Photo de profil</Label>
              <Input
                id="photo_profil"
                {...register('photo_profil')}
                placeholder="https://..."
                error={errors.photo_profil?.message}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
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
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  {...register('linkedin_url')}
                  placeholder="https://linkedin.com/in/..."
                  error={errors.linkedin_url?.message}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  {...register('facebook_url')}
                  placeholder="https://facebook.com/..."
                  error={errors.facebook_url?.message}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoManager;
