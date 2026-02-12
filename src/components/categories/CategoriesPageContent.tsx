'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n';
import type { Category } from '@/types/category';

interface CategoriesPageContentProps {
  categories: Category[];
}

const categoryEmojis: Record<string, string> = {
  Lipsticks: '💄',
  Eyeshadow: '👁️',
  Foundation: '✨',
  Blush: '🌸',
  Mascara: '👀',
};

const categoryColors: Record<string, string> = {
  Lipsticks: 'from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30',
  Eyeshadow: 'from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30',
  Foundation: 'from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30',
  Blush: 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30',
  Mascara: 'from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30',
};

export function CategoriesPageContent({ categories }: CategoriesPageContentProps) {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('categories.title')} 🛍️
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('categories.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.Name}`}
            className="group"
          >
            <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl h-full">
              <div className="relative">
                {category.Image?.[0]?.url ? (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={category.Image[0].url}
                      alt={category.Name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {categoryEmojis[category.Name] || '🎨'} {category.Name}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`relative aspect-[16/9] bg-gradient-to-br ${
                      categoryColors[category.Name] || 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl transform group-hover:scale-110 transition-transform">
                        {categoryEmojis[category.Name] || '🎨'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl font-bold text-foreground">
                        {category.Name}
                      </h2>
                    </div>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                {category.Description && (
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {category.Description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  {category['Product Count'] !== undefined && (
                    <span className="text-sm text-muted-foreground">
                      {category['Product Count']} {t('categories.productsCount')}
                    </span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    {t('categories.viewProducts')} →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
