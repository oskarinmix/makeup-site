'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/i18n';

interface OrderSummaryProps {
  selectedShippingMethod?: any;
}

export function OrderSummary({ selectedShippingMethod }: OrderSummaryProps) {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const { t } = useTranslation();

  // Calculate shipping cost
  let shippingCost = 0;
  let shippingDisplay = t('checkout.selectShippingMethod');

  if (selectedShippingMethod) {
    const cost = selectedShippingMethod.Cost || 0;
    const freeThreshold = selectedShippingMethod['Free Shipping Threshold'] || null;
    const isFree = freeThreshold && subtotal >= freeThreshold;

    shippingCost = isFree ? 0 : cost;
    shippingDisplay = isFree
      ? t('checkout.free')
      : formatPrice(shippingCost);
  }

  const totalPrice = subtotal + shippingCost;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('checkout.orderSummary')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
                <Image
                  src={item.image || '/placeholder-product.png'}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                <p className="text-sm text-muted-foreground">{t('cart.qty')} {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t('cart.subtotal')} ({totalItems} {t('cart.items')})
            </span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('checkout.shipping')}</span>
            <span className="font-medium">
              {selectedShippingMethod ? (
                <span className={shippingCost === 0 && selectedShippingMethod ? 'text-green-600 font-semibold' : ''}>
                  {shippingDisplay}
                </span>
              ) : (
                shippingDisplay
              )}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>{t('cart.total')}</span>
          <span className="text-primary">{formatPrice(totalPrice)}</span>
        </div>

        <p className="text-xs text-muted-foreground">
          {t('checkout.paymentVerificationNote')}
        </p>
      </CardContent>
    </Card>
  );
}
