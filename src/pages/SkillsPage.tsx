import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Layers3 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useSkills } from "@/hooks/usePortfolio";
import { getAverageLevel, toSkillCategories } from "@/services/skillDisplay";

const SkillsPage = () => {
  const { data: skillsData = {}, isLoading, error } = useSkills();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-28 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">
            Chargement des compétences...
          </p>
        </main>
        <Footer />
      </div>
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
  const allSkills = skillCategories.flatMap((category) => category.skills);
  const globalAverage = getAverageLevel(allSkills);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-28">
        <div className="mb-10">
          <Link
            to="/#skills"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>

          <div className="grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-end">
            <div className="space-y-4">
              <span className="section-kicker">Expertise détaillée</span>
              <h1 className="section-title">
                Toutes mes <span className="text-gradient">Compétences</span>
              </h1>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground md:ml-auto md:text-right">
              Chaque compétence est affichée avec son pourcentage pour donner
              une lecture claire de mon niveau actuel.
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="card-modern">
            <CardContent className="p-6">
              <Layers3 className="mb-4 h-5 w-5 text-secondary" />
              <p className="text-3xl font-black">{skillCategories.length}</p>
              <p className="mt-1 text-sm text-muted-foreground">Catégories</p>
            </CardContent>
          </Card>
          <Card className="card-modern">
            <CardContent className="p-6">
              <BarChart3 className="mb-4 h-5 w-5 text-secondary" />
              <p className="text-3xl font-black">{totalSkills}</p>
              <p className="mt-1 text-sm text-muted-foreground">Compétences</p>
            </CardContent>
          </Card>
          <Card className="card-modern">
            <CardContent className="p-6">
              <BarChart3 className="mb-4 h-5 w-5 text-secondary" />
              <p className="text-3xl font-black">{globalAverage}%</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Moyenne globale
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={category.name}
              className="card-modern animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.06}s` }}
            >
              <CardContent className="space-y-6 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-secondary/15 bg-secondary/10 p-3">
                      <category.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black">{category.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {category.skills.length} compétences · moyenne{" "}
                        {getAverageLevel(category.skills)}%
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 font-mono text-xs font-bold text-muted-foreground">
                    {category.skills.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-2xl border border-border bg-background/65 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <span className="text-sm font-bold text-foreground">
                          {skill.name}
                        </span>
                        <span className="font-mono text-sm font-black text-secondary">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-secondary"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SkillsPage;
