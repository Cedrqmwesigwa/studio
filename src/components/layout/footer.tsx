
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { Mail, Phone, MapPin, MessageSquare, TrendingUp } from 'lucide-react';

// SVG for WhatsApp icon as lucide-react doesn't have one directly
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.85L2 22l5.25-1.38c1.47.79 3.1 1.25 4.85 1.25 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.01 1.66c4.56 0 8.26 3.7 8.26 8.26 0 4.56-3.7 8.26-8.26 8.26-1.59 0-3.1-.45-4.42-1.25l-.3-.18-3.3 1.38 1.38-3.22-.2-.32c-.8-1.32-1.25-2.83-1.25-4.42 0-4.56 3.7-8.26 8.26-8.26m0 0" />
    <path d="M17.52 14.02c-.22-.11-.76-.38-1.06-.5-.3-.12-.52-.17-.73.17-.22.34-.8.95-.98 1.14-.18.2-.36.22-.66.11-.3-.11-1.25-.46-2.38-1.47-1.13-1.02-1.6-1.82-1.88-2.54-.28-.72.17-1.08.43-1.43.26-.34.42-.51.61-.81.2-.3.3-.51.17-.73s-.73-1.76-1-2.4-.55-.55-.73-.55c-.18 0-.38-.06-.57-.06s-.52.06-.78.34c-.26.28-.98.95-1.25 1.82-.28.87-.39 1.59-.39 2.38 0 .78.11 1.59.39 2.38.28.78.98 1.59 1.25 1.82.28.28.98.95 1.25 1.82.28.78.39 1.59.39 2.38 0 .78-.11 1.59-.39 2.38a5.395 5.395 0 01-2.28 3.18c-.2.11-.4.17-.6.17h-.11c-.22 0-.7-.11-1.01-.57-.3-.45-.98-1.47-1.25-2.28-.28-.82-.39-1.59-.39-2.38s.11-1.59.39-2.38c.27-.87.98-1.59 1.25-1.82.27-.28.98-.95 1.25-1.82.27-.87.39-1.59.39-2.38a6.79 6.79 0 011.25-4.42c.79-1.47 1.25-3.1 1.25-4.85S17.5 2 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.25 4.85L2 22l5.25-1.38c1.47.79 3.1 1.25 4.85 1.25 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm4.23 11.03c-.11.17-.22.3-.36.42-.15.11-.3.2-.45.22-.15.06-.3.06-.45.06h-.11c-.18 0-.38-.06-.57-.06h-.11c-.18 0-.38-.06-.57-.06h-.11c-.18 0-.38-.06-.57-.06h-.11c-.18 0-.38-.06-.57-.06l-.11.06c-.18 0-.38-.06-.57-.06h-.11c-.18 0-.38-.06-.57-.06h-.11a.573.573 0 01-.57-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57l-.06-.11c0-.18.06-.38.06-.57V9.9c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57V8.95c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57V7.98c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57l.06-.11c.18-.3.52-.52.88-.66.36-.15.73-.22 1.11-.22.38 0 .76.07 1.11.22.36.15.66.36.88.66.22.3.36.66.36 1.06 0 .4-.15.76-.36 1.06-.22.3-.52.52-.88.66a2.498 2.498 0 01-2.22 0c-.36-.15-.66-.36-.88-.66-.22-.3-.36-.66-.36-1.06s.15-.76.36-1.06c.22-.3.52-.52.88-.66.36-.15.73-.22 1.11-.22.38 0 .76.07 1.11.22.36.15.66.36.88.66.22.3.36.66.36 1.06 0 .4-.15.76-.36 1.06-.22.3-.52.52-.88.66a2.45 2.45 0 01-1.11.22c-.38 0-.76-.07-1.11-.22a2.45 2.45 0 01-1.11-.22 2.45 2.45 0 01-1.11-.22 2.498 2.498 0 01-2.22 0c-.36-.15-.66-.36-.88-.66-.22-.3-.36-.66-.36-1.06 0-.4.15-.76.36-1.06.22-.3.52-.52.88-.66.36-.15.73-.22 1.11-.22.38 0 .76.07 1.11.22.36.15.66.36.88.66.22.3.36.66.36 1.06v.57c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57l.06.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57zm-1.22-3.3c.22-.11.52-.26.73-.41.22-.15.33-.3.33-.45s-.11-.3-.33-.45c-.22-.15-.52-.26-.73-.41s-.42-.26-.66-.26c-.22 0-.45.06-.66.26-.22.15-.33.3-.33.45s.11.3.33.45c.22.15.52.26.73.41.22.15.45.26.66.26.22 0 .45-.11.66-.26z" />
  </svg>
);

export default function Footer() {
  const footerNavLinks = siteConfig.mainNav
    .filter(item => !item.authRequired && (item.href === "/" || item.href === "/services" || item.href === "/portfolio" || item.href === "/shop" || item.href === "/contact" || item.href === "/invest-with-us" || item.href === "/blog"))
    .slice(0, 6); // Show up to 6 main links

  return (
    <footer className="bg-muted text-muted-foreground py-12 mt-auto">
      <div className="container max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-4">
            {siteConfig.logoAsset ? (
                <Image src={siteConfig.logoAsset} alt={siteConfig.name} width={40} height={40} className="h-10 w-auto" data-ai-hint="company logo" />
              ) : (
                <span className="font-headline text-2xl font-bold text-primary">{siteConfig.name.charAt(0)}</span>
            )}
            <span className="font-headline text-2xl font-bold text-primary">{siteConfig.name}</span>
          </Link>
          <p className="text-sm">{siteConfig.description.split('.')[0] + '.'}</p>
        </div>

        <div>
          <h3 className="font-headline text-lg font-semibold text-foreground mb-4">Explore</h3>
          <ul className="space-y-2">
            {footerNavLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm hover:text-primary transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
                <Link href="/book-project" className="text-sm hover:text-primary transition-colors">
                  Book a Project
                </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-headline text-lg font-semibold text-foreground mb-4">Opportunities</h3>
          <ul className="space-y-2">
             <li>
                <Link href="/invest-with-us" className="text-sm hover:text-primary transition-colors flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" /> Invest With Us
                </Link>
            </li>
             <li>
                <Link href="/deposits" className="text-sm hover:text-primary transition-colors">
                  Make a Deposit
                </Link>
            </li>
            {/* Add more opportunity-related links here if needed */}
          </ul>
        </div>


        <div>
          <h3 className="font-headline text-lg font-semibold text-foreground mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <Phone className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
              <a href={`tel:${siteConfig.support.rawPhone}`} className="hover:text-primary transition-colors">{siteConfig.support.phone}</a>
            </li>
            <li className="flex items-start">
              <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
              <a href={`mailto:${siteConfig.support.email}`} className="hover:text-primary transition-colors">
                {siteConfig.support.email}
              </a>
            </li>
            {siteConfig.support.whatsappLink && (
               <li className="flex items-start">
                <WhatsAppIcon className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                <a href={siteConfig.support.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Chat on WhatsApp
                </a>
              </li>
            )}
            <li className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
              <span>{siteConfig.support.address}</span>
            </li>
            <li className="flex items-start">
              <MessageSquare className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
              <button className="hover:text-primary transition-colors text-left text-sm" disabled>
                Live Chat (Coming Soon)
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="container max-w-screen-2xl mt-8 pt-8 border-t border-border text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
         <p className="text-xs mt-1">
            <Link href="/invest-with-us#disclaimer" className="hover:text-primary">Investment Disclaimer</Link>
          </p>
      </div>
    </footer>
  );
}
