
import { Heart, ArrowUp } from "lucide-react";
import { ButtonVariants } from "@/components/ui/button-variants";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-card/50 border-t border-border/50 py-12 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              © 2024 John Doe. Made with{" "}
              <Heart className="inline w-4 h-4 text-red-500 fill-current" />{" "}
              using React & TypeScript
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center space-x-6">
            <a
              href="#home"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Accueil
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Projets
            </a>
            <a
              href="#skills"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Compétences
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Back to Top */}
          <ButtonVariants
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="p-2"
          >
            <ArrowUp size={20} />
          </ButtonVariants>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Développé avec les dernières technologies web • 
            Responsive Design • Performance Optimisée
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
