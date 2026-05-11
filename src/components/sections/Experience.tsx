import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cvSkills, experiences } from "@/services/experienceData";

const Experience = () => {
  const stages = experiences.filter((exp) => exp.type === "Stage").length;
  const collaborations = experiences.length - stages;

  return (
    <section id="experience" className="section-shell bg-muted/35">
      <div className="container mx-auto px-6">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-end">
          <div className="space-y-4">
            <span className="section-kicker">Parcours</span>
            <h2 className="section-title">
              Parcours <span className="text-gradient">CV</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground md:ml-auto md:text-right">
            Mes expériences terrain et collaborations, organisées pour lire
            rapidement mon rôle, le contexte et les technologies utilisées.
          </p>
        </div>

        <div className="mx-auto max-w-6xl space-y-6">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <Card className="card-modern">
              <CardContent className="p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-secondary" />
                  <p className="font-mono text-xs font-bold uppercase text-muted-foreground">
                    Stack utilisée
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cvSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-secondary/15 bg-secondary/10 px-3 py-1.5 text-xs font-bold text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3 md:w-72">
              <div className="rounded-3xl border border-border bg-card/90 p-4 text-center shadow-card">
                <p className="text-3xl font-black text-foreground">{stages}</p>
                <p className="mt-1 text-xs font-bold uppercase text-muted-foreground">
                  Stages
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-card/90 p-4 text-center shadow-card">
                <p className="text-3xl font-black text-foreground">
                  {collaborations}
                </p>
                <p className="mt-1 text-xs font-bold uppercase text-muted-foreground">
                  Collaborations
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {experiences.map((exp, index) => {
              const isStage = exp.type === "Stage";

              return (
                <article
                  key={exp.id}
                  className="card-modern group relative animate-fade-in overflow-hidden p-5 md:p-6"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div
                    className={`absolute inset-y-0 left-0 w-1 ${
                      isStage ? "bg-secondary" : "bg-primary"
                    }`}
                  />

                  <div className="flex h-full flex-col gap-5 pl-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                            isStage
                              ? "border-secondary/20 bg-secondary/10 text-secondary"
                              : "border-primary/15 bg-primary/5 text-foreground"
                          }`}
                        >
                          {exp.type}
                        </span>
                        <div>
                          <h3 className="text-2xl font-black text-foreground transition-colors group-hover:text-secondary">
                            {exp.company}
                          </h3>
                          <p className="mt-1 text-base font-semibold text-muted-foreground">
                            {exp.position}
                          </p>
                        </div>
                      </div>

                      <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-button sm:flex">
                        <Briefcase className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="grid gap-2 rounded-2xl border border-border bg-background/60 p-4 text-sm text-muted-foreground sm:grid-cols-2">
                      <div className="inline-flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-secondary" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="inline-flex items-center gap-2 sm:justify-end">
                        <MapPin className="h-4 w-4 text-secondary" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-secondary/15 bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-border/70 pt-4">
                        <Link
                          to={`/experience/${exp.id}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-foreground"
                        >
                          Voir le détail
                          <ArrowRight size={16} />
                        </Link>

                        {exp.website && (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                          >
                            Site
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
