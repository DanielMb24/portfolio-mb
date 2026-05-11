
import {
  ArrowUp,
  Download,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { ButtonVariants } from "@/components/ui/button-variants";
import { staticPersonalInfo } from "@/services/staticData";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { href: "#home", label: "Accueil" },
    { href: "#experience", label: "Parcours" },
    { href: "#projects", label: "Projets" },
    { href: "#skills", label: "Compétences" },
    { href: "#contact", label: "Contact" },
  ];

  const stack = ["React", "TypeScript", "Node.js", "TailwindCSS", "MongoDB"];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card text-card-foreground">
      <div className="container mx-auto px-6">
        <div className="relative grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-6">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-3"
              aria-label="Retour en haut"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-sm font-black text-primary-foreground shadow-button">
                DM
              </span>
              <span className="text-left">
                <span className="block text-lg font-black">
                  Daniel Makosso
                </span>
                <span className="block text-sm text-muted-foreground">
                  Développeur web & ingénierie informatique
                </span>
              </span>
            </button>

            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              Portfolio personnel conçu pour présenter mes projets, mon parcours
              et mes compétences dans le développement d'applications web
              modernes.
            </p>

            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-bold text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase text-foreground">
              Navigation
            </h3>
            <div className="grid gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/CvDanielMakosso.pdf"
                download
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-bold text-foreground transition-colors hover:border-secondary/35 hover:bg-muted"
              >
                <Download className="h-4 w-4" />
                Télécharger CV
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase text-foreground">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a
                href={`mailto:${staticPersonalInfo.email_contact}`}
                className="flex items-center gap-3 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-secondary" />
                <span className="break-all">{staticPersonalInfo.email_contact}</span>
              </a>
              <a
                href="tel:+24174604327"
                className="flex items-center gap-3 transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4 text-secondary" />
                +241 74604327
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-secondary" />
                {staticPersonalInfo.localisation}
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              {staticPersonalInfo.github_url && (
                <a
                  href={staticPersonalInfo.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-border bg-background/70 p-3 transition-colors hover:border-secondary/35 hover:bg-muted"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {staticPersonalInfo.linkedin_url && (
                <a
                  href={staticPersonalInfo.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-border bg-background/70 p-3 transition-colors hover:border-secondary/35 hover:bg-muted"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {staticPersonalInfo.facebook_url && (
                <a
                  href={staticPersonalInfo.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-border bg-background/70 p-3 transition-colors hover:border-secondary/35 hover:bg-muted"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-muted-foreground">
            © 2026 Daniel Makosso. Réalisé avec React, TypeScript et TailwindCSS.
          </p>
          <ButtonVariants
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="rounded-full border border-border bg-background/70 p-2 text-foreground hover:bg-muted"
            aria-label="Retour en haut"
          >
            <ArrowUp size={18} />
          </ButtonVariants>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
