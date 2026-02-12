export interface OrderFormData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  paymentMethod: string;
  shippingMethod: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order extends OrderFormData {
  orderItems: string;
  totalItems: number;
  subtotal: number;
  tax?: number;
  shippingCost?: number;
  totalAmount: number;
  orderStatus: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending Review' | 'Verified' | 'Rejected';
}
