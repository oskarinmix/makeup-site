// Test the actual getProducts function from lib/airtable.ts
require('dotenv').config({ path: '.env.local' });

// Simulate Next.js environment
process.env.NODE_ENV = 'development';

async function testGetProducts() {
  console.log('\n🧪 Testing getProducts function...\n');

  try {
    // We need to use dynamic import since it's TypeScript
    const Airtable = require('airtable');

    if (!process.env.AIRTABLE_PERSONAL_TOKEN) {
      throw new Error('AIRTABLE_PERSONAL_TOKEN is not defined in environment');
    }

    if (!process.env.AIRTABLE_BASE_ID) {
      throw new Error('AIRTABLE_BASE_ID is not defined in environment');
    }

    console.log('✅ Environment variables loaded');
    console.log('   Token:', process.env.AIRTABLE_PERSONAL_TOKEN?.substring(0, 20) + '...');
    console.log('   Base ID:', process.env.AIRTABLE_BASE_ID);
    console.log('');

    const base = new Airtable({
      apiKey: process.env.AIRTABLE_PERSONAL_TOKEN
    }).base(process.env.AIRTABLE_BASE_ID);

    // Test 1: Get all active products (like products page)
    console.log('📊 Test 1: Get all active products\n');
    const allProducts = await base('Products')
      .select({
        filterByFormula: 'AND({Active}=TRUE())',
        sort: [{ field: 'Name', direction: 'asc' }],
      })
      .all();

    console.log(`   Found: ${allProducts.length} products`);
    if (allProducts.length > 0) {
      console.log('   Products:');
      allProducts.forEach((record, i) => {
        console.log(`   ${i + 1}. ${record.fields.Name}`);
      });
    }
    console.log('');

    // Test 2: Get featured products (like homepage)
    console.log('📊 Test 2: Get featured products\n');
    const featuredProducts = await base('Products')
      .select({
        filterByFormula: 'AND({Active}=TRUE(), {Featured}=TRUE())',
        maxRecords: 6,
      })
      .all();

    console.log(`   Found: ${featuredProducts.length} featured products`);
    if (featuredProducts.length > 0) {
      console.log('   Products:');
      featuredProducts.forEach((record, i) => {
        console.log(`   ${i + 1}. ${record.fields.Name} (Featured: ${record.fields.Featured}, Active: ${record.fields.Active})`);
      });
    } else {
      console.log('   ⚠️  No featured products found!');
      console.log('   This is why the homepage shows 0 products.');
    }
    console.log('');

    // Test 3: Check what Featured field values look like
    console.log('📊 Test 3: Inspect Featured field values\n');
    const sampleProducts = await base('Products')
      .select({ maxRecords: 3 })
      .all();

    sampleProducts.forEach((record, i) => {
      console.log(`   Product ${i + 1}: ${record.fields.Name}`);
      console.log(`      Active: ${record.fields.Active} (type: ${typeof record.fields.Active})`);
      console.log(`      Featured: ${record.fields.Featured} (type: ${typeof record.fields.Featured})`);
      console.log('');
    });

    console.log('✅ All tests complete!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
  }
}

testGetProducts();
