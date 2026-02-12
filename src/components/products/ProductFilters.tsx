'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/i18n';

interface ProductFiltersProps {
  categories: Array<{ id: string; Name: string; Slug: string }>;
  brands: string[];
}

export function ProductFilters({ categories, brands }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const selectedCategory = searchParams.get('category') || '';
  const selectedBrand = searchParams.get('brand') || '';
  const selectedSort = searchParams.get('sort') || 'name';

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    router.push('/products');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters('search', searchQuery);
  };

  const hasActiveFilters = selectedCategory || selectedBrand || searchQuery;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium mb-2 block">
          {t('products.searchProducts')}
        </Label>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="search"
            type="text"
            placeholder={t('products.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                updateFilters('search', '');
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>

      <Separator />

      {/* Category Filters */}
      <div>
        <Label className="text-sm font-medium mb-3 block">{t('products.categoriesLabel')}</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                updateFilters(
                  'category',
                  selectedCategory === category.Name ? '' : category.Name
                )
              }
              className={`
                w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                ${
                  selectedCategory === category.Name
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {category.Name}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brand Filters */}
      <div>
        <Label className="text-sm font-medium mb-3 block">{t('products.brandsLabel')}</Label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() =>
                updateFilters('brand', selectedBrand === brand ? '' : brand)
              }
              className={`
                w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                ${
                  selectedBrand === brand
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            onClick={clearAllFilters}
            variant="outline"
            className="w-full"
          >
            {t('products.clearAllFilters')}
          </Button>
        </>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">
            {t('products.activeFilters')}
          </Label>
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                {t('products.search')} {searchQuery}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    updateFilters('search', '');
                  }}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <button
                  onClick={() => updateFilters('category', '')}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedBrand && (
              <Badge variant="secondary" className="gap-1">
                {selectedBrand}
                <button
                  onClick={() => updateFilters('brand', '')}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
