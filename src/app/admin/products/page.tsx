'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Package, Save, X, Edit2, Check, Search, Filter } from 'lucide-react';

interface Product {
  id: string;
  Name: string;
  SKU: string;
  Price: number;
  'Stock Quantity': number;
  'Low Stock Threshold': number;
  Active: boolean;
  Brand?: string;
  Category?: string[];
}

interface Category {
  id: string;
  Name: string;
}

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Product>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showLowStock, setShowLowStock] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Apply filters whenever products or filter values change
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.Name.toLowerCase().includes(query) ||
          p.SKU.toLowerCase().includes(query) ||
          p.Brand?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => {
        if (!p.Category) return false;
        // Handle both string and array cases
        if (Array.isArray(p.Category)) {
          return p.Category.some((cat) => cat === selectedCategory);
        }
        return p.Category === selectedCategory;
      });
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter((p) => p.Brand === selectedBrand);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      const isActive = selectedStatus === 'active';
      filtered = filtered.filter((p) => p.Active === isActive);
    }

    // Low stock filter
    if (showLowStock) {
      filtered = filtered.filter(
        (p) => p['Stock Quantity'] <= p['Low Stock Threshold']
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedStatus, showLowStock]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/products');
      const productsData = await response.json();

      setProducts(productsData);

      // Extract unique categories from products
      const allCategories: string[] = [];
      productsData.forEach((p: Product) => {
        if (p.Category) {
          if (Array.isArray(p.Category)) {
            allCategories.push(...p.Category);
          } else {
            allCategories.push(p.Category as string);
          }
        }
      });
      const uniqueCategories = Array.from(new Set(allCategories))
        .sort()
        .map((name, index) => ({ id: `cat-${index}`, Name: name }));
      setCategories(uniqueCategories as Category[]);

      // Extract unique brands
      const uniqueBrands = Array.from(
        new Set(productsData.map((p: Product) => p.Brand).filter(Boolean))
      ).sort() as string[];
      setBrands(uniqueBrands);
    } catch (error) {
      toast({
        title: '❌ Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedStatus('all');
    setShowLowStock(false);
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditValues({
      Price: product.Price,
      'Stock Quantity': product['Stock Quantity'],
      'Low Stock Threshold': product['Low Stock Threshold'],
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveChanges = async (productId: string) => {
    setSavingId(productId);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editValues),
      });

      if (!response.ok) throw new Error('Failed to update');

      const { product } = await response.json();

      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, ...product } : p))
      );

      toast({
        title: '✅ Success',
        description: 'Product updated successfully',
      });

      setEditingId(null);
      setEditValues({});
    } catch (error) {
      toast({
        title: '❌ Error',
        description: 'Failed to update product',
        variant: 'destructive',
      });
    } finally {
      setSavingId(null);
    }
  };

  const toggleActive = async (productId: string, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Active: !currentActive }),
      });

      if (!response.ok) throw new Error('Failed to update');

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, Active: !currentActive } : p
        )
      );

      toast({
        title: '✅ Success',
        description: `Product ${!currentActive ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      toast({
        title: '❌ Error',
        description: 'Failed to update product status',
        variant: 'destructive',
      });
    }
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    selectedStatus !== 'all' ||
    showLowStock;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Product Management</h1>
        <p className="text-muted-foreground">
          Manage inventory, prices, and product availability
        </p>
      </div>

      {/* Filters Section */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
          <CardDescription>
            Find and filter products quickly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div>
            <Label htmlFor="search">Search Products</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="search"
                placeholder="Search by name, SKU, or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.Name}>
                      {cat.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Brand Filter */}
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger id="brand" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger id="status" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Low Stock Toggle */}
            <div>
              <Label htmlFor="lowstock">Show Low Stock Only</Label>
              <div className="flex items-center gap-2 mt-2 h-10">
                <Switch
                  id="lowstock"
                  checked={showLowStock}
                  onCheckedChange={setShowLowStock}
                />
                <span className="text-sm text-muted-foreground">
                  {showLowStock ? 'On' : 'Off'}
                </span>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 pt-2">
              <Badge variant="secondary">
                Showing {filteredProducts.length} of {products.length} products
              </Badge>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Products ({filteredProducts.length})
          </CardTitle>
          <CardDescription>
            Click edit to update prices and stock levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Low Stock Alert</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                      No products found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => {
                    const isEditing = editingId === product.id;
                    const isSaving = savingId === product.id;
                    const isLowStock =
                      product['Stock Quantity'] <= product['Low Stock Threshold'];

                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          {product.Name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {product.SKU}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {product.Brand || '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          {isEditing ? (
                            <Input
                              type="number"
                              step="0.01"
                              value={editValues.Price || product.Price}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  Price: parseFloat(e.target.value),
                                })
                              }
                              className="w-24 text-right"
                            />
                          ) : (
                            formatPrice(product.Price)
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {isEditing ? (
                            <Input
                              type="number"
                              value={
                                editValues['Stock Quantity'] ??
                                product['Stock Quantity']
                              }
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  'Stock Quantity': parseInt(e.target.value),
                                })
                              }
                              className="w-20 text-right"
                            />
                          ) : (
                            <span
                              className={
                                isLowStock ? 'text-orange-600 font-semibold' : ''
                              }
                            >
                              {product['Stock Quantity']}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {isEditing ? (
                            <Input
                              type="number"
                              value={
                                editValues['Low Stock Threshold'] ??
                                product['Low Stock Threshold']
                              }
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  'Low Stock Threshold': parseInt(e.target.value),
                                })
                              }
                              className="w-20 text-right"
                            />
                          ) : (
                            product['Low Stock Threshold']
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Switch
                              checked={product.Active}
                              onCheckedChange={() =>
                                toggleActive(product.id, product.Active)
                              }
                              disabled={isEditing}
                            />
                            <Badge
                              variant={product.Active ? 'default' : 'secondary'}
                              className="min-w-[70px]"
                            >
                              {product.Active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {isEditing ? (
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() => saveChanges(product.id)}
                                disabled={isSaving}
                              >
                                {isSaving ? (
                                  'Saving...'
                                ) : (
                                  <>
                                    <Check className="h-4 w-4 mr-1" />
                                    Save
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={cancelEditing}
                                disabled={isSaving}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditing(product)}
                            >
                              <Edit2 className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
