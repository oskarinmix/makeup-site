# 📦 Airtable CSV Import Files

Quick and easy way to set up your GlamStore Airtable base!

## 🚀 Quick Start

1. **Download these 3 CSV files:**
   - `categories.csv` - 5 makeup categories
   - `products.csv` - 13 demo products with full details
   - `orders.csv` - Empty orders table (just headers)

2. **Import into Airtable:**
   - Open your Airtable base
   - Click "Add or import" → "CSV file"
   - Import **categories.csv** FIRST
   - Then import **products.csv**
   - Finally import **orders.csv**

3. **Configure field types:**
   - Follow the detailed instructions in `IMPORT-GUIDE.md`
   - Convert currency, number, and checkbox fields
   - Link Products to Categories

4. **Run your store:**
   ```bash
   npm run dev
   ```

## 📄 Files Included

- **categories.csv** - 5 categories (Lipsticks, Eyeshadow, Foundation, Blush, Mascara)
- **products.csv** - 13 products with prices, descriptions, stock levels
- **orders.csv** - Empty template for order table
- **IMPORT-GUIDE.md** - Detailed step-by-step import instructions

## ⚡ What You Get

After import:
- ✅ All required fields automatically created
- ✅ 5 product categories
- ✅ 13 realistic makeup products
- ✅ Proper prices ($16.99 - $58.99)
- ✅ Stock levels (some products have low stock)
- ✅ Featured products for homepage
- ✅ Sale pricing on select items

## 📝 Important Notes

- **Import Order Matters:** Do Categories first, then Products, then Orders
- **Field Types:** You'll need to adjust some field types after import (see IMPORT-GUIDE.md)
- **Category Linking:** Products need to be linked to Categories after import
- **Images:** CSV can't import images - add them manually in Airtable

## 🆘 Need Help?

See the detailed `IMPORT-GUIDE.md` for:
- Step-by-step import instructions
- Field type configuration
- How to link categories
- Troubleshooting tips

---

**Estimated Time:** 5-10 minutes to import and configure everything! 🎉
