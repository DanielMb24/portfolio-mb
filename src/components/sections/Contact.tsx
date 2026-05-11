import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
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

const formatSocialInfo = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname.replace(/^\/|\/$/g, "") || parsedUrl.hostname;
  } catch {
    return url;
  }
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    nom: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const socialLinks = [
    { label: "GitHub", value: staticPersonalInfo.github_url, icon: Github },
    {
      label: "LinkedIn",
      value: staticPersonalInfo.linkedin_url,
      icon: Linkedin,
    },
    {
      label: "Facebook",
      value: staticPersonalInfo.facebook_url,
      icon: Facebook,
    },
  ].filter(
    (item): item is { label: string; value: string; icon: typeof Github } =>
      Boolean(item.value),
  );

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
            <h2 className="section-title">
              Travaillons <span className="text-gradient">Ensemble</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground md:ml-auto md:text-right">
            Un projet en tête ? Une question ? Je suis à votre écoute
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="card-modern overflow-hidden">
              <div className="border-b border-border/70 bg-primary p-6 text-primary-foreground">
                <p className="font-mono text-xs font-bold uppercase text-primary-foreground/70">
                  Disponible
                </p>
                <h3 className="mt-2 text-2xl font-black">
                  Parlons de votre projet web
                </h3>
                <p className="mt-3 text-sm leading-6 text-primary-foreground/75">
                  Une interface, une application ou une amélioration technique :
                  envoyez-moi les grandes lignes.
                </p>
              </div>

              <div className="space-y-1 p-3">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: staticPersonalInfo.email_contact,
                    href: `mailto:${staticPersonalInfo.email_contact}`,
                  },
                  {
                    icon: Mail,
                    label: "Email 2",
                    value: "daniel.makosso@devgroup.ga",
                    href: `mailto:${"daniel.makosso@devgroup.ga"}`,
                  },
                  {
                    icon: Phone,
                    label: "Téléphone",
                    value: "+241 74604327 / 60189503",
                    href: "tel:+24174604327",
                  },
                  {
                    icon: MapPin,
                    label: "Localisation",
                    value: staticPersonalInfo.localisation,
                  },
                ].map((item) => {
                  const content = (
                    <>
                      <span className="rounded-2xl border border-secondary/15 bg-secondary/10 p-3">
                        <item.icon className="h-5 w-5 text-secondary" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">
                          {item.label}
                        </span>
                        <span className="block truncate text-sm text-muted-foreground">
                          {item.value}
                        </span>
                      </span>
                      {item.href && <ArrowUpRight className="h-4 w-4" />}
                    </>
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-muted"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-2xl p-3"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-semibold mb-4">Retrouvez-moi sur</h3>
              <div className="grid gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card transition-all hover:-translate-y-0.5 hover:border-secondary/35 hover:bg-muted"
                    aria-label={social.label}
                  >
                    <span className="rounded-xl border border-secondary/15 bg-secondary/10 p-2 text-secondary">
                      <social.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold">
                        {social.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {formatSocialInfo(social.value)}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
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
                      className="h-12 rounded-2xl border-border bg-background focus:border-secondary"
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
                      className="h-12 rounded-2xl border-border bg-background focus:border-secondary"
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
                      className="resize-none rounded-2xl border-border bg-background focus:border-secondary"
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
