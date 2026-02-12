'use client';

import { useTranslation } from '@/i18n';
import { Badge } from '@/components/ui/badge';

export function SaleBadge() {
  const { t } = useTranslation();
  return (
    <Badge className="absolute top-4 right-4 bg-accent text-lg px-4 py-2">
      {t('products.sale')}
    </Badge>
  );
}

export function DescriptionHeading() {
  const { t } = useTranslation();
  return <h2 className="font-semibold text-lg mb-2">{t('products.description')}</h2>;
}

export function IngredientsHeading() {
  const { t } = useTranslation();
  return <h2 className="font-semibold text-lg mb-2">{t('products.ingredients')}</h2>;
}

export function ShadeColorLabel() {
  const { t } = useTranslation();
  return <span className="font-medium">{t('products.shadeColor')}</span>;
}

export function SizeLabel() {
  const { t } = useTranslation();
  return <span className="font-medium">{t('products.size')}</span>;
}

export function SkuLabel() {
  const { t } = useTranslation();
  return <span className="font-medium">{t('products.sku')}</span>;
}
