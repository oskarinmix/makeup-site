import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Newsletter } from '@/components/marketing/Newsletter';
import { CategoriesShowcase } from '@/components/marketing/CategoriesShowcase';
import { BrandsShowcase } from '@/components/marketing/BrandsShowcase';
import { getProducts, getCategories } from '@/lib/airtable';
import { Sparkles, Heart, ShieldCheck, Truck, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950 dark:via-pink-950 dark:to-purple-950">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            {/* Announcement Badge */}
            <div className="animate-bounce">
              <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-4 py-2 text-sm">
                ✨ New Collection Just Dropped!
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Unleash Your
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Inner Glow ✨
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Premium makeup curated for the modern beauty enthusiast.
              Elevate your beauty routine with our exclusive collection 💄
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="text-lg h-14 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Link href="/products">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Shop Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg h-14 px-8 border-2">
                <Link href="#categories">
                  Browse Categories
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span>Verified Products</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free Shipping Over $50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-20 fill-background">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="container mx-auto px-4 py-16 md:py-24">
        <CategoriesShowcase categories={categories} />
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Featured Products 💖
                </h2>
                <p className="text-muted-foreground text-lg">
                  Handpicked favorites from our collection
                </p>
              </div>
              <Button variant="link" asChild className="text-lg">
                <Link href="/products">
                  View All →
                </Link>
              </Button>
            </div>

            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}

      {/* Brands Section */}
      {uniqueBrands.length > 0 && (
        <section className="container mx-auto px-4 py-16 md:py-24">
          <BrandsShowcase brands={uniqueBrands} />
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Why Choose GlamStore? 💎
            </h2>
            <p className="text-muted-foreground text-lg">
              Your beauty, our passion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group text-center p-8 rounded-2xl bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Carefully curated products from trusted brands that deliver results
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Expert Selection</h3>
              <p className="text-muted-foreground">
                Products chosen by makeup professionals who know beauty inside out
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Customer Care</h3>
              <p className="text-muted-foreground">
                Dedicated support for all your beauty needs, every step of the way
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Newsletter />
      </section>

      {/* Final CTA Banner */}
      <section className="bg-gradient-to-r from-primary via-accent to-primary py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Glow? ✨
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your beauty journey today with exclusive offers
          </p>
          <Button size="lg" variant="secondary" asChild className="h-14 px-8 text-lg">
            <Link href="/products">
              Explore All Products
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
