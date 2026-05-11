import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSkills } from "@/hooks/usePortfolio";
import { getAverageLevel, toSkillCategories } from "@/services/skillDisplay";

const Skills = () => {
  const { data: skillsData = {}, isLoading, error } = useSkills();

  if (isLoading) {
    return (
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Chargement des compétences...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des compétences:", error);
  }

  const skillCategories = toSkillCategories(skillsData);
  const totalSkills = skillCategories.reduce(
    (total, category) => total + category.skills.length,
    0,
  );
  const previewSkills = skillCategories.flatMap((category) =>
    category.skills.slice(0, 2).map((skill) => skill.name),
  );

  return (
    <section id="skills" className="section-shell relative bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-end">
          <div className="space-y-4">
            <span className="section-kicker">Expertise</span>
            <h2 className="section-title">
              Compétences <span className="text-gradient">Techniques</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground md:ml-auto md:text-right">
            Un aperçu rapide de ma stack. La page dédiée présente chaque
            compétence avec son niveau détaillé.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="card-modern overflow-hidden">
            <CardContent className="space-y-6 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-bold uppercase text-secondary">
                    Vue générale
                  </p>
                  <h3 className="mt-2 text-3xl font-black">
                    {totalSkills} compétences recensées
                  </h3>
                </div>
                <div className="rounded-2xl border border-secondary/15 bg-secondary/10 p-3">
                  <Sparkles className="h-5 w-5 text-secondary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {skillCategories.slice(0, 4).map((category) => (
                  <div
                    key={category.name}
                    className="rounded-2xl border border-border bg-background/70 p-4"
                  >
                    <category.icon className="mb-3 h-5 w-5 text-secondary" />
                    <p className="text-sm font-bold">{category.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {category.skills.length} éléments · moyenne{" "}
                      {getAverageLevel(category.skills)}%
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/skills"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary"
              >
                Voir toutes les compétences
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <div className="soft-panel p-6 md:p-8">
            <p className="mb-5 font-mono text-xs font-bold uppercase text-muted-foreground">
              Stack principale
            </p>
            <div className="flex flex-wrap gap-2">
              {previewSkills.slice(0, 12).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-secondary/15 bg-secondary/10 px-3 py-1.5 text-xs font-bold text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-2xl font-black">Apprentissage continu</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Je consolide mes bases frontend, backend, bases de données et
                outils de développement en travaillant sur des projets concrets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
