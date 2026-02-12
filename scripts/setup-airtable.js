/**
 * Airtable Setup Script
 * Creates tables and populates with demo makeup products
 *
 * Usage: node scripts/setup-airtable.js
 */

const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const PERSONAL_TOKEN = process.env.AIRTABLE_PERSONAL_TOKEN;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!PERSONAL_TOKEN || !BASE_ID) {
  console.error('❌ Error: AIRTABLE_PERSONAL_TOKEN and AIRTABLE_BASE_ID must be set in .env.local');
  process.exit(1);
}

const base = new Airtable({ apiKey: PERSONAL_TOKEN }).base(BASE_ID);

// Demo Categories
const categories = [
  { Name: 'Lipsticks', Slug: 'lipsticks', Description: 'Bold and beautiful lip colors for every occasion', 'Display Order': 1, Active: true },
  { Name: 'Eyeshadow', Slug: 'eyeshadow', Description: 'Stunning eye palettes and singles', 'Display Order': 2, Active: true },
  { Name: 'Foundation', Slug: 'foundation', Description: 'Flawless base for your perfect complexion', 'Display Order': 3, Active: true },
  { Name: 'Blush', Slug: 'blush', Description: 'Add a natural flush to your cheeks', 'Display Order': 4, Active: true },
  { Name: 'Mascara', Slug: 'mascara', Description: 'Volumizing and lengthening formulas', 'Display Order': 5, Active: true },
];

// Demo Products
const products = [
  // Lipsticks
  {
    Name: 'Velvet Matte Lipstick - Ruby Red',
    Slug: 'velvet-matte-lipstick-ruby-red',
    Description: 'A luxurious velvet matte lipstick with intense color payoff and all-day comfort. The creamy formula glides on smoothly and sets to a beautiful matte finish without drying out your lips.',
    'Short Description': 'Luxurious velvet matte finish in a stunning ruby red shade',
    Price: 24.99,
    'Compare At Price': 34.99,
    SKU: 'LIP-VEL-RUB-001',
    'Stock Quantity': 45,
    'Low Stock Threshold': 10,
    Brand: 'GlamPro',
    'Shade/Color': 'Ruby Red',
    Weight: '3.5g',
    Featured: true,
    Active: true,
    Ingredients: 'Dimethicone, Synthetic Wax, Silica, Vitamin E, Natural Oils',
  },
  {
    Name: 'Satin Finish Lipstick - Nude Rose',
    Slug: 'satin-finish-lipstick-nude-rose',
    Description: 'The perfect everyday nude with a satin finish. This lipstick provides buildable coverage with a comfortable, non-drying formula enriched with moisturizing ingredients.',
    'Short Description': 'Everyday nude with moisturizing satin finish',
    Price: 22.99,
    SKU: 'LIP-SAT-NUD-002',
    'Stock Quantity': 38,
    'Low Stock Threshold': 10,
    Brand: 'GlamPro',
    'Shade/Color': 'Nude Rose',
    Weight: '3.5g',
    Featured: false,
    Active: true,
    Ingredients: 'Castor Oil, Beeswax, Vitamin E, Shea Butter, Natural Pigments',
  },
  {
    Name: 'Glossy Lip Lacquer - Berry Burst',
    Slug: 'glossy-lip-lacquer-berry-burst',
    Description: 'High-shine lip lacquer with a non-sticky formula. Delivers intense color and brilliant shine that lasts for hours.',
    'Short Description': 'High-shine, non-sticky berry gloss',
    Price: 18.99,
    SKU: 'LIP-GLS-BER-003',
    'Stock Quantity': 52,
    'Low Stock Threshold': 10,
    Brand: 'LuxeGloss',
    'Shade/Color': 'Berry Burst',
    Weight: '4ml',
    Featured: true,
    Active: true,
    Ingredients: 'Polybutene, Vitamin E, Natural Oils, Mica, Fragrance',
  },

  // Eyeshadow
  {
    Name: 'Glamour Nights Eyeshadow Palette',
    Slug: 'glamour-nights-eyeshadow-palette',
    Description: 'A versatile 12-shade palette featuring a mix of matte, shimmer, and metallic finishes. From soft neutrals to dramatic smoky shades, create endless eye looks for day or night.',
    'Short Description': '12 stunning shades for day to night looks',
    Price: 42.99,
    'Compare At Price': 58.99,
    SKU: 'EYE-PAL-GLM-001',
    'Stock Quantity': 28,
    'Low Stock Threshold': 5,
    Brand: 'ColorCraft',
    'Shade/Color': 'Neutral & Smoky',
    Weight: '15g',
    Featured: true,
    Active: true,
    Ingredients: 'Talc, Mica, Synthetic Fluorphlogopite, Vitamin E, Mineral Pigments',
  },
  {
    Name: 'Rose Gold Shimmer Shadow',
    Slug: 'rose-gold-shimmer-shadow',
    Description: 'A stunning rose gold shimmer eyeshadow with incredible color payoff. The buttery formula blends seamlessly and stays put all day without creasing.',
    'Short Description': 'Buttery rose gold shimmer with all-day wear',
    Price: 16.99,
    SKU: 'EYE-SGL-RSG-002',
    'Stock Quantity': 42,
    'Low Stock Threshold': 10,
    Brand: 'ColorCraft',
    'Shade/Color': 'Rose Gold',
    Weight: '2.5g',
    Featured: false,
    Active: true,
    Ingredients: 'Mica, Talc, Titanium Dioxide, Iron Oxides, Vitamin E',
  },
  {
    Name: 'Matte Brown Eyeshadow Duo',
    Slug: 'matte-brown-eyeshadow-duo',
    Description: 'Perfect for sculpting and defining, this duo features two essential matte brown shades. Highly pigmented and easy to blend.',
    'Short Description': 'Essential matte browns for sculpting',
    Price: 19.99,
    SKU: 'EYE-DUO-BRN-003',
    'Stock Quantity': 5,
    'Low Stock Threshold': 10,
    Brand: 'ColorCraft',
    'Shade/Color': 'Light & Medium Brown',
    Weight: '4g',
    Featured: false,
    Active: true,
    Ingredients: 'Talc, Mica, Kaolin Clay, Vitamin E, Natural Pigments',
  },

  // Foundation
  {
    Name: 'Flawless Coverage Foundation - Porcelain',
    Slug: 'flawless-coverage-foundation-porcelain',
    Description: 'Medium to full coverage foundation with a natural matte finish. This long-wearing formula provides up to 24-hour coverage while feeling lightweight on the skin. Enriched with skincare ingredients.',
    'Short Description': '24-hour coverage with a natural matte finish',
    Price: 38.99,
    'Compare At Price': 48.99,
    SKU: 'FND-FLW-POR-001',
    'Stock Quantity': 35,
    'Low Stock Threshold': 8,
    Brand: 'PerfectBase',
    'Shade/Color': 'Porcelain',
    Weight: '30ml',
    Featured: true,
    Active: true,
    Ingredients: 'Water, Dimethicone, Glycerin, Titanium Dioxide, Hyaluronic Acid, SPF 15',
  },
  {
    Name: 'Flawless Coverage Foundation - Honey',
    Slug: 'flawless-coverage-foundation-honey',
    Description: 'Medium to full coverage foundation perfect for medium skin tones. Natural matte finish with 24-hour wear and skincare benefits.',
    'Short Description': 'Perfect for medium skin with warm undertones',
    Price: 38.99,
    SKU: 'FND-FLW-HON-002',
    'Stock Quantity': 32,
    'Low Stock Threshold': 8,
    Brand: 'PerfectBase',
    'Shade/Color': 'Honey',
    Weight: '30ml',
    Featured: false,
    Active: true,
    Ingredients: 'Water, Dimethicone, Glycerin, Iron Oxides, Hyaluronic Acid, SPF 15',
  },
  {
    Name: 'Dewy Glow Foundation - Beige',
    Slug: 'dewy-glow-foundation-beige',
    Description: 'Lightweight foundation with a luminous finish. Provides buildable coverage while giving your skin a healthy, radiant glow. Perfect for dry or normal skin types.',
    'Short Description': 'Luminous, lightweight foundation for glowing skin',
    Price: 36.99,
    SKU: 'FND-DEW-BEI-003',
    'Stock Quantity': 28,
    'Low Stock Threshold': 8,
    Brand: 'RadiantGlow',
    'Shade/Color': 'Beige',
    Weight: '30ml',
    Featured: false,
    Active: true,
    Ingredients: 'Water, Glycerin, Hyaluronic Acid, Vitamin C, Pearl Extract, SPF 20',
  },

  // Blush
  {
    Name: 'Powder Blush - Pink Petal',
    Slug: 'powder-blush-pink-petal',
    Description: 'Silky powder blush that delivers a natural flush of color. The buildable formula blends seamlessly and lasts all day without fading.',
    'Short Description': 'Natural flush with buildable color',
    Price: 21.99,
    SKU: 'BLH-PWD-PNK-001',
    'Stock Quantity': 40,
    'Low Stock Threshold': 10,
    Brand: 'ColorBloom',
    'Shade/Color': 'Pink Petal',
    Weight: '5g',
    Featured: false,
    Active: true,
    Ingredients: 'Talc, Mica, Vitamin E, Natural Pigments, Jojoba Oil',
  },
  {
    Name: 'Cream Blush - Coral Kiss',
    Slug: 'cream-blush-coral-kiss',
    Description: 'Creamy blush stick for a dewy, natural-looking flush. Easy to apply and blend, perfect for on-the-go touch-ups.',
    'Short Description': 'Creamy stick blush for dewy cheeks',
    Price: 24.99,
    SKU: 'BLH-CRM-COR-002',
    'Stock Quantity': 33,
    'Low Stock Threshold': 10,
    Brand: 'ColorBloom',
    'Shade/Color': 'Coral Kiss',
    Weight: '4g',
    Featured: true,
    Active: true,
    Ingredients: 'Dimethicone, Vitamin E, Shea Butter, Natural Pigments',
  },

  // Mascara
  {
    Name: 'Volume Max Mascara - Black',
    Slug: 'volume-max-mascara-black',
    Description: 'Dramatic volume mascara with a specially designed brush that coats every lash. Buildable formula for customizable volume without clumping or flaking.',
    'Short Description': 'Dramatic volume without clumps',
    Price: 19.99,
    'Compare At Price': 26.99,
    SKU: 'MSC-VOL-BLK-001',
    'Stock Quantity': 55,
    'Low Stock Threshold': 15,
    Brand: 'LashPerfect',
    'Shade/Color': 'Black',
    Weight: '8ml',
    Featured: true,
    Active: true,
    Ingredients: 'Water, Beeswax, Carnauba Wax, Panthenol, Vitamin E, Iron Oxides',
  },
  {
    Name: 'Lengthening Mascara - Brown',
    Slug: 'lengthening-mascara-brown',
    Description: 'Lengthening mascara that extends and defines each lash. Perfect for a natural, everyday look with a brown tint.',
    'Short Description': 'Natural lengthening in soft brown',
    Price: 18.99,
    SKU: 'MSC-LEN-BRN-002',
    'Stock Quantity': 8,
    'Low Stock Threshold': 15,
    Brand: 'LashPerfect',
    'Shade/Color': 'Brown',
    Weight: '8ml',
    Featured: false,
    Active: true,
    Ingredients: 'Water, Beeswax, Carnauba Wax, Panthenol, Vitamin E, Natural Pigments',
  },
];

async function setupAirtable() {
  console.log('🚀 Starting Airtable setup...\n');

  try {
    // Step 1: Create Categories
    console.log('📁 Creating categories...');
    const createdCategories = await base('Categories').create(
      categories.map(cat => ({ fields: cat }))
    );
    console.log(`✅ Created ${createdCategories.length} categories\n`);

    // Create a map of category names to IDs for linking
    const categoryMap = {};
    createdCategories.forEach((cat, index) => {
      categoryMap[categories[index].Name] = [cat.id];
    });

    // Step 2: Create Products with category links
    console.log('🛍️  Creating products...');
    const productsWithCategories = products.map(product => {
      const categoryName =
        product.Name.includes('Lipstick') || product.Name.includes('Lip') ? 'Lipsticks' :
        product.Name.includes('Eyeshadow') || product.Name.includes('Shadow') ? 'Eyeshadow' :
        product.Name.includes('Foundation') ? 'Foundation' :
        product.Name.includes('Blush') ? 'Blush' :
        product.Name.includes('Mascara') ? 'Mascara' : null;

      return {
        fields: {
          ...product,
          Category: categoryName ? categoryMap[categoryName] : undefined,
        },
      };
    });

    // Split products into batches of 10 (Airtable limit)
    const batchSize = 10;
    let totalCreated = 0;

    for (let i = 0; i < productsWithCategories.length; i += batchSize) {
      const batch = productsWithCategories.slice(i, i + batchSize);
      const created = await base('Products').create(batch);
      totalCreated += created.length;
      console.log(`   Created batch ${Math.floor(i / batchSize) + 1}: ${created.length} products`);
    }

    console.log(`✅ Created ${totalCreated} products total\n`);

    console.log('🎉 Setup complete!\n');
    console.log('📊 Summary:');
    console.log(`   • ${createdCategories.length} categories`);
    console.log(`   • ${totalCreated} products`);
    console.log(`   • Orders table ready for customer orders\n`);
    console.log('🚀 Run "npm run dev" to start your store!');

  } catch (error) {
    console.error('\n❌ Error during setup:', error.message);

    if (error.statusCode === 404) {
      console.error('\n💡 Make sure:');
      console.error('   1. Your AIRTABLE_BASE_ID is correct');
      console.error('   2. You have created the Categories, Products, and Orders tables in Airtable');
      console.error('   3. Your Personal Access Token has the correct permissions\n');
      console.error('📝 Table creation must be done manually in Airtable:');
      console.error('   Go to your base and create three tables: Categories, Products, Orders');
      console.error('   Then run this script again to populate the data.\n');
    } else if (error.statusCode === 401) {
      console.error('\n💡 Authentication failed. Check:');
      console.error('   1. Your AIRTABLE_PERSONAL_TOKEN is correct');
      console.error('   2. The token has data.records:write permission\n');
    } else if (error.error === 'INVALID_REQUEST_BODY') {
      console.error('\n💡 Table structure issue:');
      console.error('   Make sure your tables have the correct field names and types');
      console.error('   Refer to the setup instructions for the exact field configuration\n');
    }

    process.exit(1);
  }
}

setupAirtable();
