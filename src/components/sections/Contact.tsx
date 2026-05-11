import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Facebook,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { staticPersonalInfo } from "@/services/staticData";
import apiService from "@/services/api";

interface ContactFormData {
  nom: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    nom: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nom || !formData.email || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Utiliser le service API centralisé
      await apiService.sendContact(formData);

      toast({
        title: "Message envoyé !",
        description:
          "Votre message a été envoyé avec succès. Je vous répondrai bientôt.",
      });

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        email: "",
        message: "",
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Erreur lors de l'envoi du message";

      toast({
        title: "Erreur",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section-shell relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/25 to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-end">
          <div className="space-y-4">
          <span className="section-kicker">Contact</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-normal">
            Travaillons <span className="text-gradient">Ensemble</span>
          </h2>
          </div>
          <p className="text-base leading-7 text-muted-foreground md:text-right">
            Un projet en tête ? Une question ? Je suis à votre écoute
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <Card className="card-modern">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-muted border border-border">
                      <Mail className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href={`mailto:${staticPersonalInfo.email_contact}`}
                        className="text-sm text-muted-foreground hover:text-secondary transition-colors break-all"
                      >
                        {staticPersonalInfo.email_contact}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/10 border border-secondary/20">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Téléphone</h3>
                      <a
                        href="tel:+24174604327"
                        className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                      >
                        +241 74604327
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/10 border border-secondary/20">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Localisation</h3>
                      <p className="text-sm text-muted-foreground">
                        {staticPersonalInfo.localisation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="pt-4">
              <h3 className="font-semibold mb-4">Retrouvez-moi sur</h3>
              <div className="flex gap-3">
                {staticPersonalInfo.github_url && (
                  <a
                    href={staticPersonalInfo.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border bg-card p-3 shadow-card transition-colors hover:border-foreground/30 hover:bg-muted"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {staticPersonalInfo.linkedin_url && (
                  <a
                    href={staticPersonalInfo.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border bg-card p-3 shadow-card transition-colors hover:border-foreground/30 hover:bg-muted"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {staticPersonalInfo.facebook_url && (
                  <a
                    href={staticPersonalInfo.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border bg-card p-3 shadow-card transition-colors hover:border-foreground/30 hover:bg-muted"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card className="card-modern">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="nom"
                      className="block text-sm font-medium mb-2"
                    >
                      Nom complet
                    </label>
                    <Input
                      id="nom"
                      type="text"
                      name="nom"
                      placeholder="Votre nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="h-12 rounded-none border-border bg-background focus:border-secondary"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 rounded-none border-border bg-background focus:border-secondary"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre projet ou votre question..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="resize-none rounded-none border-border bg-background focus:border-secondary"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="btn-gradient h-12 w-full text-base font-semibold group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Envoyer le message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
