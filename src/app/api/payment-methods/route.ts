import { NextResponse } from 'next/server';
import { getPaymentMethods } from '@/lib/airtable';

export async function GET() {
  try {
    const methods = await getPaymentMethods();
    return NextResponse.json(methods);
  } catch (error) {
    console.error('Error in payment-methods API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment methods' },
      { status: 500 }
    );
  }
}
