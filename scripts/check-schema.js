/**
 * Airtable Schema Checker
 * Validates your tables have all required fields
 */

const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

const requiredSchema = {
  Categories: [
    { name: 'Name', type: 'singleLineText', required: true },
    { name: 'Slug', type: 'singleLineText', required: true },
    { name: 'Description', type: 'multilineText', required: false },
    { name: 'Image', type: 'multipleAttachments', required: false },
    { name: 'Display Order', type: 'number', required: true },
    { name: 'Active', type: 'checkbox', required: true },
  ],
  Products: [
    { name: 'Name', type: 'singleLineText', required: true },
    { name: 'Slug', type: 'singleLineText', required: true },
    { name: 'Description', type: 'multilineText', required: false },
    { name: 'Short Description', type: 'multilineText', required: false },
    { name: 'Category', type: 'multipleRecordLinks', required: false },
    { name: 'Price', type: 'currency', required: true },
    { name: 'Compare At Price', type: 'currency', required: false },
    { name: 'SKU', type: 'singleLineText', required: true },
    { name: 'Images', type: 'multipleAttachments', required: false },
    { name: 'Stock Quantity', type: 'number', required: true },
    { name: 'Low Stock Threshold', type: 'number', required: false },
    { name: 'Stock Status', type: 'formula', required: false },
    { name: 'Brand', type: 'singleLineText', required: false },
    { name: 'Shade/Color', type: 'singleLineText', required: false },
    { name: 'Weight', type: 'singleLineText', required: false },
    { name: 'Ingredients', type: 'multilineText', required: false },
    { name: 'Featured', type: 'checkbox', required: false },
    { name: 'Active', type: 'checkbox', required: true },
  ],
  Orders: [
    { name: 'Order Number', type: 'autoNumber', required: true },
    { name: 'Customer Name', type: 'singleLineText', required: true },
    { name: 'Customer Email', type: 'email', required: true },
    { name: 'Customer Phone', type: 'phoneNumber', required: false },
    { name: 'Shipping Address', type: 'multilineText', required: true },
    { name: 'Shipping City', type: 'singleLineText', required: true },
    { name: 'Shipping State', type: 'singleLineText', required: true },
    { name: 'Shipping Postal Code', type: 'singleLineText', required: true },
    { name: 'Order Items', type: 'multilineText', required: true },
    { name: 'Total Items', type: 'number', required: true },
    { name: 'Subtotal', type: 'currency', required: true },
    { name: 'Tax', type: 'currency', required: false },
    { name: 'Shipping Cost', type: 'currency', required: false },
    { name: 'Total Amount', type: 'currency', required: true },
    { name: 'Order Status', type: 'singleSelect', required: true },
    { name: 'Payment Status', type: 'singleSelect', required: true },
    { name: 'Notes', type: 'multilineText', required: false },
    { name: 'Internal Notes', type: 'multilineText', required: false },
  ],
};

const typeMapping = {
  singleLineText: 'Single line text',
  multilineText: 'Long text',
  number: 'Number',
  currency: 'Currency',
  checkbox: 'Checkbox',
  email: 'Email',
  phoneNumber: 'Phone number',
  multipleAttachments: 'Attachment',
  multipleRecordLinks: 'Link to another record',
  singleSelect: 'Single select',
  autoNumber: 'Autonumber',
  formula: 'Formula',
};

async function checkSchema() {
  console.log('\n🔍 Checking Airtable Schema...\n');
  console.log('━'.repeat(60));

  let allGood = true;

  for (const [tableName, fields] of Object.entries(requiredSchema)) {
    console.log(`\n📋 ${tableName} Table`);
    console.log('─'.repeat(60));

    try {
      // Try to read one record to check if table exists
      const records = await base(tableName).select({ maxRecords: 1 }).firstPage();
      const sampleRecord = records[0];

      const existingFields = sampleRecord ? Object.keys(sampleRecord.fields) : [];

      const missingFields = [];

      for (const field of fields) {
        const exists = existingFields.includes(field.name);
        const symbol = exists ? '✅' : '❌';
        const status = exists ? 'EXISTS' : 'MISSING';

        if (!exists && field.required) {
          missingFields.push(field);
          allGood = false;
        }

        const reqText = field.required ? '[REQUIRED]' : '[Optional]';
        console.log(`${symbol} ${field.name.padEnd(25)} ${reqText.padEnd(12)} ${status}`);
      }

      if (missingFields.length > 0) {
        console.log('\n⚠️  Missing Required Fields:');
        console.log('\nTo add these fields in Airtable:');
        console.log('1. Open your Airtable base');
        console.log(`2. Go to the ${tableName} table`);
        console.log('3. Click the + button to add each field:\n');

        missingFields.forEach((field, i) => {
          console.log(`   ${i + 1}. Field Name: "${field.name}"`);
          console.log(`      Type: ${typeMapping[field.type]}`);

          // Special instructions for certain field types
          if (field.type === 'number') {
            console.log(`      Format: Integer, Precision: 0`);
          } else if (field.type === 'currency') {
            console.log(`      Format: USD, Precision: 2`);
          } else if (field.type === 'multipleRecordLinks' && field.name === 'Category') {
            console.log(`      Link to: Categories table`);
          } else if (field.type === 'formula' && field.name === 'Stock Status') {
            console.log(`      Formula: IF({Stock Quantity}=0,"out-of-stock",IF({Stock Quantity}<={Low Stock Threshold},"low-stock","in-stock"))`);
          } else if (field.type === 'autoNumber') {
            console.log(`      Format: ORD-{000001}`);
          } else if (field.type === 'singleSelect') {
            if (field.name === 'Order Status') {
              console.log(`      Options: Pending, Confirmed, Processing, Shipped, Delivered, Cancelled`);
            } else if (field.name === 'Payment Status') {
              console.log(`      Options: Pending Review, Verified, Rejected`);
            }
          }
          console.log('');
        });
      }

    } catch (error) {
      if (error.statusCode === 404) {
        console.log(`❌ Table "${tableName}" not found!`);
        console.log(`\n💡 Create the ${tableName} table in Airtable first.\n`);
        allGood = false;
      } else {
        console.log(`❌ Error checking table: ${error.message}`);
        allGood = false;
      }
    }
  }

  console.log('\n' + '━'.repeat(60));

  if (allGood) {
    console.log('\n✅ All required fields are present!');
    console.log('\n🚀 You can now run: npm run setup\n');
  } else {
    console.log('\n⚠️  Please add the missing fields listed above.');
    console.log('\nAfter adding fields, run this check again:');
    console.log('   npm run check\n');
  }
}

checkSchema().catch(console.error);
