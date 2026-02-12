export interface Category {
  id: string;
  Name: string;
  Slug: string;
  Description?: string;
  Image?: Array<{ url: string; filename: string }>;
  'Display Order': number;
  Active?: boolean;
  'Product Count'?: number;
  'Created At'?: string;
}
