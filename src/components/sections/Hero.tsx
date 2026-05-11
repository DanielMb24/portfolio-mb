import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { usePersonalInfo } from "@/hooks/usePortfolio";

const Hero = () => {
  const { data: personalInfo } = usePersonalInfo();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-hero-gradient pt-24"
    >
      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.18fr_0.82fr]">
            <div className="animate-fade-in space-y-8">
              <span className="section-kicker">
                Software developer / Portfolio
              </span>

              <div className="space-y-6">
                <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-normal md:text-6xl lg:text-7xl">
                  {personalInfo?.nom_complet || "MAKOSSO Daniel"}
                </h1>

                <h2 className="max-w-3xl border-l border-secondary/50 pl-5 text-xl font-semibold leading-8 text-foreground md:text-2xl">
                  {personalInfo?.profession || "Étudiant en Génie Logiciel"}
                </h2>

                <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  {personalInfo?.description_courte ||
                    "Passionné par le développement web et la création de solutions numériques innovantes"}
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-secondary" />
                    {personalInfo?.localisation || "Libreville, Gabon"}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    Disponible pour missions web
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={scrollToContact}
                  className="btn-gradient inline-flex items-center gap-2"
                >
                  <Mail size={20} />
                  Me contacter
                  <ArrowUpRight size={18} />
                </button>

                <a
                  href="/CvDanielMakosso.pdf"
                  download
                  className="inline-flex items-center gap-2 border border-border bg-card px-8 py-4 font-semibold shadow-card transition-colors hover:border-foreground/30 hover:bg-muted"
                >
                  <Download size={20} />
                  Télécharger CV
                </a>
              </div>

              <div className="flex items-center gap-4 pt-4">
                {personalInfo?.github_url && (
                  <a
                    href={personalInfo.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border bg-card p-3 shadow-card transition-colors hover:border-foreground/30 hover:bg-muted"
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
                    className="border border-border bg-card p-3 shadow-card transition-colors hover:border-foreground/30 hover:bg-muted"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[390px]">
                <div className="relative">
                  <div className="absolute -inset-4 border border-border/70 bg-card/45" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-2 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.75)]">
                    <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-muted">
                    <img
                      src={personalInfo?.photo_profil || "/5.jpg"}
                      alt={`${personalInfo?.nom_complet || "MAKOSSO Daniel"} - Photo de profil`}
                        className="h-full w-full object-cover object-[50%_18%] saturate-[0.94] contrast-[1.03]"
                    />
                  </div>
                    <div className="pointer-events-none absolute inset-2 rounded-[1.5rem] ring-1 ring-inset ring-white/30 dark:ring-white/10" />
                  </div>
                  <div className="relative mx-auto mt-5 w-[88%] border border-border bg-background/90 px-4 py-3 text-center shadow-card backdrop-blur">
                    <p className="text-xs font-bold uppercase text-muted-foreground">
                      Full Stack Developer
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      Interfaces web propres et performantes
                    </p>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce md:block">
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
