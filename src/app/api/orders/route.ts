import { NextResponse } from 'next/server';
import { createOrder, getAllOrders } from '@/lib/airtable';
import type { Order } from '@/types/order';

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Order = await request.json();

    if (!body.customerName || !body.customerEmail || !body.orderItems) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const order = await createOrder({
      'Customer Name': body.customerName,
      'Customer Email': body.customerEmail,
      'Customer Phone': body.customerPhone || '',
      'Shipping Address': body.shippingAddress,
      'Shipping City': body.shippingCity,
      'Shipping State': body.shippingState,
      'Shipping Postal Code': body.shippingPostalCode,
      'Payment Method': body.paymentMethod || '',
      'Shipping Method': body.shippingMethod || '',
      'Order Items': body.orderItems,
      'Total Items': body.totalItems,
      Subtotal: body.subtotal,
      Tax: body.tax || 0,
      'Shipping Cost': body.shippingCost || 0,
      'Total Amount': body.totalAmount,
      'Order Status': 'Pending',
      'Payment Status': 'Pending Review',
      Notes: body.notes || '',
    });

    return NextResponse.json({
      success: true,
      id: order.id,
      orderNumber: order['Order Number'],
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        error: 'Failed to create order',
        details: error?.message || 'Unknown error',
        airtableError: error?.error || null
      },
      { status: 500 }
    );
  }
}
