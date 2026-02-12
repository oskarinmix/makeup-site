'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, Search, CheckCircle2, Clock, Truck, MapPin, Mail, Phone, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderData {
  'Order Number': string;
  'Customer Name': string;
  'Customer Email': string;
  'Customer Phone'?: string;
  'Shipping Address': string;
  'Shipping City': string;
  'Shipping State': string;
  'Shipping Postal Code': string;
  'Order Items': string;
  'Total Items': number;
  'Subtotal': number;
  'Tax'?: number;
  'Shipping Cost'?: number;
  'Total Amount': number;
  'Order Status': string;
  'Payment Status': string;
  'Notes'?: string;
  'Created At'?: string;
}

const orderStatusConfig = {
  Pending: { icon: Clock, color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
  Confirmed: { icon: CheckCircle2, color: 'bg-blue-100 text-blue-800', label: 'Confirmed' },
  Processing: { icon: Package, color: 'bg-purple-100 text-purple-800', label: 'Processing' },
  Shipped: { icon: Truck, color: 'bg-indigo-100 text-indigo-800', label: 'Shipped' },
  Delivered: { icon: CheckCircle2, color: 'bg-green-100 text-green-800', label: 'Delivered' },
  Cancelled: { icon: AlertCircle, color: 'bg-red-100 text-red-800', label: 'Cancelled' },
};

const paymentStatusConfig = {
  'Pending Review': { color: 'bg-yellow-100 text-yellow-800' },
  Verified: { color: 'bg-green-100 text-green-800' },
  Rejected: { color: 'bg-red-100 text-red-800' },
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const response = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to find order');
        toast({
          title: '❌ Order Not Found',
          description: data.error || 'Please check your order number and email.',
          variant: 'destructive',
        });
        return;
      }

      setOrder(data.order);
      toast({
        title: '✅ Order Found!',
        description: `Order ${data.order['Order Number']} has been located.`,
      });
    } catch (err) {
      setError('Failed to track order. Please try again.');
      toast({
        title: '❌ Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const parseOrderItems = (itemsJson: string) => {
    try {
      return JSON.parse(itemsJson);
    } catch {
      return [];
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const status = order?.['Order Status'] as keyof typeof orderStatusConfig;
  const statusConfig = status ? orderStatusConfig[status] : null;
  const StatusIcon = statusConfig?.icon;

  const paymentStatus = order?.['Payment Status'] as keyof typeof paymentStatusConfig;
  const paymentConfig = paymentStatus ? paymentStatusConfig[paymentStatus] : null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Track Your Order 📦</h1>
          <p className="text-muted-foreground text-lg">
            Enter your order details to check the status
          </p>
        </div>

        {/* Search Form */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
            <CardDescription>
              Enter your order number and email address to track your order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                  id="orderNumber"
                  placeholder="e.g., ORD-000001"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                {loading ? (
                  'Searching...'
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Track Order
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && !order && (
          <Card className="border-2 border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        {order && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Order Status Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      Order {order['Order Number']}
                    </CardTitle>
                    <CardDescription>
                      Thank you for your order, {order['Customer Name']}!
                    </CardDescription>
                  </div>
                  {StatusIcon && statusConfig && (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.color}`}>
                      <StatusIcon className="h-5 w-5" />
                      <span className="font-semibold">{statusConfig.label}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Status */}
                {paymentConfig && (
                  <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                    <span className="font-medium">Payment Status</span>
                    <Badge className={paymentConfig.color}>
                      {order['Payment Status']}
                    </Badge>
                  </div>
                )}

                <Separator />

                {/* Shipping Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Shipping Address
                  </h3>
                  <div className="bg-secondary/30 p-4 rounded-lg space-y-1">
                    <p className="font-medium">{order['Customer Name']}</p>
                    <p className="text-muted-foreground">{order['Shipping Address']}</p>
                    <p className="text-muted-foreground">
                      {order['Shipping City']}, {order['Shipping State']}{' '}
                      {order['Shipping Postal Code']}
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-sm">{order['Customer Email']}</p>
                    </div>
                  </div>
                  {order['Customer Phone'] && (
                    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="font-medium text-sm">{order['Customer Phone']}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Order Items ({order['Total Items']} items)
                  </h3>
                  <div className="space-y-2">
                    {parseOrderItems(order['Order Items']).map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Summary */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{formatPrice(order['Subtotal'])}</span>
                    </div>
                    {order['Tax'] !== undefined && (
                      <div className="flex justify-between text-muted-foreground">
                        <span>Tax</span>
                        <span>{formatPrice(order['Tax'])}</span>
                      </div>
                    )}
                    {order['Shipping Cost'] !== undefined && (
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>{formatPrice(order['Shipping Cost'])}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(order['Total Amount'])}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {order['Notes'] && (
                  <>
                    <Separator />
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <p className="text-sm font-medium mb-1">Order Notes</p>
                      <p className="text-muted-foreground">{order['Notes']}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
