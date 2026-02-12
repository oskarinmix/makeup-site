'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StockBadge } from './StockBadge';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { useTranslation } from '@/i18n';
import type { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.Images?.[0]?.url || '/placeholder-product.svg';
  const hasDiscount =
    product['Compare At Price'] && product['Compare At Price'] > product.Price;
  const { t } = useTranslation();

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${product.Slug}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={imageUrl}
            alt={product.Name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 right-2 bg-accent">{t('products.sale')}</Badge>
          )}
          {product.Featured && (
            <Badge className="absolute top-2 left-2 bg-primary">{t('products.featured')}</Badge>
          )}
        </div>
      </Link>

      <CardContent className="pt-4">
        <Link href={`/products/${product.Slug}`}>
          <div className="mb-2">
            {product.Brand && (
              <p className="text-sm text-muted-foreground mb-1">{product.Brand}</p>
            )}
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {product.Name}
            </h3>
          </div>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.Price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product['Compare At Price']!)}
            </span>
          )}
        </div>

        <StockBadge
          status={product['Stock Status']}
          stockQuantity={product['Stock Quantity']}
          lowStockThreshold={product['Low Stock Threshold']}
        />
      </CardContent>

      <CardFooter>
        <AddToCartButton
          product={product}
          disabled={
            product['Stock Status'] === 'out-of-stock' ||
            product['Stock Quantity'] === 0
          }
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}
