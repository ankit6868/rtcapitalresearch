export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  program?: string;
  capital?: string;
  message?: string;
  source: "contact" | "modal";
  status: "new" | "read" | "responded";
  createdAt: string; // ISO
};

export type Settings = {
  logoPath: string | null;
  siteName: string;
  logoFallback: string;
  hero: {
    badge: string;
    headline: string;
    italic: string;
    description: string;
    btn1: string;
    btn2: string;
  };
  stats: { number: string; label: string }[];
  contact: {
    phoneDisplay: string;
    whatsappDigits: string;
    whatsappUrl?: string;
    email: string;
    deskPhone: string;
    mumbaiAddress: string;
    udaipurAddress: string;
  };
  popup: { enabled: boolean; delayMs: number };
  footerText: { copyright: string; disclaimer: string };
};

export type Section = {
  id: string;
  title: string;
  key: string;
  order: number;
  visible: boolean;
  content: Record<string, unknown>;
};

export type NavItem = { label: string; href: string; visible: boolean };

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

export type Admin = {
  username: string;
  passwordHash: string;
};

export type Session = {
  username: string;
  createdAt: string;
};
