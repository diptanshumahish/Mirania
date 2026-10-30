/**
 * Canonical business content. Every string here is carried over from mirania.in.
 */

export const site = {
  name: "Mirania",
  legalName: "Mirania Furniture",
  url: "https://mirania.in",
  tagline: "A furniture house for spaces that need decisions, not just products.",
  shortDescription:
    "Mirania is a Kolkata furniture house working across residences, workplaces and project-led interiors: retail, bespoke manufacturing, curated international brands and project execution under one roof.",
  founded: 2003,
  city: "Kolkata",
  timezone: "Asia/Kolkata",
  coords: { lat: 22.5411351, lng: 88.3887001 },
} as const;

export const contact = {
  email: "info@mirania.in",
  phones: ["+91 33 40048900", "+91 98319 13000", "+91 99039 78887"],
  primaryPhone: "+91 9831 913000",
  primaryPhoneHref: "tel:+919831913000",
  whatsapp: "https://api.whatsapp.com/send?phone=919831913000",
  whatsappNumber: "919831913000",
  address: {
    name: "K3N Lifestyles",
    lines: ["#3 Mirania Gardens", "11F East Topsia Road", "Kolkata 700 046", "West Bengal, India"],
  },
  hours: [
    { days: "Monday to Friday", time: "10:00 to 19:30" },
    { days: "Saturday", time: "10:00 to 19:30" },
    { days: "Sunday", time: "Closed" },
  ],
  /** 24h local opening window used by the live "open now" indicator. */
  openHours: { open: 10, close: 19.5, closedDays: [0] as readonly number[] },
  map: "https://www.google.com/maps/dir//Mirania+Furniture,+3,+E+Topsia+Rd,+Mirania+Gardens,+11F,+Topsia,+Kolkata,+West+Bengal+700046,+India",
  social: {
    instagram: "https://www.instagram.com/miraniafurniture/",
    facebook: "https://www.facebook.com/MiraniaFurniture",
  },
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Brands", href: "/brands" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Journal", href: "/journal" },
] as const;

export const about = {
  history: [
    "Over 20 years ago, Mirania Furniture was launched with the aim to take the phenomenon of obtaining furniture solutions to a level that reflects finesse and convenience with every purchase. Since our inception, we have actively revolutionized residential and commercial spaces, while conveying pure aesthetic brilliance through opulent furniture and accent pieces.",
    "With 20 plus years of industry experience, we have curated an abode for premium home & office solutions ensuring that each piece is seamlessly delivered while keeping the client's needs in mind. Our store is one that resonates with the homemakers and office goers alike, as we build long-term symbiotic relationships with our clients whom we consider part of our family.",
  ],
  vision:
    "Envisioning a world where everyone has access to stunning, timeless furniture that is a true embodiment of one's unique style and elevates their home's and office's décor. We are committed to providing the finest quality of luxury furniture that is timeless, lavish, and exudes comfort in every aspect for every client.",
  mission:
    "Our mission at Mirania Furniture is to provide the utmost in luxurious home and office furnishings, exceptional customer service, and outstanding quality that will last for generations. We strive to curate timeless pieces that will bring beauty, comfort, and style to residential, commercial, and hospitality spaces, while upholding the highest standards of craftsmanship and commitment to excellence.",
  philosophyTitle: "Destination for premium, world-class furniture.",
  philosophy: [
    "Over 20 years ago, we launched our establishment as a part of the Mirania group as the furniture vertical, with the aim to take the phenomenon of obtaining furniture solutions to a level that reflects finesse and convenience with every purchase. Our inception marked a path for us to revolutionize residential and commercial spaces, while conveying pure aesthetic brilliance through opulent furniture and accent pieces.",
    "As a multi-designer store, we have housed globally renowned brands, including Stanley, La-z-Boy, Hunter Douglas, Stressless and Steelcase, cementing our position as a marvelous furniture boutique in Eastern India. Till date, each piece is seamlessly delivered while keeping the client's needs in mind. From residential clientele to suppliers and vast offices, we have housed splendid furniture solutions that are in sync with market trends.",
  ],
  pullQuote:
    "Our opportunity, as designers, is to learn how to handle the complexity, rather than shy away from it, and to realize that the big art of design is to make complicated things simple.",
} as const;

/**
 * Content from the Mirania Company Profile (2026). The `about` block above is
 * the earlier site copy; the journal still quotes it as the house's original
 * words.
 */
export const profile = {
  intro:
    "Mirania works across private residences, workplaces and project-led interiors. We bring together retail experience, curated international brands, our own manufacturing capability and execution support, so that every space can be resolved with clarity.",
  headline: "Retail clarity. Manufacturing depth. Design curation.",
  strength:
    "The strength of Mirania is not a single category. It is the ability to move between product, material, making and site realities without losing the design intent.",
  story: [
    "For over three decades, Mirania has worked across residential and workplace interiors, bringing together furniture, design and execution under one roof. We work with homeowners, architects, designers and businesses to understand what a space needs before deciding what belongs in it.",
    "Our portfolio brings together international furniture brands, bespoke solutions and our own design capabilities, supported by consultation, project coordination, installation and after-sales service. What connects it all is a considered approach to proportion, material, comfort and execution.",
  ],
  mission: [
    "For over three decades, Mirania has believed that exceptional furniture is about more than filling a space. It is about understanding how that space should feel, function and endure.",
    "Our mission is to bring together thoughtful design, globally respected brands, bespoke manufacturing and meticulous execution. Working closely with architects, designers, corporations and private clients, we translate ideas into considered furniture solutions, from a single statement piece to complete workplaces and residences.",
  ],
  vision: [
    "To be one of India's most respected names in furniture, recognised for our discernment, design understanding and depth of experience.",
    "We envision Mirania as a destination where global design meets Indian craftsmanship, local expertise and personalised service, while staying rooted in the values that have defined us for over 30 years: meaningful relationships, uncompromising quality and design with lasting relevance.",
  ],
  approach:
    "A catalogue can offer products. A factory can offer possibilities. Mirania is designed to connect the two, choosing what exists beautifully and creating what the brief demands.",
  facts: [
    { n: "30+", label: "Years of furniture and design-led work in Kolkata" },
    { n: "Home + Workplace", label: "Retail and project capability across both worlds" },
    { n: "Global + In-house", label: "International partners alongside Mirania-born brands" },
    { n: "One point", label: "Of responsibility, from selection to delivery and service" },
  ],
  capabilities: [
    {
      name: "Retail",
      title: "Furniture selected with context.",
      text: "Mirania's retail universe serves both home and office clients, offering guided selection across furniture, finishes, materials and complementary pieces.",
      tags: ["Residential furniture", "Workplace furniture", "Executive spaces", "Showroom trials", "Material and finish guidance"],
      image: "/img/profile/retail.jpg",
    },
    {
      name: "Bespoke",
      title: "When the right piece does not exist, we make it.",
      text: "Our manufacturing capability allows Mirania to develop furniture around individual briefs, spatial constraints, proportions, materials and finishes.",
      tags: ["Brief", "Detail", "Material", "Make", "Install"],
      image: "/img/profile/bespoke.jpg",
    },
    {
      name: "Curation",
      title: "A selected portfolio, not a catalogue dump.",
      text: "Each brand has a defined role, from workplace performance and acoustic separation to upholstery, light control and residential furniture. The portfolio broadens what a project can solve, not simply what it can buy.",
      tags: ["International partners", "Mirania-born brands"],
      image: "/img/profile/curation.jpg",
    },
    {
      name: "Office & Projects",
      title: "Workplaces need more than chairs and tables.",
      text: "Mirania supports workplace projects through product selection, specification, planning coordination, site installation and service beyond handover.",
      tags: ["Seating", "Desking", "Executive", "Meeting", "Collaboration", "Partitions", "Storage", "Pods"],
      image: "/img/profile/office.jpg",
    },
  ],
  process: [
    { step: "Understand", text: "Brief, space, use and budget" },
    { step: "Curate", text: "Products, systems and materials" },
    { step: "Specify", text: "Dimensions, finishes and technical requirements" },
    { step: "Develop", text: "Custom solutions where required" },
    { step: "Coordinate", text: "Designers, site teams, orders and execution" },
    { step: "Deliver", text: "Installation and handover" },
    { step: "Support", text: "Service after installation" },
  ],
  aftercare: [
    "Installation supervision",
    "Warranty coordination",
    "Maintenance and repairs",
    "AMC support",
    "Reconfiguration",
    "Post-installation assistance",
  ],
} as const;

export const credits = {
  year: 2026,
  line: "© Mirania. All rights reserved.",
} as const;
