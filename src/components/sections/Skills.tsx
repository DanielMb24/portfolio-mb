
import { Code, Database, Palette, Smartphone, Globe, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSkills } from "@/hooks/usePortfolio";

const iconMap: Record<string, any> = {
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
    console.error('Erreur lors du chargement des compétences:', error);
  }

  // Transform data for display
  const skillCategories = Object.entries(skillsData).map(([categoryName, skills]) => {
    // Try to get appropriate icon based on category name
    let IconComponent = Code; // default
    if (categoryName.toLowerCase().includes('frontend')) IconComponent = Code;
    else if (categoryName.toLowerCase().includes('backend')) IconComponent = Database;
    else if (categoryName.toLowerCase().includes('design')) IconComponent = Palette;
    else if (categoryName.toLowerCase().includes('mobile')) IconComponent = Smartphone;
    else if (categoryName.toLowerCase().includes('cloud') || categoryName.toLowerCase().includes('devops')) IconComponent = Globe;
    else if (categoryName.toLowerCase().includes('outils') || categoryName.toLowerCase().includes('tools')) IconComponent = Settings;

    return {
      name: categoryName,
      icon: IconComponent,
      color: "text-primary", // Use theme color
      skills: skills.map(skill => ({
        name: skill.nom,
        level: skill.niveau
      }))
    };
  });

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Mes Compétences
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un aperçu de mes expertises techniques et créatives
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={category.name} 
              className="glass hover:shadow-card transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-muted/20 mr-4`}>
                    <category.icon className={`${category.color} w-6 h-6`} />
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                        style={{
                          animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 gradient-text-secondary">
              Toujours en apprentissage
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              La technologie évolue rapidement, et je m'assure de rester à jour avec les dernières 
              tendances et meilleures pratiques. Je suis constamment en train d'apprendre de 
              nouveaux outils et frameworks pour offrir les meilleures solutions à mes clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
