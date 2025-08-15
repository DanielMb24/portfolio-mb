import { useState } from "react";
import { Github, ExternalLink, Eye } from "lucide-react";
import { ButtonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/usePortfolio";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const { data: projects = [], isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Chargement des projets...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Erreur lors du chargement des projets:', error);
  }

  // Transform backend data to match frontend expectations
  const transformedProjects = projects.map(project => ({
    id: project.id!,
    title: project.titre,
    description: project.description,
    longDescription: project.description, // Could be enhanced with a separate field
    image: project.image_url || "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
    technologies: project.technologies,
    githubUrl: project.github_url,
    liveUrl: project.demo_url,
    featured: true, // You could add a featured field to the backend
  }));

  const featuredProjects = transformedProjects.slice(0, 2); // Show first 2 as featured
  const otherProjects = transformedProjects.slice(2); // Rest as other projects

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Mes Projets
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de mes réalisations les plus récentes
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">Projets Phares</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <Card key={project.id} className="group overflow-hidden glass hover:shadow-card transition-all duration-500 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <ButtonVariants variant="glass" size="sm" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github size={16} className="mr-1" />
                              Code
                            </a>
                          </ButtonVariants>
                        )}
                        {project.liveUrl && (
                          <ButtonVariants variant="glass" size="sm" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={16} className="mr-1" />
                              Demo
                            </a>
                          </ButtonVariants>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                    <ButtonVariants 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedProject(project.id)}
                      className="w-full"
                    >
                      <Eye size={16} className="mr-2" />
                      Voir détails
                    </ButtonVariants>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center">Autres Projets</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <Card key={project.id} className="glass hover:shadow-card transition-all duration-300 animate-fade-in" style={{ animationDelay: `${(index + 2) * 0.2}s` }}>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                    <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <ButtonVariants variant="outline" size="sm" className="flex-1" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github size={14} />
                          </a>
                        </ButtonVariants>
                      )}
                      {project.liveUrl && (
                        <ButtonVariants variant="outline" size="sm" className="flex-1" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} />
                          </a>
                        </ButtonVariants>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {transformedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun projet disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
