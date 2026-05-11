import {
  Code,
  Database,
  Palette,
  Smartphone,
  Globe,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSkills } from "@/hooks/usePortfolio";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Database,
  Palette,
  Smartphone,
  Globe,
  Settings,
};

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

  // Transform data for display
  const skillCategories = Object.entries(skillsData).map(
    ([categoryName, skills]) => {
      // Try to get appropriate icon based on category name
      let IconComponent = Code; // default
      if (categoryName.toLowerCase().includes("frontend")) IconComponent = Code;
      else if (categoryName.toLowerCase().includes("backend"))
        IconComponent = Database;
      else if (categoryName.toLowerCase().includes("design"))
        IconComponent = Palette;
      else if (categoryName.toLowerCase().includes("mobile"))
        IconComponent = Smartphone;
      else if (
        categoryName.toLowerCase().includes("cloud") ||
        categoryName.toLowerCase().includes("devops")
      )
        IconComponent = Globe;
      else if (
        categoryName.toLowerCase().includes("outils") ||
        categoryName.toLowerCase().includes("tools")
      )
        IconComponent = Settings;

      return {
        name: categoryName,
        icon: IconComponent,
        color: "text-primary", // Use theme color
        skills: skills.map((skill) => ({
          name: skill.nom,
          level: skill.niveau,
        })),
      };
    },
  );

  return (
    <section id="skills" className="section-shell relative bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-end">
          <div className="space-y-4">
          <span className="section-kicker">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-normal">
            Compétences{" "}
            <span className="text-gradient">Techniques</span>
          </h2>
          </div>
          <p className="text-base leading-7 text-muted-foreground md:text-right">
            Technologies et outils que je maîtrise pour créer des solutions
            performantes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={category.name}
              className="card-modern group animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="border border-border bg-muted p-2.5 transition-colors group-hover:bg-background">
                    <category.icon className="text-secondary w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs font-semibold text-secondary">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden bg-muted shadow-inner">
                        <div
                          className="h-full bg-secondary transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.05}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <div className="card-modern relative overflow-hidden p-8 md:p-12">
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 text-sm font-bold text-secondary mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                En constante évolution
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Apprentissage{" "}
                <span className="text-gradient">Continu</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Passionné par l'innovation technologique, je reste à l'affût des
                dernières tendances et meilleures pratiques pour offrir des
                solutions modernes et performantes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
