# GlamStore Setup Guide

This guide will walk you through setting up your makeup online store with Airtable.

## Prerequisites

- Node.js installed
- An Airtable account (free tier works fine)

## Step-by-Step Setup

### 1. Create Airtable Base

1. Go to [Airtable](https://airtable.com) and sign in
2. Click **"Create a base"** or use an existing workspace
3. Name your base (e.g., "GlamStore Inventory")

### 2. Create Tables

You need to create **3 tables** with the following names (exact spelling matters):

- `Categories`
- `Products`
- `Orders`

#### Categories Table Fields

| Field Name | Field Type | Configuration |
|------------|-----------|---------------|
| Name | Single line text | *(Primary field, already exists)* |
| Slug | Single line text | - |
| Description | Long text | Enable rich text |
| Image | Attachment | - |
| Display Order | Number | Integer, Precision: 0 |
| Active | Checkbox | Default: ☑ Checked |

#### Products Table Fields

| Field Name | Field Type | Configuration |
|------------|-----------|---------------|
| Name | Single line text | *(Primary field, already exists)* |
| Slug | Single line text | - |
| Description | Long text | Enable rich text |
| Short Description | Long text | - |
| Category | Link to another record | Link to: Categories |
| Price | Currency | USD, Precision: 2 |
| Compare At Price | Currency | USD, Precision: 2 |
| SKU | Single line text | - |
| Images | Attachment | - |
| Stock Quantity | Number | Integer, Precision: 0 |
| Low Stock Threshold | Number | Integer, Precision: 0, Default: 10 |
| Stock Status | Formula | See formula below |
| Brand | Single line text | - |
| Shade/Color | Single line text | - |
| Weight | Single line text | - |
| Ingredients | Long text | - |
| Featured | Checkbox | - |
| Active | Checkbox | Default: ☑ Checked |
| Created At | Created time | - |
| Updated At | Last modified time | - |

**Stock Status Formula:**
```
IF({Stock Quantity}=0,"out-of-stock",IF({Stock Quantity}<={Low Stock Threshold},"low-stock","in-stock"))
```

#### Orders Table Fields

| Field Name | Field Type | Configuration |
|------------|-----------|---------------|
| Order Number | Autonumber | *(Primary field)* Format: `ORD-{000001}` |
| Customer Name | Single line text | - |
| Customer Email | Email | - |
| Customer Phone | Phone number | - |
| Shipping Address | Long text | - |
| Shipping City | Single line text | - |
| Shipping State | Single line text | - |
| Shipping Postal Code | Single line text | - |
| Order Items | Long text | - |
| Total Items | Number | Integer, Precision: 0 |
| Subtotal | Currency | USD, Precision: 2 |
| Tax | Currency | USD, Precision: 2 |
| Shipping Cost | Currency | USD, Precision: 2 |
| Total Amount | Currency | USD, Precision: 2 |
| Order Status | Single select | Options: Pending, Confirmed, Processing, Shipped, Delivered, Cancelled |
| Payment Status | Single select | Options: Pending Review, Verified, Rejected |
| Notes | Long text | - |
| Internal Notes | Long text | - |
| Created At | Created time | - |
| Updated At | Last modified time | - |

### 3. Get Airtable Credentials

#### Get Personal Access Token
1. Go to https://airtable.com/create/tokens
2. Click **"Create new token"**
3. Name it (e.g., "GlamStore Token")
4. Add these scopes:
   - `data.records:read`
   - `data.records:write`
   - `schema.bases:read`
5. Under **Access**, click **"Add a base"** and select your GlamStore base
6. Click **"Create token"**
7. **Copy the token** (you won't see it again!)

#### Get Base ID
1. Go to your base in Airtable
2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
3. The Base ID is the part starting with `app` (e.g., `appABC123DEF456`)

### 4. Configure Environment Variables

1. Open `.env.local` in your project root
2. Update with your credentials:

```env
AIRTABLE_PERSONAL_TOKEN=your_token_here
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
```

### 5. Run Setup Script

The setup script will automatically populate your Airtable with:
- 5 makeup categories (Lipsticks, Eyeshadow, Foundation, Blush, Mascara)
- 15 demo products with realistic descriptions, prices, and stock levels

Run the script:

```bash
npm run setup
```

You should see output like:
```
🚀 Starting Airtable setup...

📁 Creating categories...
✅ Created 5 categories

🛍️  Creating products...
   Created batch 1: 10 products
   Created batch 2: 5 products
✅ Created 15 products total

🎉 Setup complete!
```

### 6. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your store!

## Troubleshooting

### "NOT_FOUND" Error
- Double-check your Base ID is correct
- Make sure table names are exactly: `Categories`, `Products`, `Orders`

### "Authentication failed" Error
- Verify your Personal Access Token is correct
- Check that the token has the required scopes
- Make sure you added the base to the token's access

### "INVALID_REQUEST_BODY" Error
- Field names must match exactly (case-sensitive)
- Check that field types are configured correctly
- The Stock Status formula must be set up properly

### Products not showing
- Check that products have `Active` checkbox enabled
- Verify `Stock Quantity` is greater than 0
- Check Categories are linked correctly

## Next Steps

1. **Customize Products**: Edit the demo products or add your own in Airtable
2. **Add Images**: Upload product images to the Images field in Airtable
3. **Adjust Stock**: Update stock quantities as needed
4. **Test Orders**: Go through the checkout flow to test order creation
5. **Check Orders Table**: Orders will appear in Airtable after checkout

## Adding More Products

You can add products directly in Airtable:

1. Open your Products table
2. Click **"+"** to add a new record
3. Fill in the required fields:
   - Name
   - Slug (URL-friendly, e.g., "my-product-name")
   - Price
   - SKU
   - Stock Quantity
   - Check "Active"
4. Link to a Category
5. Add images and other details

The products will appear on your website immediately!

## Production Deployment

When deploying to production (Vercel, etc.):

1. Add environment variables in your hosting platform
2. Set `AIRTABLE_PERSONAL_TOKEN` and `AIRTABLE_BASE_ID`
3. The `NEXT_PUBLIC_SITE_URL` should be your production URL

---

**Need help?** Check the main README.md or create an issue in the repository.
