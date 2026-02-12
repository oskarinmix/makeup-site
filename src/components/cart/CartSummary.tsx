'use client';

import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/i18n';

export function CartSummary() {
  const { getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{t('cart.subtotal')} ({totalItems} {t('cart.items')})</span>
        <span className="font-medium">{formatPrice(totalPrice)}</span>
      </div>
      <Separator />
      <div className="flex justify-between font-bold text-lg">
        <span>{t('cart.total')}</span>
        <span className="text-primary">{formatPrice(totalPrice)}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        {t('cart.shippingNote')}
      </p>
    </div>
  );
}
