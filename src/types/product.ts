export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Product {
  id: string;
  Name: string;
  Slug: string;
  Description?: string;
  'Short Description'?: string;
  Category?: string[];
  Price: number;
  'Compare At Price'?: number;
  SKU: string;
  Images?: Array<{ url: string; filename: string }>;
  'Stock Quantity': number;
  'Low Stock Threshold'?: number;
  'Stock Status': StockStatus;
  Brand?: string;
  'Shade/Color'?: string;
  Weight?: string;
  Ingredients?: string;
  Featured?: boolean;
  Active?: boolean;
  'Created At': string;
  'Updated At': string;
}
