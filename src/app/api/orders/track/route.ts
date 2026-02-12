import { NextRequest, NextResponse } from 'next/server';
import { getOrderByNumberAndEmail } from '@/lib/airtable';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderNumber, email } = body;

    if (!orderNumber || !email) {
      return NextResponse.json(
        { error: 'Order number and email are required' },
        { status: 400 }
      );
    }

    const order = await getOrderByNumberAndEmail(orderNumber, email);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found. Please check your order number and email.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error tracking order:', error);
    return NextResponse.json(
      { error: 'Failed to track order' },
      { status: 500 }
    );
  }
}
