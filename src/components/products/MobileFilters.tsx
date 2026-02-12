'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ProductFilters } from './ProductFilters';
import { useTranslation } from '@/i18n';
import { SlidersHorizontal } from 'lucide-react';

interface MobileFiltersProps {
  categories: Array<{ id: string; Name: string; Slug: string }>;
  brands: string[];
}

export function MobileFilters({ categories, brands }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {t('mobileFilters.filters')}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t('mobileFilters.filterProducts')}</SheetTitle>
          <SheetDescription>
            {t('mobileFilters.refineSearch')}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <ProductFilters categories={categories} brands={brands} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
