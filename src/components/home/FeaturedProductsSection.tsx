'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useTranslation } from '@/i18n';
import type { Product } from '@/types/product';

interface FeaturedProductsSectionProps {
  products: Product[];
}

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const { t } = useTranslation();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('home.featuredProducts')} 💖
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('home.handpickedFavorites')}
            </p>
          </div>
          <Button variant="link" asChild className="text-lg">
            <Link href="/products">
              {t('home.viewAll')} →
            </Link>
          </Button>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
