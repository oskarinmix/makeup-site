'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<any>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckoutForm onShippingMethodChange={setSelectedShippingMethod} />
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="sticky top-20">
            <OrderSummary selectedShippingMethod={selectedShippingMethod} />
          </div>
        </div>
      </div>
    </div>
  );
}
