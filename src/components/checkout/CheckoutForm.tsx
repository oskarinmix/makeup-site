'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';
import type { OrderFormData } from '@/types/order';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(5, 'Address is required'),
  shippingCity: z.string().min(2, 'City is required'),
  shippingState: z.string().min(2, 'State is required'),
  shippingPostalCode: z.string().min(3, 'Postal code is required'),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
  shippingMethod: z.string().min(1, 'Please select a shipping method'),
  notes: z.string().optional(),
});

interface CheckoutFormProps {
  onShippingMethodChange?: (method: any) => void;
}

export function CheckoutForm({ onShippingMethodChange }: CheckoutFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { items, clearCart, getTotalPrice } = useCartStore();

  const form = useForm<OrderFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      shippingAddress: '',
      shippingCity: '',
      shippingState: '',
      shippingPostalCode: '',
      paymentMethod: '',
      shippingMethod: '',
      notes: '',
    },
  });

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const [paymentRes, shippingRes] = await Promise.all([
          fetch('/api/payment-methods'),
          fetch('/api/shipping-methods'),
        ]);

        if (paymentRes.ok && shippingRes.ok) {
          const payment = await paymentRes.json();
          const shipping = await shippingRes.json();
          setPaymentMethods(payment);
          setShippingMethods(shipping);
        }
      } catch (error) {
        console.error('Error fetching methods:', error);
        toast({
          title: 'Error',
          description: 'Failed to load payment and shipping methods.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMethods();
  }, [toast]);

  // Watch for shipping method changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'shippingMethod' && value.shippingMethod) {
        const selectedMethod = shippingMethods.find(
          (m) => m.Name === value.shippingMethod
        );
        if (selectedMethod && onShippingMethodChange) {
          onShippingMethodChange(selectedMethod);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, shippingMethods, onShippingMethodChange]);

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }));

      const subtotal = getTotalPrice();

      // Calculate shipping cost
      const selectedShipping = shippingMethods.find((m) => m.Name === data.shippingMethod);
      let shippingCost = 0;

      if (selectedShipping) {
        const cost = selectedShipping.Cost || 0;
        const freeThreshold = selectedShipping['Free Shipping Threshold'] || null;
        const isFree = freeThreshold && subtotal >= freeThreshold;
        shippingCost = isFree ? 0 : cost;
      }

      const totalAmount = subtotal + shippingCost;

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          orderItems: JSON.stringify(orderItems),
          totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
          subtotal: subtotal,
          shippingCost: shippingCost,
          totalAmount: totalAmount,
          orderStatus: 'Pending',
          paymentStatus: 'Pending Review',
          paymentMethod: data.paymentMethod,
          shippingMethod: data.shippingMethod,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to create order');
      }

      const order = await response.json();

      clearCart();
      toast({
        title: 'Order placed successfully!',
        description: `Order number: ${order.orderNumber}`,
      });

      router.push(`/checkout/success?order=${order.id}`);
    } catch (error: any) {
      console.error('Order submission error:', error);
      toast({
        title: 'Error',
        description: error?.message || 'Failed to place order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="jane@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shippingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, Apt 4B" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="shippingCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippingState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="shippingPostalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="10001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-4">Payment & Shipping</h3>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.Name}>
                          <div className="flex items-center gap-2">
                            <span>{method.Icon}</span>
                            <div className="flex flex-col">
                              <span>{method.Name}</span>
                              <span className="text-xs text-muted-foreground">
                                {method.Description}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shipping method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {shippingMethods.map((method) => {
                        const cost = method.Cost || 0;
                        const subtotal = getTotalPrice();
                        const freeThreshold = method['Free Shipping Threshold'] || null;
                        const isFree = freeThreshold && subtotal >= freeThreshold;
                        const displayCost = isFree ? 'FREE' : `$${cost.toFixed(2)}`;

                        return (
                          <SelectItem key={method.id} value={method.Name}>
                            <div className="flex items-center gap-2">
                              <span>{method.Icon}</span>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span>{method.Name}</span>
                                  <span className="font-semibold text-primary">
                                    {displayCost}
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {method.Description} • {method['Estimated Days']} days
                                  {isFree && ' • Free shipping applied!'}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Notes (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Any special instructions..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </Button>
      </form>
    </Form>
  );
}
