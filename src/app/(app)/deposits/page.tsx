
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DollarSign, ShieldCheck, Banknote, Smartphone, FileText, MessageSquare, CreditCard, ExternalLink } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Deposits | Sterling Contractors',
  description: 'Securely make your project deposit with Sterling Contractors. We offer various convenient payment methods including Mobile Money and Bank Transfers.',
};

const paymentMethods = [
  {
    name: "Mobile Money",
    icon: Smartphone,
    details: "Fast and convenient payments using your mobile phone. We accept:",
    options: [
      { name: "MTN Mobile Money", note: "Contact us for our registered MTN MoMo number." },
      { name: "Airtel Money", note: "Contact us for our registered Airtel Money number." },
      { name: "M-Pesa (Kenya/International)", note: "Available for cross-border payments. Contact us for details."}
    ],
    actionText: "Get Mobile Money Details",
  },
  {
    name: "Direct Bank Transfer (EFT)",
    icon: Banknote,
    details: "Securely transfer funds directly to our company bank account. Suitable for larger amounts.",
    options: [
        { name: "Sterling Contractors Bank Account", note: "We will provide our corporate bank account details (Account Name, Number, Bank, Branch, SWIFT Code if international) upon project agreement."}
    ],
    actionText: "Get Bank Account Details",
  },
  {
    name: "Card Payments (Coming Soon)",
    icon: CreditCard,
    details: "We are working on integrating secure online card payments (Visa, Mastercard) for your convenience.",
    options: [
      { name: "Online Payment Portal", note: "This feature will be available soon. Please check back or use alternative methods for now."}
    ],
    actionText: "Learn More (Coming Soon)",
    disabled: true,
  }
];


export default function DepositsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center justify-center">
          <DollarSign className="h-10 w-10 mr-3 text-primary" />
          Secure Your Project with a Deposit
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Initiate your project with Sterling Contractors by making a secure deposit. We offer a range of convenient payment options tailored for our clients in Uganda and internationally.
        </p>
      </section>

      <Card className="shadow-lg fade-in hover:shadow-xl transition-shadow" style={{animationDelay: '0.2s'}}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <ShieldCheck className="mr-2 h-6 w-6 text-primary" />
            How to Make Your Deposit
          </CardTitle>
          <CardDescription>Follow these simple steps to make your project deposit smoothly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="font-semibold text-xl text-foreground mb-2">Step 1: Determine Your Deposit Amount</h3>
            <p className="text-muted-foreground">
              Your project deposit amount will be clearly specified in your formal project quotation or contract. 
              For a preliminary estimate, you can use our <Link href="/deposit-estimator" className="text-primary hover:underline">AI Deposit Estimator</Link>.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl text-foreground mb-4">Step 2: Choose Your Preferred Payment Method</h3>
            <div className="space-y-6">
              {paymentMethods.map((method) => (
                <Card key={method.name} className="bg-secondary/50 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <method.icon className="h-6 w-6 mr-3 text-accent" />
                      {method.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{method.details}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
                      {method.options.map(option => <li key={option.name}><strong>{option.name}:</strong> {option.note}</li>)}
                    </ul>
                  </CardContent>
                  <CardFooter>
                     <Button asChild disabled={method.disabled} className={method.disabled ? "" : "bg-primary hover:bg-primary/80"}>
                        <Link href="/contact">
                           <MessageSquare className="mr-2 h-4 w-4" /> {method.actionText}
                        </Link>
                     </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-foreground mb-2">Step 3: Request Payment Details & Make Payment</h3>
            <p className="text-muted-foreground">
              Once you've accepted the project quote and chosen your payment method, <Link href="/contact" className="text-primary hover:underline">contact our team</Link>. 
              We will provide you with the specific payment details (e.g., Mobile Money number, bank account details). Follow the instructions provided to complete your payment.
            </p>
          </div>

           <div>
            <h3 className="font-semibold text-xl text-foreground mb-2">Step 4: Confirm Your Payment</h3>
            <p className="text-muted-foreground">
              After making the deposit, please send us proof of payment for verification. This could be a screenshot of the transaction receipt, an M-Pesa/Mobile Money confirmation message, or a bank transfer confirmation slip.
              You can send this to our official email address or WhatsApp number (provided during communication).
            </p>
          </div>
          
          <div className="text-center mt-10">
             <p className="text-muted-foreground mb-4">Ready to proceed or have questions?</p>
            <Button asChild size="lg">
              <Link href="/contact">
                <MessageSquare className="mr-2 h-5 w-5" /> Contact Us for Assistance
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg fade-in hover:shadow-xl transition-shadow" style={{animationDelay: '0.4s'}}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <FileText className="mr-2 h-6 w-6 text-primary" />
            Important Deposit Information
          </CardTitle>
          <CardDescription>Key terms and conditions regarding your project deposit.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p><strong>Purpose of Deposit:</strong> The initial deposit secures your project slot in our schedule, enables us to procure necessary starting materials, cover mobilization costs, and commence preliminary project work (e.g., site setup, detailed planning).</p>
          <p><strong>Non-refundable Portion:</strong> A portion of the deposit may be non-refundable to cover administrative costs, design work (if applicable), and specific materials ordered exclusively for your project, especially if the project is cancelled by the client after these costs have been incurred. This will be clearly outlined in your project agreement.</p>
          <p><strong>Payment Confirmation & Project Start:</strong> Work on your project will typically commence after the deposit payment has been confirmed and has reflected in our accounts. We strive to verify payments promptly.</p>
          <p><strong>Balance Payments:</strong> The remaining project balance will be due according to the milestones and payment schedule detailed in your signed project contract. We often structure payments to align with project phases.</p>
          <p><strong>Refunds:</strong> In the unlikely event that Sterling Contractors is unable to proceed with the project after a deposit has been made (due to unforeseen circumstances on our part), a full refund of the received deposit will be issued promptly, unless specific terms for custom material orders state otherwise (which would be pre-agreed).</p>
          <p><strong>Transparency:</strong> We are committed to transparency. Your project contract will clearly outline all financial terms, including deposit usage. We encourage open communication regarding any financial aspects of your project.</p>
          <p className="mt-4">For detailed terms and conditions specific to your project, please refer to your signed project agreement. If you have any questions, do not hesitate to <Link href="/contact" className="text-primary hover:underline">contact our support team</Link>.</p>
        </CardContent>
      </Card>
    </div>
  );
}
