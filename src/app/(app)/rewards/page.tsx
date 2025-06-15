
'use client';

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Gift, ShoppingCart, Tag, Zap, ShieldCheck, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const exampleRewards = [
  {
    id: 'discount-5',
    title: '5% Off Your Next Hardware Purchase',
    description: 'Get a 5% discount on any single hardware item from our shop.',
    cost: 500, // Coins needed
    icon: Tag,
    category: 'Discounts',
    imageUrl: 'https://placehold.co/600x400.png?text=5%25+Off',
    dataAiHint: 'discount tag',
  },
  {
    id: 'free-consultation',
    title: 'Free 30-Min Project Consultation',
    description: 'Discuss your next project with one of our experts for free.',
    cost: 1000,
    icon: Lightbulb,
    category: 'Services',
    imageUrl: 'https://placehold.co/600x400.png?text=Consultation',
    dataAiHint: 'expert consultation',
  },
  {
    id: 'priority-support',
    title: 'Priority Support Access',
    description: 'Get bumped to the front of the queue for support inquiries.',
    cost: 750,
    icon: Zap,
    category: 'Services',
    imageUrl: 'https://placehold.co/600x400.png?text=Priority',
    dataAiHint: 'customer support',
  },
  {
    id: 'sterling-merch',
    title: 'Exclusive Sterling Contractors T-Shirt',
    description: 'Show off your support with our branded merchandise.',
    cost: 1200,
    icon: Gift,
    category: 'Merchandise',
    imageUrl: 'https://placehold.co/600x400.png?text=T-Shirt',
    dataAiHint: 'branded t-shirt',
  },
];

export default function RewardsPage() {
  const { user } = useAuth();

  const handleClaimReward = (rewardId: string, cost: number) => {
    if (!user) {
      alert('Please sign in to claim rewards.');
      return;
    }
    if ((user.coins || 0) < cost) {
      alert('Not enough coins to claim this reward.');
      return;
    }
    // In a real app, this would trigger a backend process:
    // 1. Verify user has enough coins.
    // 2. Deduct coins from user's account.
    // 3. Grant the reward (e.g., generate a discount code, schedule consultation).
    // 4. Record the transaction.
    alert(`Claiming reward: ${rewardId}. This is a demo; no actual transaction will occur.`);
    // Potentially update user coins in context for immediate feedback.
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <section className="text-center fade-in">
        <div className="flex justify-center items-center mb-4">
          <Gift className="h-16 w-16 text-primary" />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Sterling Rewards
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Redeem your hard-earned Sterling Coins for exclusive discounts, services, and more! The more you engage, the more you earn.
        </p>
        {user && (
          <p className="mt-4 text-xl font-semibold text-accent">
            Your Coins: <Coins className="inline-block h-5 w-5 mr-1" />{user.coins || 0}
          </p>
        )}
      </section>

      <section className="fade-in" style={{animationDelay: '0.2s'}}>
        <h2 className="font-headline text-3xl font-bold mb-6 text-center">Available Rewards</h2>
        {exampleRewards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exampleRewards.map((reward, index) => (
              <Card key={reward.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out fade-in group" style={{animationDelay: `${index * 0.1 + 0.3}s`}}>
                <div className="aspect-video relative bg-muted">
                  <Image
                    src={reward.imageUrl}
                    alt={reward.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={reward.dataAiHint}
                  />
                   <Badge variant="secondary" className="absolute top-2 left-2 bg-accent text-accent-foreground">{reward.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center">
                    <reward.icon className="mr-2 h-5 w-5 text-primary" />
                    {reward.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{reward.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex-col items-stretch space-y-2">
                  <p className="text-lg font-semibold text-primary mb-2 text-center">
                    Cost: <Coins className="inline-block h-5 w-5 mr-1" />{reward.cost}
                  </p>
                  <Button 
                    className="w-full" 
                    onClick={() => handleClaimReward(reward.id, reward.cost)}
                    disabled={!user || (user.coins || 0) < reward.cost}
                  >
                    Claim Reward
                  </Button>
                  {user && (user.coins || 0) < reward.cost && (
                     <p className="text-xs text-destructive text-center">Not enough coins</p>
                  )}
                   {!user && (
                     <p className="text-xs text-muted-foreground text-center">Sign in to claim</p>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No rewards available at the moment. Check back soon!
          </p>
        )}
      </section>
      
      <Card className="bg-secondary/30 border-primary/20 fade-in" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
                <ShieldCheck className="mr-2 h-6 w-6 text-primary"/>
                How It Works
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>1. Engage with our platform - browse products, read blog posts, complete projects with us (future).</p>
            <p>2. Earn Sterling Coins <Coins className="inline-block h-4 w-4 mx-0.5"/> for your activity and loyalty.</p>
            <p>3. Check your coin balance on your <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link>.</p>
            <p>4. Visit this Rewards page to redeem your coins for exciting benefits!</p>
            <p>5. More ways to earn and more rewards are coming soon!</p>
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground">Reward availability and coin costs are subject to change. Terms and conditions apply.</p>
        </CardFooter>
      </Card>

    </div>
  );
}
