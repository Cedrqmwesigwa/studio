
import InvestmentInquiryForm from '@/components/forms/investment-inquiry-form';
import { siteConfig } from '@/config/site';
import { TrendingUp, Briefcase, ShieldCheck, DollarSign, Info } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: `Invest With Us | ${siteConfig.name}`,
  description: `Explore investment opportunities with ${siteConfig.name}. Grow your capital by investing in tangible construction and real estate projects in Uganda.`,
};

export default function InvestWithUsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center mb-10 fade-in">
         <div className="flex justify-center items-center mb-4">
            <TrendingUp className="h-16 w-16 text-primary" />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Grow Your Capital with Sterling Contractors</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Traditional savings can lose value to inflation. Discover how partnering with {siteConfig.name} on carefully selected construction and real estate projects can offer potentially higher returns and help you build long-term wealth.
        </p>
      </section>

      <Card className="shadow-lg fade-in" style={{animationDelay: '0.1s'}}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Briefcase className="mr-3 h-7 w-7 text-primary" />
            Why Invest Through {siteConfig.name}?
          </CardTitle>
          <CardDescription>Leverage our expertise and market knowledge for your financial growth.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <DollarSign className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold text-lg text-foreground mb-1">Hedge Against Inflation</h3>
              <p className="text-sm text-muted-foreground">Invest in tangible assets like real estate that historically appreciate and can outpace inflation, protecting your purchasing power.</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <TrendingUp className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold text-lg text-foreground mb-1">Potential for Higher Returns</h3>
              <p className="text-sm text-muted-foreground">Well-chosen construction and real estate projects can offer attractive returns compared to standard savings accounts.</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <ShieldCheck className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold text-lg text-foreground mb-1">Tangible Asset Investment</h3>
              <p className="text-sm text-muted-foreground">Invest in physical properties, providing a sense of security and long-term value. You're building something real.</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <Briefcase className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold text-lg text-foreground mb-1">Expert Project Management</h3>
              <p className="text-sm text-muted-foreground">Benefit from our construction expertise, project management skills, and local market insights to maximize investment potential.</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Learn more about the advantages of real estate investment over traditional savings by reading our <Link href="/blog/saving-vs-real-estate-investment-uganda" className="text-primary hover:underline">in-depth blog post</Link>.
          </p>
        </CardContent>
      </Card>
      
      <section className="fade-in" style={{animationDelay: '0.2s'}}>
        <h2 className="font-headline text-3xl font-bold tracking-tight text-center mb-2">Express Your Interest</h2>
        <p className="text-lg text-muted-foreground text-center mb-8">
            Ready to explore how your capital can work harder for you? Fill out the form below to express your interest in our investment opportunities. Our team will contact you to discuss suitable options.
        </p>
        <InvestmentInquiryForm />
      </section>

      <Card className="border-amber-500 bg-amber-500/10 mt-10 fade-in" style={{animationDelay: '0.3s'}}>
        <CardHeader className="flex-row items-center space-x-3 pb-3">
            <Info className="h-6 w-6 text-amber-700 flex-shrink-0" />
            <CardTitle className="text-amber-800 text-xl">Important Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-amber-700">
            <p>Sterling Contractors is primarily a construction and hardware supply company. We are not registered financial advisors or a bank.</p>
            <p>Submitting the inquiry form signifies your interest in potential future investment opportunities related to projects undertaken or managed by Sterling Contractors. It does not constitute the opening of a financial account, a formal investment commitment, or an offer to buy securities.</p>
            <p>All investments carry risk, including the potential loss of principal. Past performance is not indicative of future results. Any potential investment opportunities will be subject to separate agreements, due diligence, and relevant legal and regulatory requirements.</p>
            <p>We recommend consulting with an independent financial advisor before making any investment decisions.</p>
        </CardContent>
      </Card>

    </div>
  );
}
