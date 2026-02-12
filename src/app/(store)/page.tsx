import { Newsletter } from '@/components/marketing/Newsletter';
import { CategoriesShowcase } from '@/components/marketing/CategoriesShowcase';
import { BrandsShowcase } from '@/components/marketing/BrandsShowcase';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { FinalCtaSection } from '@/components/home/FinalCtaSection';
import { getProducts, getCategories } from '@/lib/airtable';

export default async function HomePage() {
  const [featuredProducts, categories, allProducts] = await Promise.all([
    getProducts({
      filterByFormula: 'AND({Active}=TRUE(), {Featured}=TRUE())',
      maxRecords: 6,
    }),
    getCategories(),
    getProducts(),
  ]);

  // Get unique brands
  const uniqueBrands = Array.from(
    new Set(
      allProducts
        .map((p) => p.Brand)
        .filter((brand): brand is string => Boolean(brand))
    )
  ).sort();

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroSection />

      {/* Categories Section */}
      <section id="categories" className="container mx-auto px-4 py-16 md:py-24">
        <CategoriesShowcase categories={categories} />
      </section>

      {/* Featured Products Section */}
      <FeaturedProductsSection products={featuredProducts} />

      {/* Brands Section */}
      {uniqueBrands.length > 0 && (
        <section className="container mx-auto px-4 py-16 md:py-24">
          <BrandsShowcase brands={uniqueBrands} />
        </section>
      )}

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Newsletter />
      </section>

      {/* Final CTA Banner */}
      <FinalCtaSection />
    </div>
  );
}
