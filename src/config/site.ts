
import type { StaticImageData } from 'next/image';
// Importing the logo is removed, we will use a public path.

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  authRequired?: boolean;
  adminRequired?: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  logoUrl?: string; // Changed back to logoUrl, type string
  mainNav: NavItem[];
  footerNav?: NavItem[];
  support: {
    phone: string;
    rawPhone: string;
    email: string;
    address: string;
    operatingHours: string;
    whatsappNumber?: string;
    whatsappLink?: string;
  };
};

const rawPhoneNumber = "+256751979777";
const displayPhoneNumber = "+256 751 979 777";
const whatsappNumberForLink = rawPhoneNumber.replace(/\D/g, '');

export const siteConfig: SiteConfig = {
  name: "Sterling Contractors",
  description: "Your trusted partner for construction and contracting services in Kampala. We build Uganda's future with quality, transparency, and data-driven efficiency.",
  url: "https://sterlingcontractors.org",
  ogImage: "/og.jpg",
  logoUrl: "/site_assets/sterling-contractors-logo.jpg", // Points to public/site_assets/sterling-contractors-logo.jpg
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Gallery", href: "/gallery" },
    { title: "Shop", href: "/shop"},
    { title: "Invest With Us", href: "/invest-with-us" },
    { title: "Blog", href: "/blog" },
    { title: "Book Project", href: "/book-project"},
    { title: "Contact", href: "/contact" },
    { title: "Dashboard", href: "/dashboard", authRequired: true },
    { title: "Rewards", href: "/rewards", authRequired: true },
    { title: "Admin Projects", href: "/admin/projects", authRequired: true, adminRequired: true },
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
