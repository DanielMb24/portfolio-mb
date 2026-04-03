import { ArrowDown, Download, Mail, Github, Linkedin } from "lucide-react";
import { usePersonalInfo } from "@/hooks/usePortfolio";

const Hero = () => {
  const { data: personalInfo } = usePersonalInfo();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background épuré */}
      <div className="absolute inset-0 bg-background" />

      {/* Grille subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#15396b08_1px,transparent_1px),linear-gradient(to_bottom,#15396b08_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      {/* Accent minimaliste */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Titre principal */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                  Développeur Full Stack
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                {personalInfo?.nom_complet || "MAKOSSO Daniel"}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {personalInfo?.description_courte ||
                  "Étudiant en Génie Logiciel passionné par la création de solutions web modernes et performantes"}
              </p>

              {/* Localisation */}
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm">
                  {personalInfo?.localisation || "Libreville, Gabon"}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                <Mail size={20} />
                Me contacter
              </button>

              <a
                href="/CvDanielMakosso.pdf"
                download
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border rounded-lg font-medium hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
              >
                <Download size={20} />
                Télécharger CV
              </a>
            </div>

            {/* Liens sociaux */}
            <div className="flex items-center justify-center gap-4 pt-8">
              {personalInfo?.github_url && (
                <a
                  href={personalInfo.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {personalInfo?.linkedin_url && (
                <a
                  href={personalInfo.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
            </div>

            {/* Photo de profil centrée */}
            <div className="pt-12 flex justify-center">
              <div className="relative group">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {/* Bordure simple */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 group-hover:border-primary/40 transition-all" />

                  {/* Image */}
                  <div className="absolute inset-3 rounded-xl overflow-hidden">
                    <img
                      src={personalInfo?.photo_profil || "/5.jpg"}
                      alt={`${personalInfo?.nom_complet || "MAKOSSO Daniel"} - Photo de profil`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-xs uppercase tracking-wider">Défiler</span>
              <ArrowDown size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
