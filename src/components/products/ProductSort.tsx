'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/i18n';

export function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'name';
  const { t } = useTranslation();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t('products.sortBy')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name">{t('products.nameAZ')}</SelectItem>
        <SelectItem value="name-desc">{t('products.nameZA')}</SelectItem>
        <SelectItem value="price-low">{t('products.priceLowHigh')}</SelectItem>
        <SelectItem value="price-high">{t('products.priceHighLow')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
