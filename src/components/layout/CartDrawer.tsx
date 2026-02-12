'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button onClick={onClose} asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <CartSummary />

              <div className="space-y-2">
                <Button className="w-full" size="lg" asChild onClick={onClose}>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onClose}
                  asChild
                >
                  <Link href="/cart">View Full Cart</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
