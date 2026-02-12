/**
 * Test Airtable Connection
 * This verifies your credentials are working
 */

const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const PERSONAL_TOKEN = process.env.AIRTABLE_PERSONAL_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

console.log('\n🔍 Testing Airtable Connection...\n');
console.log('Token:', PERSONAL_TOKEN ? `${PERSONAL_TOKEN.substring(0, 15)}...` : 'NOT FOUND');
console.log('Base ID:', BASE_ID || 'NOT FOUND');
console.log('');

if (!PERSONAL_TOKEN || !BASE_ID) {
  console.error('❌ Missing credentials in .env.local');
  process.exit(1);
}

const base = new Airtable({ apiKey: PERSONAL_TOKEN }).base(BASE_ID);

async function testConnection() {
  try {
    console.log('📋 Checking tables...\n');

    // Test Categories table
    console.log('Testing Categories table...');
    const categories = await base('Categories').select({ maxRecords: 1 }).firstPage();
    console.log(`✅ Categories table accessible (${categories.length} records found)`);

    // Test Products table
    console.log('Testing Products table...');
    const products = await base('Products').select({ maxRecords: 1 }).firstPage();
    console.log(`✅ Products table accessible (${products.length} records found)`);

    // Test Orders table
    console.log('Testing Orders table...');
    const orders = await base('Orders').select({ maxRecords: 1 }).firstPage();
    console.log(`✅ Orders table accessible (${orders.length} records found)`);

    console.log('\n🎉 Connection successful! All tables are accessible.\n');
    console.log('💡 Your credentials are working. The setup script should work now.');

  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    console.error('\nError details:', error);

    if (error.statusCode === 401) {
      console.error('\n💡 Authentication Error:');
      console.error('   - Check your AIRTABLE_PERSONAL_TOKEN is correct');
      console.error('   - Verify the token has data.records:read and data.records:write scopes');
      console.error('   - Make sure the token has access to this base');
    } else if (error.statusCode === 404) {
      console.error('\n💡 Not Found Error:');
      console.error('   - Check your AIRTABLE_BASE_ID is correct');
      console.error('   - Make sure you have created the Categories, Products, and Orders tables');
      console.error('   - Verify the token has access to this specific base');
    } else if (error.error === 'NOT_AUTHORIZED') {
      console.error('\n💡 Authorization Error:');
      console.error('   - Your token needs data.records:write permission');
      console.error('   - Go to https://airtable.com/create/tokens and edit your token');
      console.error('   - Add the missing scopes and save');
    }

    process.exit(1);
  }
}

testConnection();
