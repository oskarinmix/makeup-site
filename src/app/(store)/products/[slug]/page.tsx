import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/airtable';
import { formatPrice } from '@/lib/utils';
import { StockBadge } from '@/components/products/StockBadge';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const imageUrl = product.Images?.[0]?.url || '/placeholder-product.svg';
  const hasDiscount =
    product['Compare At Price'] && product['Compare At Price'] > product.Price;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary">
            <Image
              src={imageUrl}
              alt={product.Name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {hasDiscount && (
              <Badge className="absolute top-4 right-4 bg-accent text-lg px-4 py-2">
                Sale
              </Badge>
            )}
          </div>

          {product.Images && product.Images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.Images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-md overflow-hidden bg-secondary cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <Image
                    src={image.url}
                    alt={`${product.Name} ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {product.Brand && (
            <p className="text-muted-foreground font-medium">{product.Brand}</p>
          )}

          <div>
            <h1 className="text-4xl font-bold mb-2">{product.Name}</h1>
            {product['Short Description'] && (
              <p className="text-lg text-muted-foreground">
                {product['Short Description']}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.Price)}
            </span>
            {hasDiscount && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product['Compare At Price']!)}
              </span>
            )}
          </div>

          <StockBadge
            status={product['Stock Status']}
            stockQuantity={product['Stock Quantity']}
            lowStockThreshold={product['Low Stock Threshold']}
          />

          <Separator />

          {product.Description && (
            <div>
              <h2 className="font-semibold text-lg mb-2">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {product.Description}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {product['Shade/Color'] && (
              <div className="flex justify-between">
                <span className="font-medium">Shade/Color:</span>
                <span className="text-muted-foreground">{product['Shade/Color']}</span>
              </div>
            )}
            {product.Weight && (
              <div className="flex justify-between">
                <span className="font-medium">Size:</span>
                <span className="text-muted-foreground">{product.Weight}</span>
              </div>
            )}
            {product.SKU && (
              <div className="flex justify-between">
                <span className="font-medium">SKU:</span>
                <span className="text-muted-foreground">{product.SKU}</span>
              </div>
            )}
          </div>

          <Separator />

          <AddToCartButton
            product={product}
            disabled={
              product['Stock Status'] === 'out-of-stock' ||
              product['Stock Quantity'] === 0
            }
            className="w-full"
          />

          {product.Ingredients && (
            <div>
              <h2 className="font-semibold text-lg mb-2">Ingredients</h2>
              <p className="text-sm text-muted-foreground">{product.Ingredients}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
