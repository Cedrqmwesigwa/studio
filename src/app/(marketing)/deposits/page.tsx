
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DollarSign, ShieldCheck, Banknote, Smartphone, FileText, MessageSquare, CreditCard, Send, AlertCircle } from "lucide-react";
import type { Metadata } from 'next';
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: 'Project Deposits | Sterling Contractors',
  description: 'Securely make your project deposit with Sterling Contractors. We offer various convenient payment methods including Mobile Money and Bank Transfers, after a formal project agreement.',
};

const paymentMethods = [
  {
    name: "Airtel Money Pay",
    icon: Smartphone,
    details: "Use Airtel Money Pay for fast and convenient payments. This is our preferred mobile money method.",
    options: [
      { name: "Airtel Money Pay Merchant Code", value: "6772374", note: "Enter this merchant code in your Airtel Money app under 'Pay Bill' or 'Lipa na Airtel Money'." },
    ],
    actionText: "Confirm Payment Details",
  },
  {
    name: "Direct Bank Transfer (EFT/RTGS)",
    icon: Banknote,
    details: "Securely transfer funds directly to our company bank account. Suitable for larger amounts.",
    options: [
        { name: "Bank Name", value: "Equity Bank", note: "" },
        { name: "Account Number", value: "1000103443030", note: "Please use this account number for your transfer." },
        { name: "Account Name", value: "Sterling Contractors (or as advised)", note: "Confirm exact account name with us." },
        { name: "Branch & SWIFT Code", value: "Provided upon request", note: "Full details including branch and SWIFT code for international transfers will be provided in your formal project agreement or upon request."}
    ],
    actionText: "Request Full Bank Details",
  },
   {
    name: "Other Mobile Money (MTN)",
    icon: Smartphone,
    details: "We also accept MTN Mobile Money.",
    options: [
      { name: "MTN Mobile Money Number", value: "To be provided", note: "Our registered MTN MoMo number will be provided upon project agreement if you prefer this method." },
    ],
    actionText: "Request MTN Details",
  },
  {
    name: "Card Payments (Coming Soon)",
    icon: CreditCard,
    details: "We are working on integrating secure online card payments (Visa, Mastercard) for your convenience. This will be available after project confirmation.",
    options: [
      { name: "Online Payment Portal", value: "", note: "This feature will be available soon. Please check back or use alternative methods for now."}
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
          Securing Your Project with a Deposit
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Once your project scope is defined and you've received a formal quotation from Sterling Contractors, a deposit will be required to initiate work. This page outlines the payment methods available.
          We are actively working on integrating direct online payment facilities for card payments.
        </p>
         <Button asChild size="lg" className="mt-6">
            <Link href="/book-project">
                <Send className="mr-2 h-5 w-5" /> Get a Formal Quote First
            </Link>
        </Button>
      </section>

      <Card className="shadow-lg fade-in hover:shadow-xl transition-shadow" style={{animationDelay: '0.2s'}}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <ShieldCheck className="mr-2 h-6 w-6 text-primary" />
            How to Make Your Deposit (After Project Agreement)
          </CardTitle>
          <CardDescription>Follow these simple steps once you've received and accepted your project quote.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="font-semibold text-xl text-foreground mb-2">Step 1: Receive & Accept Your Formal Quotation</h3>
            <p className="text-muted-foreground">
              Your project deposit amount, payment schedule, and our official payment details will be clearly specified in your formal project quotation or contract prepared by our team. 
              If you haven't received a quote yet, please <Link href="/book-project" className="text-primary hover:underline">book a project consultation</Link> or <Link href="/contact" className="text-primary hover:underline">contact us</Link>. 
              For preliminary estimates, you can use our <Link href="/deposit-estimator" className="text-primary hover:underline">AI Deposit Estimator</Link>.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl text-foreground mb-4">Step 2: Choose Your Preferred Payment Method & Confirm Details</h3>
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
                    <ul className="list-none space-y-2 text-sm text-muted-foreground pl-0">
                      {method.options.map(option => (
                        <li key={option.name} className="p-2 bg-background/50 rounded-md">
                            <span className="font-medium text-foreground">{option.name}:</span> 
                            {option.value && <span className="font-semibold text-primary ml-1">{option.value}</span>}
                            {option.note && <p className="text-xs mt-0.5">{option.note}</p>}
                        </li>
                        ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                     <Button asChild variant="outline" disabled={method.disabled} className={method.disabled ? "" : "border-primary text-primary hover:bg-primary/10"}>
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
            <h3 className="font-semibold text-xl text-foreground mb-2">Step 3: Make Payment Using Official Details</h3>
            <p className="text-muted-foreground">
              After accepting the project quote and confirming the payment method with us, use the **official details provided in your contract or direct communication from Sterling Contractors** to complete your payment. 
              Do not rely solely on website information for final payment details without direct confirmation.
            </p>
          </div>

           <div>
            <h3 className="font-semibold text-xl text-foreground mb-2">Step 4: Confirm Your Payment</h3>
            <p className="text-muted-foreground">
              After making the deposit, please send us proof of payment for verification. This could be a screenshot of the transaction receipt, an M-Pesa/Mobile Money confirmation message, or a bank transfer confirmation slip.
              You can send this to our official email address ({siteConfig.support.email}) or WhatsApp number ({siteConfig.support.phone}) as provided during communication.
            </p>
          </div>
          
          <Card className="border-yellow-500 bg-yellow-500/10 mt-6">
            <CardHeader className="flex-row items-center space-x-3 pb-3">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
                <CardTitle className="text-yellow-700 text-lg">Important Security Note</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-yellow-700">
                    Always verify payment details directly with Sterling Contractors through official communication channels (e.g., signed contract, official email from @sterlingcontractors.org domain if applicable, or verified phone numbers) before making any payments. Do not make payments based solely on details found online without prior official confirmation.
                </p>
            </CardContent>
          </Card>
          
          <div className="text-center mt-10">
             <p className="text-muted-foreground mb-4">Have questions about your quote or the deposit process?</p>
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
            Deposit Information & Terms
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

    