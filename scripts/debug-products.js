const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

async function debugProducts() {
  console.log('\n🔍 DEBUGGING PRODUCTS TABLE\n');
  console.log('Environment:');
  console.log('- Token exists:', !!process.env.AIRTABLE_PERSONAL_TOKEN);
  console.log('- Base ID:', process.env.AIRTABLE_BASE_ID);
  console.log('\n---\n');

  try {
    // Query 1: Get ALL records without any filter
    console.log('📊 Query 1: Fetching ALL products (no filter)...\n');
    const allRecords = await base('Products').select({ maxRecords: 5 }).all();

    console.log(`Found ${allRecords.length} total records\n`);

    if (allRecords.length === 0) {
      console.log('❌ NO RECORDS FOUND! The Products table appears to be empty.');
      console.log('   Please verify that the CSV was imported correctly.\n');
      return;
    }

    // Show field names from first record
    const firstRecord = allRecords[0];
    console.log('📋 Field names in Airtable (first record):');
    const fieldNames = Object.keys(firstRecord.fields);
    fieldNames.forEach((name, i) => {
      console.log(`   ${i + 1}. "${name}"`);
    });
    console.log('\n---\n');

    // Show sample record data
    console.log('📝 Sample Record Data (first product):\n');
    console.log('Record ID:', firstRecord.id);
    console.log('Fields:');
    Object.entries(firstRecord.fields).forEach(([key, value]) => {
      const displayValue = typeof value === 'object' ? JSON.stringify(value) : value;
      console.log(`   ${key}: ${displayValue}`);
    });
    console.log('\n---\n');

    // Query 2: Test the Active filter
    console.log('📊 Query 2: Testing Active filter...\n');
    try {
      const activeRecords = await base('Products')
        .select({
          filterByFormula: 'AND({Active}=TRUE())',
          maxRecords: 5
        })
        .all();

      console.log(`✅ Found ${activeRecords.length} products with Active=TRUE filter`);

      if (activeRecords.length === 0 && allRecords.length > 0) {
        console.log('\n⚠️  WARNING: Products exist but none match Active=TRUE filter');
        console.log('   This means the Active field is likely not set to TRUE/checked');
        console.log('   Please check:');
        console.log('   1. Active field exists and is type "Checkbox"');
        console.log('   2. Active field is checked (TRUE) for products you want to show\n');
      }
    } catch (error) {
      console.log('❌ Active filter FAILED:', error.message);
      console.log('   This likely means the "Active" field does not exist or has wrong type\n');
    }

    console.log('---\n');

    // Check specific field expectations
    console.log('🔍 Field Validation:\n');
    const expectedFields = [
      'Name',
      'Slug',
      'Description',
      'Short Description',
      'Category',
      'Price',
      'SKU',
      'Stock Quantity',
      'Low Stock Threshold',
      'Active',
      'Featured'
    ];

    const missingFields = expectedFields.filter(field => !fieldNames.includes(field));
    const extraFields = fieldNames.filter(field => !expectedFields.includes(field));

    if (missingFields.length > 0) {
      console.log('❌ Missing expected fields:', missingFields.join(', '));
    }

    if (extraFields.length > 0) {
      console.log('ℹ️  Extra fields found:', extraFields.join(', '));
    }

    if (missingFields.length === 0 && extraFields.length === 0) {
      console.log('✅ All expected fields are present!\n');
    } else {
      console.log('');
    }

    // Check Active field type
    console.log('---\n');
    console.log('🔍 Active Field Check:\n');
    const activeValue = firstRecord.fields['Active'];
    console.log('   Active field value:', activeValue);
    console.log('   Active field type:', typeof activeValue);
    console.log('   Is TRUE?:', activeValue === true);
    console.log('   Is "TRUE"?:', activeValue === 'TRUE');
    console.log('   Is checked/truthy?:', !!activeValue);

    if (activeValue !== true) {
      console.log('\n⚠️  WARNING: Active field is not boolean TRUE');
      console.log('   Expected: true (boolean)');
      console.log('   Actual:', activeValue, `(${typeof activeValue})`);
      console.log('   Action: Make sure Active field type is "Checkbox" in Airtable\n');
    }

    console.log('\n✅ Debug complete!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
    if (error.error) {
      console.error('Details:', error.error);
    }
  }
}

debugProducts();
