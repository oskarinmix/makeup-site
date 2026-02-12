import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { MobileFilters } from '@/components/products/MobileFilters';
import { ProductSort } from '@/components/products/ProductSort';
import { ProductsPageHeader } from '@/components/products/ProductsPageHeader';
import { ProductsPageInfo } from '@/components/products/ProductsPageInfo';
import { FiltersHeading } from '@/components/products/FiltersHeading';
import { getProducts, getCategories } from '@/lib/airtable';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  // Build filter formula based on active filters
  const conditions: string[] = ['{Active}=TRUE()'];

  if (params.category) {
    conditions.push(`FIND('${params.category}', ARRAYJOIN({Category}))`);
  }

  if (params.brand) {
    conditions.push(`{Brand}='${params.brand}'`);
  }

  if (params.search) {
    const searchTerm = params.search.replace(/'/g, "\\'");
    conditions.push(`OR(
      FIND(LOWER('${searchTerm}'), LOWER({Name})),
      FIND(LOWER('${searchTerm}'), LOWER({Description})),
      FIND(LOWER('${searchTerm}'), LOWER({Brand}))
    )`);
  }

  const filterFormula = `AND(${conditions.join(', ')})`;

  const sortOptions: Record<string, Array<{ field: string; direction: 'asc' | 'desc' }>> = {
    name: [{ field: 'Name', direction: 'asc' }],
    'name-desc': [{ field: 'Name', direction: 'desc' }],
    'price-low': [{ field: 'Price', direction: 'asc' }],
    'price-high': [{ field: 'Price', direction: 'desc' }],
  };

  const sort = sortOptions[params.sort || 'name'];

  // Fetch data
  const [products, categories] = await Promise.all([
    getProducts({ filterByFormula: filterFormula, sort }),
    getCategories(),
  ]);

  // Get unique brands from all products
  const allProducts = await getProducts();
  const uniqueBrands = Array.from(
    new Set(
      allProducts
        .map((p) => p.Brand)
        .filter((brand): brand is string => Boolean(brand))
    )
  ).sort();

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductsPageHeader />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Desktop Only */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="sticky top-4 p-6 bg-secondary/30 rounded-lg border">
            <FiltersHeading />
            <ProductFilters categories={categories} brands={uniqueBrands} />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <MobileFilters categories={categories} brands={uniqueBrands} />
              <ProductsPageInfo count={products.length} />
            </div>

            <div className="flex gap-4 items-center">
              <ProductSort />
            </div>
          </div>

          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
