
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
  description: "Sterling Contractors: Building Uganda's future with quality, transparency, and data-driven efficiency. Your trusted partner in Kampala for all construction and contracting needs.",
  url: "https://sterlingcontractors.example.com", // Replace with actual URL
  ogImage: "https://sterlingcontractors.example.com/og.jpg", // Replace with actual OG image
  logoUrl: "https://storage.googleapis.com/project-ai-prototyper.appspot.com/3a3e4546-9140-45e6-b81c-9ca8c67b3624_SterlingContractorsLogo.png",
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
    phone: "+254 700 000 000", // Please provide the correct Ugandan phone number
    email: "support@sterlingcontractors.example.com", // Update with actual email if available
    address: "Nakasero, Kampala, Uganda",
    operatingHours: "Mon-Fri: 8 AM - 5 PM, Sat: 9 AM - 1 PM", // Please confirm/update operating hours
  },
};
