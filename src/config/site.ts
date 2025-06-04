
export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  authRequired?: boolean;
  adminRequired?: boolean; // For future use
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  logoUrl?: string;
  mainNav: NavItem[];
  footerNav?: NavItem[];
  support: {
    phone: string;
    email: string;
    address: string;
    operatingHours: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Sterling Contractors",
  description: "Your trusted partner for construction and contracting services in Kampala. We build Uganda's future with quality, transparency, and data-driven efficiency.",
  url: "https://sterlingcontractors.org",
  ogImage: "https://sterlingcontractors.org/og.jpg", // Updated domain
  logoUrl: "https://storage.googleapis.com/project-ai-prototyper.appspot.com/site_assets/sterling-contractors-logo.png",
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Gallery", href: "/gallery" },
    { title: "Blog", href: "/blog" },
    { title: "Shop", href: "/shop"},
    { title: "Contact", href: "/contact" },
    { title: "Dashboard", href: "/dashboard", authRequired: true },
    { title: "Deposit Estimator", href: "/deposit-estimator", authRequired: true },
    { title: "Product AI", href: "/product-recommendation", authRequired: true },
    { title: "Image Tagger", href: "/image-tagging", authRequired: true },
    { title: "Make Deposit", href: "/deposits", authRequired: true },
  ],
  support: {
    phone: "+256 751 979 777",
    email: "support@sterlingcontractors.example.com", // Placeholder, update if you have actual email
    address: "Nakasero, Kampala, Uganda",
    operatingHours: "Mon-Fri: 8 AM - 5 PM, Sat: 9 AM - 1 PM",
  },
};
