import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#home", label: "Accueil" },
    { href: "#experience", label: "Expérience" },
    { href: "#projects", label: "Projets" },
    { href: "#skills", label: "Compétences" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/60 bg-background/80 backdrop-blur-2xl dark:border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("#home")}
              className="group flex items-center gap-3"
              aria-label="Retour à l'accueil"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-sm font-black text-primary-foreground shadow-button">
                DM
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-bold leading-none text-foreground">
                  Daniel Makosso
                </span>
                <span className="block text-xs font-medium text-muted-foreground">
                  Full Stack Developer
                </span>
              </span>
            </button>
          </div>

          <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-card/80 p-1.5 shadow-glass backdrop-blur md:flex dark:border-white/10">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => scrollToSection("#contact")}
              className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm font-bold text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground"
            >
              Discuter
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="rounded-xl"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="pb-4 md:hidden">
            <div className="space-y-1 rounded-3xl border border-white/70 bg-card/95 p-2 shadow-card backdrop-blur dark:border-white/10">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full rounded-2xl px-3 py-3 text-left text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
