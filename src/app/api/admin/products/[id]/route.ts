import { NextRequest, NextResponse } from 'next/server';
import { updateProduct } from '@/lib/airtable';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    const updatedProduct = await updateProduct(id, updates);

    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
