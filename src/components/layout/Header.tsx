'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import { CartDrawer } from './CartDrawer';
import { useState } from 'react';

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GlamStore
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Categories
          </Link>
          <Link
            href="/track-order"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <Package className="h-4 w-4" />
            Track Order
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/products">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {totalItems}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
