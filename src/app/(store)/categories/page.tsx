import { getCategories } from '@/lib/airtable';
import { CategoriesPageContent } from '@/components/categories/CategoriesPageContent';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return <CategoriesPageContent categories={categories} />;
}
