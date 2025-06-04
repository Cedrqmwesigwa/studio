import DepositEstimatorForm from '@/components/ai/deposit-estimator-form';

export default function DepositEstimatorPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="text-center mb-10 fade-in">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">AI Deposit Estimator</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Get an intelligent estimate for your project deposit. This tool uses AI to analyze your project details and provide a reasonable deposit range.
        </p>
      </section>
      <DepositEstimatorForm />
    </div>
  );
}
