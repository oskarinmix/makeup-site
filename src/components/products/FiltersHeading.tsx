'use client';

import { useTranslation } from '@/i18n';

export function FiltersHeading() {
  const { t } = useTranslation();

  return <h2 className="font-semibold text-lg mb-4">{t('products.filters')}</h2>;
}
