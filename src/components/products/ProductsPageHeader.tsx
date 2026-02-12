'use client';

import { useTranslation } from '@/i18n';

export function ProductsPageHeader() {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-foreground mb-4">{t('products.title')}</h1>
      <p className="text-muted-foreground">
        {t('products.subtitle')}
      </p>
    </div>
  );
}
