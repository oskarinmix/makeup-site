import { NextResponse } from 'next/server';
import { getShippingMethods } from '@/lib/airtable';

export async function GET() {
  try {
    const methods = await getShippingMethods();
    return NextResponse.json(methods);
  } catch (error) {
    console.error('Error in shipping-methods API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipping methods' },
      { status: 500 }
    );
  }
}
