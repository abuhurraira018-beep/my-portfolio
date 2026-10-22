export interface SiteConfig {
  name: string;
  tagline: string;
  announcement: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkUrl?: string;
  };
  currency: {
    code: string;
    symbol: string;
    decimalPlaces: number;
  };
  contact: {
    email: string;
    supportEmail: string;
    phone: string;
    address: string;
    hours: string;
  };
  socialLinks: {
    name: string;
    icon: string;
    url: string;
  }[];
  shipping: {
    freeShippingThreshold: number;
    standardShippingFee: number;
    taxRate: number;
  };
}

export const siteConfig: SiteConfig = {
  name: "NEXORA",
  tagline: "Business & Commerce Solutions",
  announcement: {
    enabled: true,
    text: "Discover quality products and exceptional commercial service.",
    linkText: "Shop Catalog",
    linkUrl: "/products",
  },
  currency: {
    code: "USD",
    symbol: "$",
    decimalPlaces: 2,
  },
  contact: {
    email: "contact@nexora-commerce.com",
    supportEmail: "support@nexora-commerce.com",
    phone: "+1 (800) 555-0199",
    address: "742 Evergreen Terrace, Suite 400, New York, NY 10001",
    hours: "Monday - Friday: 8:00 AM - 6:00 PM EST",
  },
  socialLinks: [
    { name: "LinkedIn", icon: "bi-linkedin", url: "https://linkedin.com" },
    { name: "Twitter", icon: "bi-twitter-x", url: "https://twitter.com" },
    { name: "Facebook", icon: "bi-facebook", url: "https://facebook.com" },
    { name: "Instagram", icon: "bi-instagram", url: "https://instagram.com" },
  ],
  shipping: {
    freeShippingThreshold: 150,
    standardShippingFee: 15.00,
    taxRate: 0.08,
  },
};
