import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProducts, getAllOrders } from '@/lib/airtable';
import { Package, ShoppingBag, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

export default async function AdminDashboard() {
  const [products, orders] = await Promise.all([
    getProducts(),
    getAllOrders(),
  ]);

  const activeProducts = products.filter((p) => p.Active);
  const lowStockProducts = products.filter(
    (p) => p['Stock Quantity'] <= (p['Low Stock Threshold'] || 10)
  );

  const pendingOrders = orders.filter((o) => o['Payment Status'] === 'Pending Review');
  const totalRevenue = orders.reduce((sum, o) => sum + (o['Total Amount'] || 0), 0);

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      description: `${activeProducts.length} active`,
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Total Orders',
      value: orders.length,
      description: `${pendingOrders.length} pending review`,
      icon: ShoppingBag,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      description: 'All time',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      title: 'Low Stock Items',
      value: lowStockProducts.length,
      description: 'Need restocking',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your GlamStore admin panel ✨
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Manage Products
            </CardTitle>
            <CardDescription>
              Update inventory, prices, and product availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/products">
                Go to Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Manage Orders
            </CardTitle>
            <CardDescription>
              Review payments and update order status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/orders">
                Go to Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="border-2 border-orange-200 bg-orange-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <TrendingUp className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
            <CardDescription className="text-orange-700">
              {lowStockProducts.length} products need restocking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockProducts.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center p-3 bg-background rounded-lg"
                >
                  <div>
                    <p className="font-medium">{product.Name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {product['Stock Quantity']} units
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/products">Update</Link>
                  </Button>
                </div>
              ))}
            </div>
            {lowStockProducts.length > 5 && (
              <Button variant="link" asChild className="w-full mt-4">
                <Link href="/admin/products">
                  View all {lowStockProducts.length} low stock items
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
