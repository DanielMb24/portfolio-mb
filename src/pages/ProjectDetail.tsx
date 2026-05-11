import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers3,
} from "lucide-react";
import { useProject } from "@/hooks/usePortfolio";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { resolveMediaUrl } from "@/services/api";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement du projet...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Projet non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            Le projet que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => navigate("/projects")}>
            <ArrowLeft className="mr-2" size={18} />
            Retour aux projets
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-28">
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-secondary"
          >
            <ArrowLeft size={20} />
            Retour aux projets
          </Link>
        </div>

        <div className="mx-auto max-w-6xl">
          <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="space-y-7">
              <div className="space-y-4">
                <span className="section-kicker">Étude de projet</span>
                <h1 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">
                  {project.titre}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-secondary/15 bg-secondary/10 px-3 py-1.5 text-xs font-bold text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="btn-gradient gap-2">
                      Voir le projet
                      <ExternalLink size={18} />
                    </Button>
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-2xl gap-2"
                    >
                      Code source
                      <Github size={18} />
                    </Button>
                  </a>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] border border-white/70 bg-card/40 dark:border-white/10" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-card p-2 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.85)] dark:border-white/10">
                <div className="aspect-video overflow-hidden rounded-[1.25rem] bg-muted">
                  <img
                    src={resolveMediaUrl(project.image_url, "/placeholder.svg")}
                    alt={project.titre}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="card-modern p-6 md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <Layers3 className="h-5 w-5 text-secondary" />
                <h2 className="text-2xl font-bold">À propos du projet</h2>
              </div>
              <p className="whitespace-pre-line text-base leading-8 text-muted-foreground">
                {project.description}
              </p>
            </div>

            <div className="card-modern p-6">
              <h3 className="mb-4 text-lg font-bold">Informations</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 p-3">
                  <Calendar size={18} className="text-secondary" />
                  <span className="text-sm font-semibold text-muted-foreground">
                    {project.statut === "actif"
                      ? "Projet actif"
                      : "Projet archivé"}
                  </span>
                </div>
                {project.demo_url && (
                  <div className="flex items-center gap-3 rounded-2xl border border-secondary/15 bg-secondary/10 p-3">
                    <CheckCircle2 size={18} className="text-secondary" />
                    <span className="text-sm font-bold text-secondary">
                      Disponible en ligne
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
