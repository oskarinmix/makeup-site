'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCartStore } from '@/store/cartStore';
import { useTranslation } from '@/i18n';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold">{t('cart.empty')}</h1>
          <p className="text-muted-foreground">
            {t('cart.emptyMessage')}
          </p>
          <Button size="lg" asChild>
            <Link href="/products">{t('cart.startShopping')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{t('cart.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-6">
              <CartSummary />

              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">{t('cart.proceedToCheckout')}</Link>
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/products">{t('cart.continueShopping')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
