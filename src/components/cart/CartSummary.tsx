'use client';

import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export function CartSummary() {
  const { getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
        <span className="font-medium">{formatPrice(totalPrice)}</span>
      </div>
      <Separator />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span className="text-primary">{formatPrice(totalPrice)}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Shipping and taxes will be calculated at checkout.
      </p>
    </div>
  );
}
