import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useProjects } from "@/hooks/usePortfolio";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ProjectsPage = () => {
  const { data: projects = [], isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            Chargement des projets...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des projets:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-28">
        <div className="mb-12">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={20} />
            Retour à l'accueil
          </Link>

          <div className="space-y-4">
            <span className="section-kicker">Portfolio complet</span>
            <h1 className="text-4xl md:text-5xl font-black tracking-normal">
              Tous mes{" "}
              <span className="text-gradient">Projets</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Découvrez l'ensemble de mes réalisations et projets personnels
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Link key={project._id} to={`/projects/${project._id}`}>
              <Card
                className="card-modern group relative h-full animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={
                      project.image_url ||
                      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop"
                    }
                    alt={project.titre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-70" />

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg border border-white/25 bg-background/90 p-2 backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Voir le code source de ${project.titre}`}
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg border border-white/25 bg-background/90 p-2 backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Ouvrir la démo de ${project.titre}`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.titre}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Aucun projet disponible pour le moment.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
