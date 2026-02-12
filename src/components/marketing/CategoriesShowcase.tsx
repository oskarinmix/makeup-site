import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { Category } from '@/types/category';

interface CategoriesShowcaseProps {
  categories: Category[];
}

const categoryEmojis: Record<string, string> = {
  Lipsticks: '💄',
  Eyeshadow: '👁️',
  Foundation: '✨',
  Blush: '🌸',
  Mascara: '👀',
};

const categoryColors: Record<string, string> = {
  Lipsticks: 'from-rose-100 to-pink-100',
  Eyeshadow: 'from-purple-100 to-indigo-100',
  Foundation: 'from-amber-100 to-orange-100',
  Blush: 'from-pink-100 to-rose-100',
  Mascara: 'from-slate-100 to-gray-100',
};

export function CategoriesShowcase({ categories }: CategoriesShowcaseProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Shop by Category 🛍️
        </h2>
        <p className="text-muted-foreground text-lg">
          Explore our curated collection of premium beauty products
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.Name}`}
            className="group"
          >
            <Card className="relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  categoryColors[category.Name] || 'from-gray-100 to-gray-200'
                } opacity-50 group-hover:opacity-70 transition-opacity`}
              />
              <div className="relative p-6 flex flex-col items-center justify-center min-h-[160px]">
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">
                  {categoryEmojis[category.Name] || '🎨'}
                </div>
                <h3 className="font-semibold text-center text-lg group-hover:text-primary transition-colors">
                  {category.Name}
                </h3>
                <p className="text-xs text-muted-foreground text-center mt-1 line-clamp-2">
                  {category.Description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
