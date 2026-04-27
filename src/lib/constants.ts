export const LANG = "fr-CH";
export const BRAND_NAME = "Atelier";
export const BRAND_TAGLINE = "Déménagement d'exception";
export const LOGO_PATH = "/logo.svg";
export const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Pourquoi nous", href: "#pourquoi" },
  { label: "Méthode", href: "#process" },
  { label: "Avis", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
] as const;
export const CTA_LABEL = "Devis";
export const CTA_HREF = "#cta";
export const FRAMES_PATH = "/frames";
export const FRAME_COUNT = 240;
export const FRAME_EXT = "jpg" as const;
export const FPS = 30;
export const HERO_HEADLINE = "Bouger, sans bruit.";
export const HERO_SUB =
  "Du studio au penthouse. L'art du déménagement, signé Atelier.";
export const HERO_CTA_PRIMARY = "Devis gratuit";
export const HERO_CTA_SECONDARY = "Voir le film";
export const PARTNERS = [
  "Christie's",
  "Sotheby's",
  "Piaget",
  "Bulgari",
  "Nest",
  "Notion",
] as const;
export const SERVICES_HEADLINE = "Tout ce qui bouge. Sous un seul toit.";
export const SERVICES_SUB =
  "Un dispositif précis, pensé pour les intérieurs délicats, les agendas serrés et les déménagements qui ne supportent ni friction ni improvisation.";
export const SERVICES = [
  {
    icon: "Truck",
    title: "Déménagement",
    body: "Une orchestration calme, pièce par pièce, avec une équipe senior qui sait lire un lieu avant même de toucher un meuble.",
  },
  {
    icon: "Package",
    title: "Emballage",
    body: "Matériaux premium, inventaire clair, protections sur mesure pour les pièces fragiles, techniques ou émotionnelles.",
  },
  {
    icon: "Warehouse",
    title: "Garde-meubles",
    body: "Stockage discret, tempéré et suivi, pour les transitions courtes, les chantiers longs et les rythmes de vie non linéaires.",
  },
  {
    icon: "Globe",
    title: "International",
    body: "Coordination douanière, calendrier multi-pays, partenaires terrain éprouvés. Une seule équipe pilote, d'un fuseau horaire à l'autre.",
  },
  {
    icon: "Building2",
    title: "Bureaux",
    body: "Transferts d'équipes et d'espaces sans rupture de cadence, avec une logistique qui respecte vos outils autant que vos délais.",
  },
  {
    icon: "Sparkles",
    title: "Sur-mesure",
    body: "Accrochage, remise en scène, finitions, conciergerie. Nous quittons la page transport pour aller jusqu'au sentiment d'arrivée.",
  },
] as const;
export const REASONS = [
  {
    icon: "ShieldCheck",
    title: "Assuré intégralement",
    body: "Chaque étape est couverte, documentée et tracée pour protéger les pièces les plus sensibles sans rallonger la machine.",
  },
  {
    icon: "Clock3",
    title: "Ponctuels",
    body: "Fenêtres horaires réalistes, équipes cadencées et communication nette. Votre journée reste lisible, même quand elle change de décor.",
  },
  {
    icon: "Leaf",
    title: "Éco-conscients",
    body: "Mutualisation des trajets, matériaux recyclables et arbitrages intelligents pour réduire l'empreinte sans réduire le niveau.",
  },
  {
    icon: "Award",
    title: "Certifiés Swiss Moving",
    body: "Méthodes éprouvées, contrôle qualité exigeant et culture de service qui tient aussi bien à l'œil qu'à la main.",
  },
] as const;
export const PROCESS_STEPS = [
  {
    n: "1",
    title: "Visite",
    body: "Un échange précis pour lire le volume, les accès, les fragilités et le rythme de votre projet.",
  },
  {
    n: "2",
    title: "Plan",
    body: "Nous structurons le jour J, les ressources, les emballages, les créneaux et les points de contrôle.",
  },
  {
    n: "3",
    title: "Mouvement",
    body: "L'équipe exécute avec une cadence calme, une présence discrète et une attention constante aux détails.",
  },
  {
    n: "4",
    title: "Installation",
    body: "Déballage, placements, derniers ajustements. Le lieu ne se contente pas d'être vidé puis rempli, il retrouve sa justesse.",
  },
] as const;
export const STATS = [
  { value: "2500+", label: "Déménagements" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "24h", label: "Délai de devis" },
  { value: "15 ans", label: "Métier" },
] as const;
export const STATS_BG_VIDEO = "[TODO: STATS_BG_VIDEO]";
export const TESTIMONIALS = [
  {
    quote:
      "Ils ont déplacé notre appartement comme on monte une exposition. Rien de pressé, rien d'approximatif, tout semblait déjà pensé.",
    name: "Camille R.",
    role: "Résidentiel privé",
  },
  {
    quote:
      "Le planning a tenu, l'équipe a été invisible au meilleur sens du terme, et nos collaborateurs ont repris leur semaine sans perte de rythme.",
    name: "Nicolas F.",
    role: "Direction opérations",
  },
  {
    quote:
      "Nous avions des pièces sensibles et une fenêtre logistique étroite. Atelier a absorbé la complexité sans la faire déborder sur nous.",
    name: "Sarah M.",
    role: "Collection privée",
  },
  {
    quote:
      "Le niveau de finition à l'arrivée a été le vrai luxe. Les volumes étaient posés, les détails repris, l'espace déjà habitable.",
    name: "Hugo T.",
    role: "Penthouse",
  },
  {
    quote:
      "Chaque interlocuteur savait exactement où nous en étions. Une sensation rare: on n'avait rien à poursuivre.",
    name: "Anais L.",
    role: "Relocation internationale",
  },
  {
    quote:
      "Ils ont compris la valeur émotionnelle des objets autant que leur valeur matérielle. C'est ce qui fait la différence.",
    name: "Julien B.",
    role: "Maison familiale",
  },
] as const;
export const FAQ_ITEMS = [
  {
    q: "Intervenez-vous uniquement en Suisse romande ?",
    a: "Nous opérons en Suisse, en Europe et à l'international via un réseau piloté depuis notre équipe centrale. Le niveau de service reste unique, quel que soit le trajet.",
  },
  {
    q: "Pouvez-vous gérer l'emballage complet ?",
    a: "Oui. Nous pouvons prendre en charge l'emballage, l'inventaire, la protection des œuvres, l'étiquetage et le déballage final selon le niveau d'accompagnement souhaité.",
  },
  {
    q: "Combien de temps pour recevoir un devis ?",
    a: "Dans la majorité des cas, vous recevez une proposition sous 24 heures après la visite ou l'échange qualifié. Les projets très complexes peuvent demander un cadrage complémentaire.",
  },
  {
    q: "Assurez-vous les objets de valeur ?",
    a: "Chaque mission est cadrée avec couverture adaptée, inventaire et consignes de manipulation. Nous détaillons précisément les niveaux de protection lors de la préparation.",
  },
  {
    q: "Pouvez-vous stocker entre deux adresses ?",
    a: "Oui. Nous proposons une solution de garde-meubles sécurisée pour les périodes de transition, qu'il s'agisse de quelques jours ou de plusieurs mois.",
  },
  {
    q: "Travaillez-vous aussi pour les entreprises ?",
    a: "Oui. Nous accompagnons les transferts de bureaux, les relocalisations d'équipes et les opérations hors horaires sensibles pour limiter toute rupture d'activité.",
  },
] as const;
export const CTA_BG_VIDEO = "[TODO: CTA_BG_VIDEO]";
export const CTA_HEADLINE = "Prêts à partir ?";
export const CTA_SUB = "Un entretien. Un plan. Un déménagement.";
export const FOOTER_LINKS = [
  { label: "Mentions", href: "#faq" },
  { label: "Confidentialité", href: "#faq" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#cta" },
] as const;
export const COPYRIGHT = "© 2026 Atelier. Tous droits réservés.";
export const POURQUOI_HEADLINE = "La précision rassure. Le calme convainc.";
export const POURQUOI_SUB =
  "Des garanties concrètes, une exécution lisible, et une équipe qui sait que le vrai luxe est souvent une absence de friction.";
export const PROCESS_HEADLINE = "Une méthode simple. Une exécution millimétrée.";
export const PROCESS_SUB =
  "Quatre temps, un seul fil: préserver votre énergie pendant que nous gérons le déplacement.";
export const TESTIMONIALS_HEADLINE = "Ils parlent mieux que nous.";
export const TESTIMONIALS_SUB =
  "Quelques voix parmi les clients qui voulaient surtout que tout se passe sans bruit.";
export const FAQ_SUB =
  "Les réponses utiles avant de réserver une visite ou de faire chiffrer un projet plus précis.";
export const CTA_VIDEO_TODO = "[TODO: CTA_BG_VIDEO]";
export const STATS_VIDEO_TODO = "[TODO: STATS_BG_VIDEO]";
export const HERO_VIDEO_SUMMARY =
  "Une séquence cinématique montre un intérieur haut de gamme traverser un déménagement fluide, du premier geste à l'installation finale.";
export const TRUSTED_BY_LABEL = "Ils nous font confiance";
export const NEW_LABEL = "Nouveau";
