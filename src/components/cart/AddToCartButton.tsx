'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/types/product';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  disabled?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  quantity = 1,
  disabled = false,
  className,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      addItem(product, quantity);

      toast({
        title: 'Added to cart',
        description: `${product.Name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setTimeout(() => setIsAdding(false), 500);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      className={className}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
}
