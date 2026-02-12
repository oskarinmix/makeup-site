import { Badge } from '@/components/ui/badge';
import type { StockStatus } from '@/types/product';

interface StockBadgeProps {
  status?: StockStatus;
  stockQuantity?: number;
  lowStockThreshold?: number;
  className?: string;
}

export function StockBadge({
  status,
  stockQuantity,
  lowStockThreshold = 10,
  className
}: StockBadgeProps) {
  // Calculate status if not provided or invalid
  let calculatedStatus: StockStatus;

  if (status && ['in-stock', 'low-stock', 'out-of-stock'].includes(status)) {
    calculatedStatus = status;
  } else if (stockQuantity !== undefined) {
    // Fallback: calculate from stock quantity
    if (stockQuantity === 0) {
      calculatedStatus = 'out-of-stock';
    } else if (stockQuantity <= lowStockThreshold) {
      calculatedStatus = 'low-stock';
    } else {
      calculatedStatus = 'in-stock';
    }
  } else {
    // Default fallback
    calculatedStatus = 'in-stock';
  }

  const variants = {
    'in-stock': {
      label: 'In Stock',
      className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    },
    'low-stock': {
      label: 'Low Stock',
      className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
    },
    'out-of-stock': {
      label: 'Out of Stock',
      className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    },
  };

  const { label, className: variantClassName } = variants[calculatedStatus];

  return (
    <Badge variant="outline" className={`${variantClassName} ${className || ''}`}>
      {label}
    </Badge>
  );
}
