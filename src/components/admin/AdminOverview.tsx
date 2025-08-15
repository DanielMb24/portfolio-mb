
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Code, MessageSquare, User } from 'lucide-react';
import ApiService from '@/services/api';

const AdminOverview = () => {
  const { data: projects = [] } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => ApiService.getAllProjects(),
  });

  const { data: skills = {} } = useQuery({
    queryKey: ['admin-skills'],
    queryFn: () => ApiService.getAllSkills(),
  });

  const { data: contactsData } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: () => ApiService.getContacts(1, 1),
  });

  const totalSkills = Object.values(skills).reduce((acc, skillArray) => acc + skillArray.length, 0);
  const activeProjects = projects.filter(p => p.statut === 'actif').length;
  const unreadMessages = contactsData?.unreadCount || 0;

  const stats = [
    {
      title: 'Projets actifs',
      value: activeProjects,
      total: projects.length,
      icon: FolderOpen,
      color: 'text-blue-600',
    },
    {
      title: 'Compétences',
      value: totalSkills,
      total: Object.keys(skills).length,
      icon: Code,
      color: 'text-green-600',
    },
    {
      title: 'Messages non lus',
      value: unreadMessages,
      total: contactsData?.contacts?.length || 0,
      icon: MessageSquare,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Vue d'ensemble</h1>
        <p className="text-muted-foreground mt-2">
          Tableau de bord administrateur du portfolio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                Total: {stat.total}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Projets récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{project.titre}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {project.description}
                  </p>
                </div>
                <Badge variant={project.statut === 'actif' ? 'default' : 'secondary'}>
                  {project.statut}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills by Category */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Compétences par catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{category}</h4>
                <p className="text-sm text-muted-foreground">
                  {skillList.length} compétence{skillList.length > 1 ? 's' : ''}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {skillList.slice(0, 3).map((skill) => (
                    <Badge key={skill.id} variant="outline" className="text-xs">
                      {skill.nom}
                    </Badge>
                  ))}
                  {skillList.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{skillList.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
