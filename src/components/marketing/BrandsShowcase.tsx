'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/i18n';

interface BrandsShowcaseProps {
  brands: string[];
}

export function BrandsShowcase({ brands }: BrandsShowcaseProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          {t('brands.featuredBrands')} ✨
        </h2>
        <p className="text-muted-foreground text-lg">
          {t('brands.discoverProducts')}
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient overlays for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling brands animation */}
        <div className="flex gap-4 animate-scroll">
          {[...brands, ...brands].map((brand, index) => (
            <Link
              key={`${brand}-${index}`}
              href={`/products?brand=${brand}`}
              className="group flex-shrink-0"
            >
              <div className="relative px-8 py-6 rounded-xl border-2 border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 min-w-[200px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <div className="relative">
                  <h3 className="text-xl font-bold text-center group-hover:text-primary transition-colors">
                    {brand}
                  </h3>
                  <Badge
                    variant="outline"
                    className="mt-2 mx-auto flex w-fit bg-background"
                  >
                    {t('brands.shopNow')}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Static grid for mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden gap-3 mt-8">
        {brands.map((brand) => (
          <Link
            key={brand}
            href={`/products?brand=${brand}`}
            className="group"
          >
            <div className="px-6 py-4 rounded-lg border-2 border-border bg-card hover:border-primary hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold text-center group-hover:text-primary transition-colors">
                {brand}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
