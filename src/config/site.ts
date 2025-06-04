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
  name: "Sterling Solutions Hub",
  description: "Your partner in construction and hardware solutions.",
  url: "https://sterlingsolutions.example.com", // Replace with actual URL
  ogImage: "https://sterlingsolutions.example.com/og.jpg", // Replace with actual OG image
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
    phone: "+254 700 000 000",
    email: "support@sterlingsolutions.example.com",
    address: "123 Construction Ave, Nairobi, Kenya",
    operatingHours: "Mon-Fri: 8 AM - 5 PM, Sat: 9 AM - 1 PM",
  },
};
