
import { ArrowUp } from "lucide-react";
import { ButtonVariants } from "@/components/ui/button-variants";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              © 2026, réalisé par Daniel MAKOSSO avec React & TypeScript
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href="#home"
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              Accueil
            </a>
            <a
              href="#projects"
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              Projets
            </a>
            <a
              href="#skills"
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              Compétences
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </a>
          </div>

          <ButtonVariants
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="rounded-none border border-border bg-background p-2 shadow-card"
            aria-label="Retour en haut"
          >
            <ArrowUp size={20} />
          </ButtonVariants>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Interface responsive, rapide et pensée pour présenter clairement les projets.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
