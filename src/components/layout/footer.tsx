import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12 mt-auto">
      <div className="container max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-4">
            {siteConfig.logoUrl ? (
                <Image src={siteConfig.logoUrl} alt={siteConfig.name} width={40} height={40} className="h-10 w-auto" />
              ) : (
                <span className="font-headline text-2xl font-bold text-primary">{siteConfig.name.charAt(0)}</span>
            )}
            <span className="font-headline text-2xl font-bold text-primary">{siteConfig.name}</span>
          </Link>
          <p className="text-sm">{siteConfig.description.split('.')[0] + '.'}</p>
        </div>

        <div>
          <h3 className="font-headline text-lg font-semibold text-foreground mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {siteConfig.mainNav.filter(item => !item.authRequired).slice(0, 5).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm hover:text-primary transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-headline text-lg font-semibold text-foreground mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <Phone className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
              <span>{siteConfig.support.phone}</span>
            </li>
            <li className="flex items-start">
              <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
              <a href={`mailto:${siteConfig.support.email}`} className="hover:text-primary transition-colors">
                {siteConfig.support.email}
              </a>
            </li>
            <li className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
              <span>{siteConfig.support.address}</span>
            </li>
            <li className="flex items-start">
              <MessageSquare className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
               {/* Placeholder for Live Chat */}
              <button className="hover:text-primary transition-colors text-left">
                Live Chat (Coming Soon)
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="container max-w-screen-2xl mt-8 pt-8 border-t border-border text-center text-sm">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
