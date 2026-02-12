/**
 * Simple Airtable Setup Script
 * Only uses the Name field - works with basic tables
 */

const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

const categories = [
  { Name: 'Lipsticks' },
  { Name: 'Eyeshadow' },
  { Name: 'Foundation' },
  { Name: 'Blush' },
  { Name: 'Mascara' },
];

const products = [
  { Name: 'Velvet Matte Lipstick - Ruby Red' },
  { Name: 'Satin Finish Lipstick - Nude Rose' },
  { Name: 'Glossy Lip Lacquer - Berry Burst' },
  { Name: 'Glamour Nights Eyeshadow Palette' },
  { Name: 'Rose Gold Shimmer Shadow' },
  { Name: 'Matte Brown Eyeshadow Duo' },
  { Name: 'Flawless Coverage Foundation - Porcelain' },
  { Name: 'Flawless Coverage Foundation - Honey' },
  { Name: 'Dewy Glow Foundation - Beige' },
  { Name: 'Powder Blush - Pink Petal' },
  { Name: 'Cream Blush - Coral Kiss' },
  { Name: 'Volume Max Mascara - Black' },
  { Name: 'Lengthening Mascara - Brown' },
];

async function setupSimple() {
  console.log('🚀 Simple Setup - Creating basic records...\n');

  try {
    console.log('📁 Creating categories...');
    const cats = await base('Categories').create(
      categories.map(cat => ({ fields: cat }))
    );
    console.log(`✅ Created ${cats.length} categories\n`);

    console.log('🛍️  Creating products...');
    const prods = await base('Products').create(
      products.map(prod => ({ fields: prod }))
    );
    console.log(`✅ Created ${prods.length} products\n`);

    console.log('🎉 Setup complete!\n');
    console.log('💡 You can now add more details to these records in Airtable');
    console.log('   (prices, descriptions, images, etc.)\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

setupSimple();
