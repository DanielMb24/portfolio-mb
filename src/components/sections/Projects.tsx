import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/usePortfolio";

const Projects = () => {
  const { data: projects = [], isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <section id="projects" className="section-shell relative">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Chargement des projets...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des projets:", error);
  }

  const transformedProjects = projects.map((project) => ({
    id: project._id!,
    title: project.titre,
    description: project.description,
    longDescription: project.description, // Could be enhanced with a separate field
    image:
      project.image_url ||
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
    technologies: project.technologies,
    githubUrl: project.github_url,
    liveUrl: project.demo_url,
    featured: true, // You could add a featured field to the backend
  }));

  const featuredProjects = transformedProjects.slice(0, 6); // Afficher 6 projets

  return (
    <section id="projects" className="section-shell relative">
      <div className="container mx-auto px-6">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-end">
          <div className="space-y-4">
          <span className="section-kicker">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-normal">
            Projets <span className="text-gradient">Récents</span>
          </h2>
          </div>
          <p className="text-base leading-7 text-muted-foreground md:text-right">
            Une sélection de mes réalisations qui démontrent mes compétences
            techniques et ma créativité
          </p>
        </div>

        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <Card
                    className="card-modern group relative h-full animate-fade-in overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-70" />

                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="border border-white/25 bg-background/90 p-2 backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
                            aria-label={`Voir le code source de ${project.title}`}
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="border border-white/25 bg-background/90 p-2 backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
                            aria-label={`Ouvrir la démo de ${project.title}`}
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-secondary">
                        Voir le projet
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {transformedProjects.length > 6 && (
          <div className="text-center">
            <Link to="/projects">
              <Button size="lg" variant="outline" className="group rounded-md">
                Voir tous les projets
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Button>
            </Link>
          </div>
        )}

        {transformedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Aucun projet disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
