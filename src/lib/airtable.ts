import Airtable from 'airtable';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';

if (!process.env.AIRTABLE_PERSONAL_TOKEN) {
  throw new Error('AIRTABLE_PERSONAL_TOKEN is not defined in environment variables');
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not defined in environment variables');
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

export const tables = {
  products: base('Products'),
  categories: base('Categories'),
  orders: base('Orders'),
  paymentMethods: base('Payment Methods'),
  shippingMethods: base('Shipping Methods'),
} as const;

export async function getProducts(options?: {
  filterByFormula?: string;
  sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
  maxRecords?: number;
}): Promise<Product[]> {
  try {
    const selectOptions: any = {
      filterByFormula: options?.filterByFormula || 'AND({Active}=TRUE())',
      sort: options?.sort || [{ field: 'Name', direction: 'asc' }],
    };

    // Only include maxRecords if it's defined
    if (options?.maxRecords !== undefined) {
      selectOptions.maxRecords = options.maxRecords;
    }

    const records = await tables.products
      .select(selectOptions)
      .all();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    } as Product));
  } catch (error) {
    console.error('Error fetching products from Airtable:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const records = await tables.products
      .select({
        filterByFormula: `AND({Slug}='${slug}', {Active}=TRUE())`,
        maxRecords: 1,
      })
      .all();

    if (records.length === 0) return null;

    return {
      id: records[0].id,
      ...records[0].fields,
    } as Product;
  } catch (error) {
    console.error('Error fetching product by slug from Airtable:', error);
    return null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const record = await tables.products.find(id);

    return {
      id: record.id,
      ...record.fields,
    } as Product;
  } catch (error) {
    console.error('Error fetching product by ID from Airtable:', error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const records = await tables.categories
      .select({
        filterByFormula: '{Active}=TRUE()',
        sort: [{ field: 'Display Order', direction: 'asc' }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    } as Category));
  } catch (error) {
    console.error('Error fetching categories from Airtable:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const records = await tables.categories
      .select({
        filterByFormula: `AND({Slug}='${slug}', {Active}=TRUE())`,
        maxRecords: 1,
      })
      .all();

    if (records.length === 0) return null;

    return {
      id: records[0].id,
      ...records[0].fields,
    } as Category;
  } catch (error) {
    console.error('Error fetching category by slug from Airtable:', error);
    return null;
  }
}

export async function createOrder(orderData: Record<string, unknown>) {
  try {
    const record: any = await tables.orders.create(orderData as any);

    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error('Error creating order in Airtable:', error);
    throw new Error('Failed to create order');
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const filterFormula = `AND(
      {Active}=TRUE(),
      OR(
        FIND(LOWER('${query}'), LOWER({Name})),
        FIND(LOWER('${query}'), LOWER({Description})),
        FIND(LOWER('${query}'), LOWER({Brand})),
        FIND(LOWER('${query}'), LOWER(ARRAYJOIN({Category})))
      )
    )`;

    const records = await tables.products
      .select({
        filterByFormula: filterFormula,
        sort: [{ field: 'Name', direction: 'asc' }],
        maxRecords: 50,
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    } as Product));
  } catch (error) {
    console.error('Error searching products in Airtable:', error);
    return [];
  }
}

export async function getOrderByNumberAndEmail(
  orderNumber: string,
  email: string
): Promise<any | null> {
  try {
    const records = await tables.orders
      .select({
        filterByFormula: `AND(
          {Order Number}='${orderNumber}',
          LOWER({Customer Email})=LOWER('${email}')
        )`,
        maxRecords: 1,
      })
      .all();

    if (records.length === 0) return null;

    return {
      id: records[0].id,
      ...records[0].fields,
    };
  } catch (error) {
    console.error('Error fetching order from Airtable:', error);
    return null;
  }
}

export async function updateProduct(
  productId: string,
  updates: Record<string, any>
): Promise<any> {
  try {
    const record = await tables.products.update(productId, updates);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error('Error updating product in Airtable:', error);
    throw new Error('Failed to update product');
  }
}

export async function getAllOrders(): Promise<any[]> {
  try {
    // Try to fetch orders - if Order Number field doesn't exist, fetch without sorting
    const records = await tables.orders
      .select()
      .all();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error('Error fetching orders from Airtable:', error);
    return [];
  }
}

export async function updateOrder(
  orderId: string,
  updates: Record<string, any>
): Promise<any> {
  try {
    const record = await tables.orders.update(orderId, updates);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error('Error updating order in Airtable:', error);
    throw new Error('Failed to update order');
  }
}

export async function getPaymentMethods(): Promise<any[]> {
  try {
    const records = await tables.paymentMethods
      .select({
        filterByFormula: '{Active}=TRUE()',
        sort: [{ field: 'Display Order', direction: 'asc' }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error('Error fetching payment methods from Airtable:', error);
    return [];
  }
}

export async function getShippingMethods(): Promise<any[]> {
  try {
    const records = await tables.shippingMethods
      .select({
        filterByFormula: '{Active}=TRUE()',
        sort: [{ field: 'Display Order', direction: 'asc' }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error('Error fetching shipping methods from Airtable:', error);
    return [];
  }
}
