import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileText,
  Layers3,
  MapPin,
  Target,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getExperienceById } from "@/services/experienceData";

const ExperienceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const experience = getExperienceById(id);

  if (!experience) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-28 text-center">
          <h1 className="mb-4 text-3xl font-black">Expérience non trouvée</h1>
          <p className="mb-8 text-muted-foreground">
            Cette expérience n'existe pas ou n'est plus disponible.
          </p>
          <Button onClick={() => navigate("/#experience")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au parcours
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const isStage = experience.type === "Stage";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-28">
        <div className="mb-8">
          <Link
            to="/#experience"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au parcours
          </Link>
        </div>

        <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-7">
            <div className="space-y-4">
              <span
                className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${
                  isStage
                    ? "border-secondary/20 bg-secondary/10 text-secondary"
                    : "border-primary/15 bg-primary/5 text-foreground"
                }`}
              >
                {experience.type}
              </span>

              <h1 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">
                {experience.company}
              </h1>

              <p className="text-xl font-bold text-foreground">
                {experience.position}
              </p>

              <p className="max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                {experience.overview}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-secondary/15 bg-secondary/10 px-3 py-1.5 text-xs font-bold text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="btn-gradient gap-2">
                    Voir le site
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              )}
              <Link to="/#contact">
                <Button variant="outline" size="lg" className="rounded-2xl gap-2">
                  Me contacter
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <aside className="card-modern overflow-hidden">
            <div className="border-b border-border/70 bg-primary p-6 text-primary-foreground">
              <Briefcase className="mb-4 h-7 w-7" />
              <h2 className="text-2xl font-black">Contexte</h2>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/70">
                Repères essentiels pour comprendre le cadre de cette expérience.
              </p>
            </div>
            <div className="grid gap-3 p-4">
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <Calendar className="mb-3 h-5 w-5 text-secondary" />
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Période
                </p>
                <p className="mt-1 text-sm font-bold">{experience.period}</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <MapPin className="mb-3 h-5 w-5 text-secondary" />
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Lieu
                </p>
                <p className="mt-1 text-sm font-bold">{experience.location}</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <Target className="mb-3 h-5 w-5 text-secondary" />
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Type
                </p>
                <p className="mt-1 text-sm font-bold">{experience.type}</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="card-modern p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
              <h2 className="text-2xl font-black">Missions réalisées</h2>
            </div>
            <div className="space-y-3">
              {experience.missions.map((mission) => (
                <div
                  key={mission}
                  className="rounded-2xl border border-border bg-background/60 p-4 text-sm leading-6 text-muted-foreground"
                >
                  {mission}
                </div>
              ))}
            </div>
          </div>

          <div className="card-modern p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <FileText className="h-5 w-5 text-secondary" />
              <h2 className="text-2xl font-black">Livrables</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {experience.deliverables.map((deliverable) => (
                <div
                  key={deliverable}
                  className="rounded-2xl border border-secondary/15 bg-secondary/10 p-4 text-sm font-bold text-foreground"
                >
                  {deliverable}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-6xl">
          <div className="card-modern p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-secondary" />
              <h2 className="text-2xl font-black">Projets & contributions</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {experience.projects.map((project) => (
                <article
                  key={project.title}
                  className="rounded-3xl border border-border bg-background/60 p-5"
                >
                  <h3 className="text-xl font-black">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-secondary/15 bg-secondary/10 px-3 py-1 text-xs font-bold text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-6xl">
          <div className="soft-panel p-6 md:p-8">
            <h2 className="mb-5 text-2xl font-black">
              Ce que cette expérience m'a apporté
            </h2>
            <div className="grid gap-3 md:grid-cols-3">
              {experience.learnings.map((learning) => (
                <div
                  key={learning}
                  className="rounded-2xl border border-border bg-card/70 p-4 text-sm font-semibold leading-6 text-muted-foreground"
                >
                  {learning}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExperienceDetail;
