# Payment Methods & Shipping Methods Setup Guide

## 📋 Import Order

Import these CSVs into your Airtable base:

### 1. Payment Methods Table

1. Open your Airtable base
2. Click **"Add or import"** → **"CSV file"**
3. Upload `payment-methods.csv`
4. Click **"Import"**

**After import, configure these field types:**

| Field Name | Change Type To | Configuration |
|------------|----------------|---------------|
| Name | Single line text | (already correct) |
| Description | Long text | - |
| Icon | Single line text | (already correct) |
| Active | Checkbox | - |
| Display Order | Number | Integer, Precision: 0 |

**What you get:**
- ✅ 6 payment methods (5 active)
- 💳 Credit/Debit Card
- 🅿️ PayPal
- 🍎 Apple Pay
- 🔵 Google Pay
- 🏦 Bank Transfer
- 💵 Cash on Delivery (inactive by default)

---

### 2. Shipping Methods Table

1. Click **"Add or import"** → **"CSV file"**
2. Upload `shipping-methods.csv`
3. Click **"Import"**

**After import, configure these field types:**

| Field Name | Change Type To | Configuration |
|------------|----------------|---------------|
| Name | Single line text | (already correct) |
| Description | Long text | - |
| Cost | Currency | Format: USD, Precision: 2 |
| Estimated Days | Single line text | (already correct) |
| Icon | Single line text | (already correct) |
| Active | Checkbox | - |
| Display Order | Number | Integer, Precision: 0 |
| Free Shipping Threshold | Currency | Format: USD, Precision: 2, Allow negative: No |

**What you get:**
- ✅ 5 shipping methods (4 active)
- 📦 Standard Shipping ($5.99) - Free over $50
- ⚡ Express Shipping ($12.99)
- 🚀 Overnight Shipping ($24.99)
- 🏪 Store Pickup (Free)
- 🌍 International Shipping ($29.99, inactive by default)

---

### 3. Update Orders Table

Add these new fields to your **Orders** table:

1. **Payment Method**
   - Type: Single line text
   - (Will store the selected payment method name)

2. **Shipping Method**
   - Type: Single line text
   - (Will store the selected shipping method name)

---

## 🎯 Features

### Payment Methods
- Active/Inactive toggle
- Display order control
- Icons for visual appeal
- Descriptions for user clarity

### Shipping Methods
- Automatic free shipping calculation
- Cost display
- Delivery time estimates
- Icons for visual appeal
- Store pickup option

---

## 💡 Tips

**Free Shipping Logic:**
- Standard Shipping is FREE when cart total ≥ $50
- Other methods don't have free shipping thresholds
- The app will automatically apply free shipping when applicable

**Customization:**
- Edit costs in Airtable anytime
- Toggle Active/Inactive to show/hide methods
- Change Display Order to reorder how they appear
- Update descriptions for clarity

**Testing:**
- Try a cart under $50 - Standard Shipping costs $5.99
- Try a cart over $50 - Standard Shipping becomes FREE
- All other shipping methods maintain their fixed costs

---

## ✅ Verification

After import, you should have:
- **Payment Methods:** 6 methods (5 active, 1 inactive)
- **Shipping Methods:** 5 methods (4 active, 1 inactive)
- **Orders table:** Updated with Payment Method and Shipping Method fields

Now customers can choose their preferred payment and shipping options at checkout! 🎉
