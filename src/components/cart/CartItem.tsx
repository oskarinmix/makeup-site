'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrement = () => {
    if (item.quantity < item.stockQuantity) {
      updateQuantity(item.productId, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    updateQuantity(item.productId, item.quantity - 1);
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      <Link
        href={`/products/${item.slug}`}
        className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-secondary"
      >
        <Image
          src={item.image || '/placeholder-product.png'}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${item.slug}`}
            className="font-semibold hover:text-primary transition-colors"
          >
            {item.name}
          </Link>
          <p className="text-sm text-primary font-bold mt-1">
            {formatPrice(item.price)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncrement}
              disabled={item.quantity >= item.stockQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.productId)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
