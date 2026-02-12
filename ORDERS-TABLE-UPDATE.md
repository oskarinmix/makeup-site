# Orders Table Update - Payment & Shipping Fields

## Issue
After adding payment and shipping method selection to checkout, the order creation is failing because the Orders table is missing two required fields.

## Required Fields to Add

You need to add these two fields to your **Orders** table in Airtable:

### 1. Payment Method
- **Field Name**: `Payment Method`
- **Field Type**: Single line text
- **Required**: No (will default to empty string)
- **Description**: Stores the selected payment method (e.g., "Credit/Debit Card", "PayPal", "Apple Pay")

### 2. Shipping Method
- **Field Name**: `Shipping Method`
- **Field Type**: Single line text
- **Required**: No (will default to empty string)
- **Description**: Stores the selected shipping method (e.g., "Standard Shipping", "Express Shipping")

## How to Add Fields in Airtable

1. Go to your Airtable base
2. Open the **Orders** table
3. Click the **+** button to add a new field
4. Add "Payment Method":
   - Name: `Payment Method`
   - Type: `Single line text`
   - Click **Create field**
5. Add "Shipping Method":
   - Name: `Shipping Method`
   - Type: `Single line text`
   - Click **Create field**

## Verify Existing Fields

While you're updating the Orders table, please verify these fields have the correct types:

| Field Name | Correct Type | Notes |
|------------|--------------|-------|
| Total Items | Number (Integer) | Should be a number, not text |
| Subtotal | Currency (USD) | Should be currency type |
| Shipping Cost | Currency (USD) | Should be currency type |
| Total Amount | Currency (USD) | Should be currency type |

## Alternative: Recreate Orders Table

If you prefer, you can delete the Orders table and recreate it using the updated CSV file:

1. Go to `airtable-import/orders.csv` (now includes Payment Method and Shipping Method columns)
2. In Airtable, delete the existing Orders table
3. Create a new table called "Orders"
4. Import the updated CSV file
5. Set the correct field types:
   - **Total Items**: Number (Integer, Allow negative numbers: NO)
   - **Subtotal**: Currency (USD, Precision: 2)
   - **Tax**: Currency (USD, Precision: 2)
   - **Shipping Cost**: Currency (USD, Precision: 2)
   - **Total Amount**: Currency (USD, Precision: 2)
   - **Order Status**: Single select with options: Pending, Confirmed, Processing, Shipped, Delivered, Cancelled
   - **Payment Status**: Single select with options: Pending Review, Verified, Rejected
   - **Payment Method**: Single line text
   - **Shipping Method**: Single line text
   - All address and customer fields: Single line text (except Customer Email should be Email type)

## After Adding Fields

Once you've added these fields (or recreated the table), try placing an order again. The error should be resolved!

## Still Getting Errors?

If you still get an error after adding these fields, the detailed error message will now show you exactly what's wrong. Check the browser console or the error toast message for specifics.
