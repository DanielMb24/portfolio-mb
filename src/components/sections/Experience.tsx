import { Briefcase, ExternalLink, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    id: 1,
    company: "CompanyViene",
    position: "Développeur Full Stack",
    period: "2024 - Présent",
    website: "https://companyviene.com",
    description:
      "Développement d'applications web modernes et solutions digitales pour les clients.",
    technologies: ["React", "Node.js", "TypeScript", "MongoDB"],
    current: true,
  },
  {
    id: 2,
    company: "DevGroup Africa",
    position: "Développeur Web",
    period: "2023 - Présent",
    website: "https://devgroup.ga",
    description:
      "Participation au développement de projets web innovants et accompagnement technique.",
    technologies: ["JavaScript", "PHP", "MySQL", "TailwindCSS"],
    current: true,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-shell bg-muted/45">
      <div className="container mx-auto px-6">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-end">
          <div className="space-y-4">
          <span className="section-kicker">Parcours</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-normal">
            Expérience{" "}
            <span className="text-gradient">Professionnelle</span>
          </h2>
          </div>
          <p className="text-base leading-7 text-muted-foreground md:text-right">
            Mon parcours professionnel et les entreprises avec lesquelles je
            collabore
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative space-y-6 before:absolute before:left-6 before:top-4 before:hidden before:h-[calc(100%-2rem)] before:w-px before:bg-border md:before:block">
            {experiences.map((exp, index) => (
              <Card
                key={exp.id}
                className="card-modern group animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary flex items-center justify-center text-primary-foreground shadow-button">
                        <Briefcase size={24} />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                          <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                            {exp.company}
                          </h3>
                          <p className="text-lg text-muted-foreground mt-1">
                            {exp.position}
                          </p>
                        </div>

                        {exp.current && (
                          <span className="inline-flex items-center gap-2 border border-secondary/25 bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                            En cours
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={16} />
                        <span className="text-sm">{exp.period}</span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border bg-background/70 px-2.5 py-1 text-xs font-semibold text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-foreground"
                      >
                        Visiter le site
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
