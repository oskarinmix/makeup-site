import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SuccessPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const orderId = params.order;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-6">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
              <p className="text-muted-foreground">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
            </div>

            {orderId && (
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono font-semibold">{orderId}</p>
              </div>
            )}

            <div className="space-y-4 pt-6">
              <p className="text-sm text-muted-foreground">
                Your payment will be verified manually. We'll contact you at the email
                address you provided with payment instructions and order confirmation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
