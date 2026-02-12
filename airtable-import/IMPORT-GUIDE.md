# Airtable CSV Import Guide

Import these CSV files to automatically create all fields and populate with demo data!

## 📋 Import Order (Important!)

Import in this order to ensure Category links work:

### 1. Categories Table (Import First!)

1. Open your Airtable base
2. If you already have a "Categories" table, **delete it** or rename it
3. Click **"Add or import"** → **"CSV file"**
4. Upload `categories.csv`
5. Click **"Import"**
6. Airtable will create a new table with all fields automatically!

**After import, you need to:**
- Change "Display Order" field type to **Number** (Integer)
- Change "Active" field type to **Checkbox**

### 2. Products Table (Import Second!)

1. Click **"Add or import"** → **"CSV file"**
2. Upload `products.csv`
3. Click **"Import"**

**After import, configure these field types:**

| Field Name | Change Type To | Configuration |
|------------|----------------|---------------|
| Price | Currency | Format: USD, Precision: 2 |
| Compare At Price | Currency | Format: USD, Precision: 2 |
| Stock Quantity | Number | Integer, Precision: 0 |
| Low Stock Threshold | Number | Integer, Precision: 0 |
| Featured | Checkbox | - |
| Active | Checkbox | - |
| Category | Link to another record | Link to: Categories table |

**Add Stock Status Formula Field:**
1. Click **+** to add a new field
2. Name: `Stock Status`
3. Type: **Formula**
4. Formula:
   ```
   IF({Stock Quantity}=0,"out-of-stock",IF({Stock Quantity}<={Low Stock Threshold},"low-stock","in-stock"))
   ```

### 3. Orders Table (Import Third!)

1. Click **"Add or import"** → **"CSV file"**
2. Upload `orders.csv`
3. Click **"Import"**

**After import, configure these field types:**

| Field Name | Change Type To | Configuration |
|------------|----------------|---------------|
| Customer Email | Email | - |
| Customer Phone | Phone number | - |
| Total Items | Number | Integer, Precision: 0 |
| Subtotal | Currency | Format: USD, Precision: 2 |
| Tax | Currency | Format: USD, Precision: 2 |
| Shipping Cost | Currency | Format: USD, Precision: 2 |
| Total Amount | Currency | Format: USD, Precision: 2 |

**Add these fields manually:**

1. **Order Number** (as first field)
   - Type: Autonumber
   - Format: `ORD-{000001}`

2. **Order Status**
   - Type: Single select
   - Options: `Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`

3. **Payment Status**
   - Type: Single select
   - Options: `Pending Review`, `Verified`, `Rejected`

4. **Created At**
   - Type: Created time

5. **Updated At**
   - Type: Last modified time

## 🔗 Linking Categories to Products

After importing both tables:

1. Go to **Products** table
2. Click on the **Category** field for each product
3. The CSV imported category names as text
4. You'll need to convert this to links:
   - Click the field type button for "Category"
   - Change to **Link to another record**
   - Select **Categories** table
   - Airtable will try to auto-match the names

**OR** manually link each product:
- Click on a product's Category field
- Select the matching category from the dropdown

## 🎨 Optional: Add Images

The CSV can't import images. To add product images:

1. Go to **Products** table
2. Add a field: **Images** (Type: Attachment)
3. Drag and drop product images for each item

## ✅ Verification

After import, you should have:
- **Categories:** 5 categories with all fields
- **Products:** 13 products with all fields
- **Orders:** Empty table ready for orders

## 🚀 Next Steps

Once imported and configured:

```bash
npm run dev
```

Visit http://localhost:3000 to see your store!

## 💡 Tips

- **Featured Products:** Products with "Featured" checked will appear on homepage
- **Stock Levels:** Some products have low stock (5-8 items) for testing
- **Sale Prices:** Products with "Compare At Price" will show as "Sale"
- **Active Products:** Only products with "Active" checked will show on site

## 🆘 Troubleshooting

**Products not showing?**
- Check "Active" is TRUE (checked)
- Verify Stock Quantity > 0
- Check Category is properly linked

**Categories not linking?**
- The Category field must be type "Link to another record"
- Link it to the Categories table
- Airtable should auto-match based on names

**Prices showing wrong?**
- Make sure Price fields are Currency type
- Format: USD, Precision: 2

---

After completing the import, your store will be fully functional with demo data! 🎉
