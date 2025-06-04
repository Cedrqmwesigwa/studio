import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DollarSign, ShieldCheck, Banknote, Smartphone, FileText, MessageSquare } from "lucide-react";

export default function DepositsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center justify-center">
          <DollarSign className="h-10 w-10 mr-3 text-primary" />
          Secure Project Deposits
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Secure your project with an initial deposit. We offer convenient and safe payment options.
        </p>
      </section>

      <Card className="shadow-lg fade-in" style={{animationDelay: '0.2s'}}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <ShieldCheck className="mr-2 h-6 w-6 text-primary" />
            How to Make a Deposit
          </CardTitle>
          <CardDescription>Follow these steps to securely make your project deposit.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Step 1: Get Your Deposit Amount</h3>
            <p className="text-muted-foreground">
              Use our <Link href="/deposit-estimator" className="text-primary hover:underline">AI Deposit Estimator</Link> for a preliminary range, or contact us for a formal project quote which will include the exact deposit amount.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Step 2: Choose Your Payment Method</h3>
            <p className="text-muted-foreground">We accept deposits via:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li className="flex items-center"><Banknote className="h-5 w-5 mr-2 text-accent" />Direct Bank Transfer</li>
              <li className="flex items-center"><Smartphone className="h-5 w-5 mr-2 text-accent" />Mobile Money (e.g., M-Pesa)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Step 3: Make the Payment</h3>
            <p className="text-muted-foreground">
              Our team will provide you with the necessary payment details (bank account number or mobile money PayBill/Till number) once the project quote is accepted.
            </p>
          </div>
           <div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Step 4: Confirm Your Payment</h3>
            <p className="text-muted-foreground">
              After making the deposit, please send us a confirmation (e.g., transaction receipt screenshot, M-Pesa confirmation message) via email or WhatsApp for quick verification.
            </p>
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/contact">
                <MessageSquare className="mr-2 h-5 w-5" /> Contact Us for Payment Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg fade-in" style={{animationDelay: '0.4s'}}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <FileText className="mr-2 h-6 w-6 text-primary" />
            Deposit Terms & Conditions
          </CardTitle>
          <CardDescription>Important information regarding your project deposit.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p><strong>Purpose:</strong> The deposit secures your project slot, allows us to procure initial materials, and commence preliminary project work.</p>
          <p><strong>Non-refundable Portion:</strong> A portion of the deposit may be non-refundable to cover administrative costs and materials already purchased if the project is cancelled by the client. This will be clearly outlined in your project agreement.</p>
          <p><strong>Payment Confirmation:</strong> Work on your project will typically commence after the deposit payment has been confirmed and reflected in our accounts.</p>
          <p><strong>Balance Payment:</strong> The remaining project balance will be due as per the milestones and payment schedule outlined in your project contract.</p>
          <p><strong>Refunds:</strong> In the unlikely event that Sterling Solutions Hub is unable to proceed with the project, a full refund of the deposit will be issued, unless otherwise specified for custom material orders.</p>
          <p>For detailed terms specific to your project, please refer to your signed project agreement or contact our support team.</p>
        </CardContent>
      </Card>
    </div>
  );
}
