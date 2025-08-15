
import { ArrowDown, Download, Mail } from "lucide-react";
import { ButtonVariants } from "@/components/ui/button-variants";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-bg opacity-30" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenu principal à gauche */}
            <div className="space-y-6 animate-fade-in text-left">
              <p className="text-xl text-primary font-medium">Bonjour, je suis</p>
              <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
                MAKOSSO Daniel
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-muted-foreground">
                Étudiant en Génie Logiciel
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Passionné par le développement web et la création de solutions numériques innovantes. 
                Curieux, motivé et orienté vers les résultats.
              </p>
              <p className="text-lg text-muted-foreground">
                📍 Libreville, Gabon
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <ButtonVariants variant="hero" size="lg">
                  <Mail className="mr-2" size={20} />
                  Me contacter
                </ButtonVariants>
                <ButtonVariants variant="glass" size="lg">
                  <Download className="mr-2" size={20} />
                  Télécharger CV
                </ButtonVariants>
              </div>
            </div>

            {/* Photo de profil à droite */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glass p-2 animate-glow">
                  <img
                    src="../../../public/5.jpg"
                    alt="Mr MAKOSSO - Profil"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {/* Cercles décoratifs */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>

          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="text-muted-foreground" size={24} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
