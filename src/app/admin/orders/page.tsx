'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { ShoppingBag, Eye, CheckCircle2, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Order {
  id: string;
  'Order Number': string;
  'Customer Name': string;
  'Customer Email': string;
  'Total Amount': number;
  'Total Items': number;
  'Order Status': string;
  'Payment Status': string;
  'Order Items': string;
  'Shipping Address': string;
  'Shipping City': string;
  'Shipping State': string;
  'Shipping Postal Code': string;
  'Created At'?: string;
}

const orderStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const paymentStatuses = ['Pending Review', 'Verified', 'Rejected'];

const orderStatusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Processing: 'bg-purple-100 text-purple-800',
  Shipped: 'bg-indigo-100 text-indigo-800',
  Delivered: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const paymentStatusColors: Record<string, string> = {
  'Pending Review': 'bg-yellow-100 text-yellow-800',
  Verified: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

export default function OrdersManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast({
        title: '❌ Error',
        description: 'Failed to load orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    field: 'Order Status' | 'Payment Status',
    value: string
  ) => {
    setUpdatingId(orderId);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) throw new Error('Failed to update');

      const { order } = await response.json();

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, ...order } : o))
      );

      toast({
        title: '✅ Success',
        description: `${field} updated successfully`,
      });
    } catch (error) {
      toast({
        title: '❌ Error',
        description: `Failed to update ${field.toLowerCase()}`,
        variant: 'destructive',
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const parseOrderItems = (itemsJson: string) => {
    try {
      return JSON.parse(itemsJson);
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Order Management</h1>
        <p className="text-muted-foreground">
          Review payments and update order status
        </p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            All Orders ({orders.length})
          </CardTitle>
          <CardDescription>
            Update payment and order status for each order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Items</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No orders yet. Orders will appear here once customers start placing them.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order['Order Number']}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order['Customer Name']}</p>
                          <p className="text-sm text-muted-foreground">
                            {order['Customer Email']}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatPrice(order['Total Amount'])}
                      </TableCell>
                      <TableCell className="text-center">
                        {order['Total Items']}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order['Payment Status']}
                          onValueChange={(value) =>
                            updateOrderStatus(order.id, 'Payment Status', value)
                          }
                          disabled={updatingId === order.id}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                <Badge
                                  className={paymentStatusColors[status]}
                                >
                                  {status}
                                </Badge>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order['Order Status']}
                          onValueChange={(value) =>
                            updateOrderStatus(order.id, 'Order Status', value)
                          }
                          disabled={updatingId === order.id}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {orderStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                <Badge className={orderStatusColors[status]}>
                                  {status}
                                </Badge>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Order Details - {selectedOrder?.['Order Number']}
            </DialogTitle>
            <DialogDescription>
              Complete information about this order
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Status Badges */}
              <div className="flex gap-3">
                <Badge className={orderStatusColors[selectedOrder['Order Status']]}>
                  {selectedOrder['Order Status']}
                </Badge>
                <Badge className={paymentStatusColors[selectedOrder['Payment Status']]}>
                  {selectedOrder['Payment Status']}
                </Badge>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {selectedOrder['Customer Name']}</p>
                  <p><span className="text-muted-foreground">Email:</span> {selectedOrder['Customer Email']}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="text-sm space-y-1">
                  <p>{selectedOrder['Shipping Address']}</p>
                  <p>
                    {selectedOrder['Shipping City']}, {selectedOrder['Shipping State']}{' '}
                    {selectedOrder['Shipping Postal Code']}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-2">Order Items ({selectedOrder['Total Items']})</h3>
                <div className="space-y-2">
                  {parseOrderItems(selectedOrder['Order Items']).map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">{formatPrice(selectedOrder['Total Amount'])}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
