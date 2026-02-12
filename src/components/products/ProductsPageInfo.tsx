'use client';

import { useTranslation } from '@/i18n';

interface ProductsPageInfoProps {
  count: number;
}

export function ProductsPageInfo({ count }: ProductsPageInfoProps) {
  const { t } = useTranslation();

  return (
    <p className="text-sm text-muted-foreground">
      {count} {count === 1 ? t('products.productFound') : t('products.productsFound')}
    </p>
  );
}
