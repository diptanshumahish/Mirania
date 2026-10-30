/**
 * Projects, from the Mirania "Clients & Projects" portfolio (2026). Every
 * photograph is the site as delivered; `cover` is the frame used on cards.
 * Locations are only stated where the portfolio names them.
 */

export type Project = {
  slug: string;
  /** Client name as shown on cards and in titles. */
  client: string;
  location?: string;
  sector: string;
  summary: string;
  /** Shown on the homepage. */
  featured: boolean;
  cover: string;
  /** Every frame from the site, cover first, with intrinsic sizes for layout. */
  gallery: { src: string; w: number; h: number }[];
};

export const projects: Project[] = [
  {
    slug: "msp-steel",
    client: "MSP Steel",
    location: "Kolkata",
    sector: "Manufacturing",
    summary:
      "A full corporate floor for MSP Steel: open workstations, glass-fronted cabins, meeting rooms and a warm breakout, carried through in timber, terracotta and soft lighting.",
    featured: true,
    cover: "/img/projects/msp-steel/02.jpg",
    gallery: [
      { src: "/img/projects/msp-steel/02.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/01.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/03.jpg", w: 1067, h: 1600 },
      { src: "/img/projects/msp-steel/04.jpg", w: 1600, h: 1141 },
      { src: "/img/projects/msp-steel/05.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/06.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/07.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/08.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/09.jpg", w: 1600, h: 910 },
      { src: "/img/projects/msp-steel/10.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/11.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/12.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/13.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/14.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/15.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/16.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/18.jpg", w: 1600, h: 1130 },
      { src: "/img/projects/msp-steel/19.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/20.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/21.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/22.jpg", w: 1600, h: 1066 },
      { src: "/img/projects/msp-steel/23.jpg", w: 1600, h: 1189 },
      { src: "/img/projects/msp-steel/24.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/25.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/26.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/27.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/28.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/msp-steel/29.jpg", w: 1600, h: 1067 },
    ],
  },
  {
    slug: "accenture",
    client: "Accenture",
    sector: "Consulting & technology",
    summary:
      "Large-format open workspace for Accenture, with benching, focus booths, team tables, high-back privacy settings and lockers specified for a high-density floor.",
    featured: true,
    cover: "/img/projects/accenture/02.jpg",
    gallery: [
      { src: "/img/projects/accenture/02.jpg", w: 1600, h: 902 },
      { src: "/img/projects/accenture/01.jpg", w: 1600, h: 902 },
      { src: "/img/projects/accenture/03.jpg", w: 1280, h: 720 },
      { src: "/img/projects/accenture/04.jpg", w: 1600, h: 902 },
      { src: "/img/projects/accenture/05.jpg", w: 1280, h: 720 },
      { src: "/img/projects/accenture/06.jpg", w: 1600, h: 900 },
      { src: "/img/projects/accenture/07.jpg", w: 1280, h: 720 },
      { src: "/img/projects/accenture/08.jpg", w: 1280, h: 720 },
      { src: "/img/projects/accenture/09.jpg", w: 1600, h: 900 },
      { src: "/img/projects/accenture/10.jpg", w: 1280, h: 720 },
      { src: "/img/projects/accenture/11.jpg", w: 1156, h: 650 },
      { src: "/img/projects/accenture/12.jpg", w: 720, h: 1280 },
      { src: "/img/projects/accenture/13.jpg", w: 720, h: 1280 },
      { src: "/img/projects/accenture/14.jpg", w: 288, h: 512 },
      { src: "/img/projects/accenture/15.jpg", w: 768, h: 432 },
    ],
  },
  {
    slug: "grant-thornton",
    client: "Grant Thornton",
    sector: "Professional services",
    summary:
      "Workstations, boardrooms and a run of informal settings for Grant Thornton, from planted desking islands to lounge corners and a bright café floor.",
    featured: true,
    cover: "/img/projects/grant-thornton/09.jpg",
    gallery: [
      { src: "/img/projects/grant-thornton/09.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/01.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/02.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/03.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/04.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/05.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/06.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/07.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/08.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/10.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/11.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/12.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/13.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/14.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/15.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/16.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/17.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/18.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/19.jpg", w: 960, h: 1280 },
      { src: "/img/projects/grant-thornton/20.jpg", w: 960, h: 1280 },
    ],
  },
  {
    slug: "bhima-jewellers",
    client: "Bhima Jewellers",
    location: "Kerala",
    sector: "Retail",
    summary:
      "Corporate offices for Bhima Jewellers: reception, executive cabins, meeting rooms and lounge seating set against warm timber and statement lighting.",
    featured: true,
    cover: "/img/projects/bhima-jewellers/01.jpg",
    gallery: [
      { src: "/img/projects/bhima-jewellers/01.jpg", w: 1280, h: 852 },
      { src: "/img/projects/bhima-jewellers/02.jpg", w: 1280, h: 852 },
      { src: "/img/projects/bhima-jewellers/03.jpg", w: 1152, h: 767 },
      { src: "/img/projects/bhima-jewellers/04.jpg", w: 852, h: 1280 },
      { src: "/img/projects/bhima-jewellers/05.jpg", w: 1152, h: 767 },
      { src: "/img/projects/bhima-jewellers/06.jpg", w: 1280, h: 852 },
      { src: "/img/projects/bhima-jewellers/07.jpg", w: 1280, h: 852 },
      { src: "/img/projects/bhima-jewellers/08.jpg", w: 1152, h: 767 },
      { src: "/img/projects/bhima-jewellers/09.jpg", w: 1152, h: 767 },
    ],
  },
  {
    slug: "tata-communications",
    client: "Tata Communications",
    location: "Kolkata",
    sector: "Telecommunications",
    summary:
      "Long runs of open-plan workstations, team tables and meeting points across a Tata Communications office floor.",
    featured: true,
    cover: "/img/projects/tata-communications/04.jpg",
    gallery: [
      { src: "/img/projects/tata-communications/04.jpg", w: 1024, h: 682 },
      { src: "/img/projects/tata-communications/01.jpg", w: 1152, h: 544 },
      { src: "/img/projects/tata-communications/02.jpg", w: 1152, h: 544 },
      { src: "/img/projects/tata-communications/03.jpg", w: 1024, h: 768 },
      { src: "/img/projects/tata-communications/05.jpg", w: 1024, h: 682 },
      { src: "/img/projects/tata-communications/06.jpg", w: 1152, h: 544 },
      { src: "/img/projects/tata-communications/07.jpg", w: 1024, h: 768 },
      { src: "/img/projects/tata-communications/08.jpg", w: 1024, h: 682 },
      { src: "/img/projects/tata-communications/09.jpg", w: 1024, h: 682 },
    ],
  },
  {
    slug: "citrin-cooperman",
    client: "Citrin Cooperman",
    location: "Hyderabad",
    sector: "Accounting & advisory",
    summary:
      "Workstations in bold colour-coded screens, conference rooms and focus spaces for Citrin Cooperman's Hyderabad office.",
    featured: true,
    cover: "/img/projects/citrin-cooperman/08.jpg",
    gallery: [
      { src: "/img/projects/citrin-cooperman/08.jpg", w: 1600, h: 696 },
      { src: "/img/projects/citrin-cooperman/01.jpg", w: 1600, h: 855 },
      { src: "/img/projects/citrin-cooperman/02.jpg", w: 966, h: 1002 },
      { src: "/img/projects/citrin-cooperman/03.jpg", w: 1023, h: 1005 },
      { src: "/img/projects/citrin-cooperman/04.jpg", w: 1518, h: 1600 },
      { src: "/img/projects/citrin-cooperman/05.jpg", w: 1600, h: 1489 },
      { src: "/img/projects/citrin-cooperman/06.jpg", w: 1600, h: 1150 },
      { src: "/img/projects/citrin-cooperman/07.jpg", w: 1600, h: 1150 },
      { src: "/img/projects/citrin-cooperman/09.jpg", w: 1600, h: 914 },
      { src: "/img/projects/citrin-cooperman/10.jpg", w: 1600, h: 917 },
      { src: "/img/projects/citrin-cooperman/11.jpg", w: 1600, h: 696 },
      { src: "/img/projects/citrin-cooperman/12.jpg", w: 1600, h: 900 },
      { src: "/img/projects/citrin-cooperman/14.jpg", w: 1600, h: 900 },
      { src: "/img/projects/citrin-cooperman/15.jpg", w: 1600, h: 899 },
      { src: "/img/projects/citrin-cooperman/16.jpg", w: 1600, h: 1372 },
      { src: "/img/projects/citrin-cooperman/17.jpg", w: 1446, h: 805 },
      { src: "/img/projects/citrin-cooperman/18.jpg", w: 1446, h: 743 },
      { src: "/img/projects/citrin-cooperman/19.jpg", w: 1446, h: 805 },
    ],
  },
  {
    slug: "salarpuria",
    client: "Salarpuria",
    location: "Kolkata",
    sector: "Real estate",
    summary:
      "Boardroom, executive cabins, reception and open workstations for the Salarpuria office in Kolkata.",
    featured: true,
    cover: "/img/projects/salarpuria/01.jpg",
    gallery: [
      { src: "/img/projects/salarpuria/01.jpg", w: 1024, h: 768 },
      { src: "/img/projects/salarpuria/02.jpg", w: 1600, h: 1068 },
      { src: "/img/projects/salarpuria/03.jpg", w: 1600, h: 1068 },
      { src: "/img/projects/salarpuria/04.jpg", w: 1600, h: 1068 },
      { src: "/img/projects/salarpuria/05.jpg", w: 1600, h: 1066 },
      { src: "/img/projects/salarpuria/06.jpg", w: 1600, h: 1066 },
      { src: "/img/projects/salarpuria/07.jpg", w: 1600, h: 1066 },
      { src: "/img/projects/salarpuria/08.jpg", w: 1600, h: 1004 },
      { src: "/img/projects/salarpuria/09.jpg", w: 1600, h: 1067 },
      { src: "/img/projects/salarpuria/10.jpg", w: 1600, h: 1066 },
      { src: "/img/projects/salarpuria/11.jpg", w: 1600, h: 1066 },
    ],
  },
  {
    slug: "srm-university",
    client: "SRM University",
    location: "Chennai",
    sector: "Education",
    summary:
      "Colourful, flexible seating and tables for learning and collaboration spaces at SRM University, Chennai.",
    featured: true,
    cover: "/img/projects/srm-university/02.jpg",
    gallery: [
      { src: "/img/projects/srm-university/02.jpg", w: 1280, h: 960 },
      { src: "/img/projects/srm-university/01.jpg", w: 960, h: 1280 },
      { src: "/img/projects/srm-university/03.jpg", w: 1280, h: 960 },
      { src: "/img/projects/srm-university/04.jpg", w: 1280, h: 960 },
    ],
  },
  {
    slug: "bnp-paribas-thane",
    client: "BNP Paribas",
    location: "Mumbai",
    sector: "Banking",
    summary:
      "Meeting rooms, open workstations and locker banks for BNP Paribas in Thane, Mumbai.",
    featured: false,
    cover: "/img/projects/bnp-paribas-thane/05.jpg",
    gallery: [
      { src: "/img/projects/bnp-paribas-thane/05.jpg", w: 1280, h: 960 },
      { src: "/img/projects/bnp-paribas-thane/01.jpg", w: 1280, h: 960 },
      { src: "/img/projects/bnp-paribas-thane/02.jpg", w: 1280, h: 960 },
      { src: "/img/projects/bnp-paribas-thane/03.jpg", w: 1280, h: 960 },
      { src: "/img/projects/bnp-paribas-thane/04.jpg", w: 1280, h: 960 },
      { src: "/img/projects/bnp-paribas-thane/06.jpg", w: 1280, h: 960 },
      { src: "/img/projects/bnp-paribas-thane/07.jpg", w: 1024, h: 768 },
      { src: "/img/projects/bnp-paribas-thane/08.jpg", w: 1024, h: 768 },
      { src: "/img/projects/bnp-paribas-thane/09.jpg", w: 1024, h: 768 },
      { src: "/img/projects/bnp-paribas-thane/10.jpg", w: 1280, h: 960 },
      { src: "/img/projects/bnp-paribas-thane/11.jpg", w: 1280, h: 960 },
      { src: "/img/projects/bnp-paribas-thane/12.jpg", w: 1280, h: 960 },
    ],
  },
  {
    slug: "air-india-kochi",
    client: "Air India",
    location: "Kochi",
    sector: "Aviation",
    summary:
      "Open workstations and meeting rooms for Air India's office in Kochi.",
    featured: false,
    cover: "/img/projects/air-india-kochi/01.jpg",
    gallery: [
      { src: "/img/projects/air-india-kochi/01.jpg", w: 1280, h: 556 },
      { src: "/img/projects/air-india-kochi/02.jpg", w: 1280, h: 731 },
      { src: "/img/projects/air-india-kochi/03.jpg", w: 1040, h: 596 },
      { src: "/img/projects/air-india-kochi/04.jpg", w: 1280, h: 556 },
      { src: "/img/projects/air-india-kochi/07.jpg", w: 963, h: 896 },
      { src: "/img/projects/air-india-kochi/08.jpg", w: 1280, h: 920 },
      { src: "/img/projects/air-india-kochi/09.jpg", w: 1189, h: 853 },
    ],
  },
  {
    slug: "rpsg",
    client: "RPSG",
    location: "Kolkata",
    sector: "Conglomerate",
    summary:
      "Library lounge, collaborative tables and soft seating for RPSG in Kolkata.",
    featured: false,
    cover: "/img/projects/rpsg/02.jpg",
    gallery: [
      { src: "/img/projects/rpsg/02.jpg", w: 1024, h: 768 },
      { src: "/img/projects/rpsg/01.jpg", w: 768, h: 1024 },
      { src: "/img/projects/rpsg/03.jpg", w: 1024, h: 768 },
      { src: "/img/projects/rpsg/04.jpg", w: 960, h: 1280 },
      { src: "/img/projects/rpsg/05.jpg", w: 1600, h: 900 },
    ],
  },
  {
    slug: "ajanta-pharma",
    client: "Ajanta Pharma",
    sector: "Pharmaceuticals",
    summary:
      "Open workstations and executive desks across an Ajanta Pharma office floor.",
    featured: false,
    cover: "/img/projects/ajanta-pharma/02.jpg",
    gallery: [
      { src: "/img/projects/ajanta-pharma/02.jpg", w: 1040, h: 780 },
      { src: "/img/projects/ajanta-pharma/01.jpg", w: 780, h: 1040 },
      { src: "/img/projects/ajanta-pharma/03.jpg", w: 1280, h: 960 },
      { src: "/img/projects/ajanta-pharma/04.jpg", w: 1280, h: 960 },
      { src: "/img/projects/ajanta-pharma/05.jpg", w: 1280, h: 960 },
      { src: "/img/projects/ajanta-pharma/06.jpg", w: 1280, h: 960 },
    ],
  },
  {
    slug: "akzonobel",
    client: "AkzoNobel",
    location: "Kolkata",
    sector: "Paints & coatings",
    summary:
      "Reception, workstations, meeting and lounge settings for AkzoNobel in Kolkata.",
    featured: false,
    cover: "/img/projects/akzonobel/02.jpg",
    gallery: [
      { src: "/img/projects/akzonobel/02.jpg", w: 1600, h: 1200 },
      { src: "/img/projects/akzonobel/01.jpg", w: 1600, h: 1200 },
      { src: "/img/projects/akzonobel/03.jpg", w: 1600, h: 1200 },
      { src: "/img/projects/akzonobel/04.jpg", w: 1600, h: 1200 },
    ],
  },
  {
    slug: "mirania-realty",
    client: "Mirania Realty",
    sector: "Real estate",
    summary:
      "Executive cabins, meeting rooms and lounge seating for Mirania Realty.",
    featured: false,
    cover: "/img/projects/mirania-realty/04.jpg",
    gallery: [
      { src: "/img/projects/mirania-realty/04.jpg", w: 840, h: 1120 },
      { src: "/img/projects/mirania-realty/01.jpg", w: 768, h: 1024 },
      { src: "/img/projects/mirania-realty/02.jpg", w: 768, h: 1024 },
      { src: "/img/projects/mirania-realty/03.jpg", w: 768, h: 1024 },
      { src: "/img/projects/mirania-realty/05.jpg", w: 840, h: 1120 },
      { src: "/img/projects/mirania-realty/06.jpg", w: 768, h: 1024 },
    ],
  },
  {
    slug: "ratnabali-securities",
    client: "Ratnabali Securities",
    sector: "Financial services",
    summary:
      "Executive cabins, a conference table and lounge seating for Ratnabali Securities.",
    featured: false,
    cover: "/img/projects/ratnabali-securities/02.jpg",
    gallery: [
      { src: "/img/projects/ratnabali-securities/02.jpg", w: 832, h: 624 },
      { src: "/img/projects/ratnabali-securities/01.jpg", w: 1040, h: 780 },
      { src: "/img/projects/ratnabali-securities/03.jpg", w: 832, h: 624 },
    ],
  },
  {
    slug: "birla-corporation",
    client: "Birla Corporation",
    sector: "Cement",
    summary:
      "A large boardroom table with executive seating for Birla Corporation.",
    featured: false,
    cover: "/img/projects/birla-corporation/01.jpg",
    gallery: [
      { src: "/img/projects/birla-corporation/01.jpg", w: 1280, h: 960 },
      { src: "/img/projects/birla-corporation/02.jpg", w: 1280, h: 960 },
    ],
  },
  {
    slug: "novotel-kolkata",
    client: "Novotel",
    location: "Kolkata",
    sector: "Hospitality",
    summary:
      "A conference room for Novotel in Kolkata.",
    featured: false,
    cover: "/img/projects/novotel-kolkata/01.jpg",
    gallery: [
      { src: "/img/projects/novotel-kolkata/01.jpg", w: 1080, h: 1350 },
    ],
  },
];

export const projectBySlug = new Map(projects.map((p) => [p.slug, p]));
export const featuredProjects = projects.filter((p) => p.featured);

export function projectPlace(p: Project) {
  return p.location ?? "India";
}

/* ------------------------------------------------------------------ */
/* Clients                                                             */
/* ------------------------------------------------------------------ */

export type Client = { slug: string; name: string; logo: string };

const clientNames: [string, string][] = [
  ["ratnabali", "Ratnabali"],
  ["birla-corporation", "Birla Corporation"],
  ["titagarh", "Titagarh Rail Systems"],
  ["jll", "JLL"],
  ["rpsg", "RP-Sanjiv Goenka Group"],
  ["vikram-solar", "Vikram Solar"],
  ["tarsons", "Tarsons"],
  ["msp", "MSP"],
  ["itc", "ITC Limited"],
  ["pfizer", "Pfizer"],
  ["lux", "Lux Inners & Casuals"],
  ["novotel", "Novotel"],
  ["kpmg", "KPMG"],
  ["rr-kabel", "RR Kabel"],
  ["salarpuria", "Salarpuria"],
  ["ramkrishna-forgings", "Ramkrishna Forgings"],
  ["magma", "Magma"],
  ["emami", "Emami"],
  ["mckinsey", "McKinsey & Company"],
  ["pwc", "PwC"],
  ["balrampur", "Balrampur Chini Mills"],
  ["lakshmi", "Lakshmi"],
  ["ginodia", "R. Ginodia & Co."],
  ["everstone", "Everstone Capital"],
  ["dhc", "DHC"],
  ["s-films", "S Films"],
  ["uco-bank", "UCO Bank"],
  ["tata-communications", "Tata Communications"],
  ["sugam", "Sugam"],
  ["centuryply", "Centuryply"],
  ["vedika-metals", "Vedika Metals"],
  ["mangalam-cement", "Mangalam Cement"],
  ["primarc", "Primarc"],
  ["red-bull", "Red Bull"],
  ["credai-bengal", "CREDAI Bengal"],
  ["salient", "Salient"],
  ["genpact", "Genpact"],
  ["retailez", "RetailEZ"],
  ["baazar-kolkata", "Baazar Kolkata"],
  ["ecoline", "Ecoline"],
  ["cbre", "CBRE"],
  ["accenture", "Accenture"],
  ["manyavar", "Manyavar"],
  ["arjan-dass", "Arjan Dass"],
  ["rupa", "Rupa"],
];

export const clients: Client[] = clientNames.map(([slug, name]) => ({
  slug,
  name,
  logo: `/img/clients/${slug}.png`,
}));
