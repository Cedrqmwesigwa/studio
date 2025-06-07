
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
    rawPhone: string; // For tel: links
    email: string;
    address: string;
    operatingHours: string;
    whatsappNumber?: string; // For WhatsApp link generation
    whatsappLink?: string; // Full WhatsApp link
  };
};

const rawPhoneNumber = "+256751979777";
const displayPhoneNumber = "+256 751 979 777"; // Keep this for display if you prefer spaces
const whatsappNumberForLink = rawPhoneNumber.replace(/\D/g, ''); // Remove non-digits for wa.me link

export const siteConfig: SiteConfig = {
  name: "Sterling Contractors",
  description: "Your trusted partner for construction and contracting services in Kampala. We build Uganda's future with quality, transparency, and data-driven efficiency.",
  url: "https://sterlingcontractors.org",
  ogImage: "/og.jpg", // Updated to local path
  logoUrl: "/site_assets/sterling-contractors-logo.png",
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
    phone: displayPhoneNumber,
    rawPhone: rawPhoneNumber,
    email: "mctyptys@gmail.com",
    address: "Nakasero, Kampala, Uganda",
    operatingHours: "Mon-Fri: 8 AM - 5 PM, Sat: 9 AM - 1 PM",
    whatsappNumber: whatsappNumberForLink,
    whatsappLink: `https://wa.me/${whatsappNumberForLink}`,
  },
};
