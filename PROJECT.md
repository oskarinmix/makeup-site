# Makeup E-Commerce Store - Project Documentation

## 📋 Project Overview

A modern, fully-featured makeup e-commerce catalog built with Next.js 16, featuring a rose/pink theme, complete shopping cart functionality, and Airtable backend integration. The application supports product browsing, search, filtering, checkout with payment/shipping selection, order tracking, and a full admin dashboard.

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 16.1.0** - App Router with Server Components
- **React 19.2.3** - With React Compiler (automatic optimization)
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - CSS-first configuration
- **shadcn/ui** - Component library with rose theme

### State Management & Data
- **Zustand** - Client-side cart state with localStorage persistence
- **Airtable** - Backend database with Personal Access Tokens
- **React Hook Form + Zod** - Form validation

### Additional Libraries
- **Lucide React** - Icon library
- **Playfair Display** - Elegant font for headings
- **class-variance-authority** - Component variants

## 📊 Airtable Schema

### Products Table
| Field Name | Type | Description |
|------------|------|-------------|
| Name | Single line text | Product name (Primary) |
| Slug | Single line text | URL-friendly identifier (Unique) |
| Description | Long text | Full product description |
| Short Description | Long text | Brief description (max 150 chars) |
| Category | Link to Categories | Product category |
| Price | Currency (USD) | Product price |
| Compare At Price | Currency (USD) | Original price for sale display |
| SKU | Single line text | Stock keeping unit (Unique) |
| Images | Attachment | Product images (multiple) |
| Stock Quantity | Number (Integer) | Available stock |
| Low Stock Threshold | Number | Alert threshold (default: 10) |
| Stock Status | Formula | Auto-calculated: in-stock/low-stock/out-of-stock |
| Brand | Single line text | Product brand |
| Shade/Color | Single line text | Product shade or color |
| Weight | Single line text | Product weight |
| Featured | Checkbox | Display on homepage |
| Active | Checkbox | Product visibility (default: checked) |

### Categories Table
| Field Name | Type | Description |
|------------|------|-------------|
| Name | Single line text | Category name (Primary) |
| Slug | Single line text | URL-friendly identifier (Unique) |
| Description | Long text | Category description |
| Image | Attachment | Category image |
| Display Order | Number | Sort order (default: 0) |
| Active | Checkbox | Category visibility (default: checked) |

### Orders Table
| Field Name | Type | Description |
|------------|------|-------------|
| Order Number | Autonumber | Format: ORD-{000001} |
| Customer Name | Single line text | Required |
| Customer Email | Email | Required |
| Customer Phone | Phone number | Optional |
| Shipping Address | Long text | Required |
| Shipping City | Single line text | Required |
| Shipping State | Single line text | Required |
| Shipping Postal Code | Single line text | Required |
| Payment Method | Single line text | Selected payment method |
| Shipping Method | Single line text | Selected shipping method |
| Order Items | Long text | JSON string of cart items |
| Total Items | Number (Integer) | Count of items |
| Subtotal | Currency (USD) | Pre-shipping total |
| Shipping Cost | Currency (USD) | Calculated shipping |
| Total Amount | Currency (USD) | Final total |
| Order Status | Single select | Pending, Confirmed, Processing, Shipped, Delivered, Cancelled |
| Payment Status | Single select | Pending Review, Verified, Rejected |
| Notes | Long text | Customer notes |
| Internal Notes | Long text | Admin notes |

### Payment Methods Table
| Field Name | Type | Description |
|------------|------|-------------|
| Name | Single line text | Payment method name |
| Description | Long text | Method description |
| Icon | Single line text | Emoji icon |
| Active | Checkbox | Visibility toggle |
| Display Order | Number | Sort order |

**Included Methods:**
- 💳 Credit/Debit Card
- 🅿️ PayPal
- 🍎 Apple Pay
- 🔵 Google Pay
- 🏦 Bank Transfer
- 💵 Cash on Delivery (inactive by default)

### Shipping Methods Table
| Field Name | Type | Description |
|------------|------|-------------|
| Name | Single line text | Shipping method name |
| Description | Long text | Method description |
| Cost | Currency (USD) | Shipping cost |
| Estimated Days | Single line text | Delivery timeframe |
| Icon | Single line text | Emoji icon |
| Active | Checkbox | Visibility toggle |
| Display Order | Number | Sort order |
| Free Shipping Threshold | Currency (USD) | Free shipping over amount |

**Included Methods:**
- 📦 Standard Shipping ($5.99, FREE over $50, 5-7 days)
- ⚡ Express Shipping ($12.99, 2-3 days)
- 🚀 Overnight Shipping ($24.99, 1 day)
- 🏪 Store Pickup (FREE, 1 day)
- 🌍 International Shipping ($29.99, 10-15 days, inactive by default)

## 🎨 Features Implemented

### Customer-Facing Features

#### 1. Landing Page
- **Hero Section** - Gradient background with decorative elements
- **Wave Decoration** - SVG wave separator
- **Featured Products** - Showcase highlighted items
- **Categories Showcase** - Emoji icons with navigation
- **Brands Carousel** - Infinite scroll brand display
- **Newsletter Signup** - Email collection with gradient design
- **Trust Indicators** - Free shipping, secure payment, support badges

#### 2. Product Catalog (`/products`)
- **Grid Layout** - Responsive product cards
- **Search Bar** - Debounced search functionality
- **Category Filter** - Filter by product category
- **Brand Filter** - Filter by brand
- **Sort Options** - Name (A-Z, Z-A), Price (Low-High, High-Low)
- **Stock Badges** - Color-coded status (in-stock, low-stock, out-of-stock)
- **Pagination** - Automatic with Next.js

#### 3. Product Detail Page (`/products/[slug]`)
- **Image Gallery** - Multiple product images
- **Product Info** - Name, price, description, SKU, brand, shade
- **Stock Display** - Real-time availability
- **Add to Cart** - Quantity selector with validation
- **Related Products** - Same category suggestions

#### 4. Shopping Cart
- **Cart Drawer** - Slide-out panel with sheet component
- **Item Management** - Add, remove, update quantity
- **Price Calculation** - Real-time subtotal updates
- **Persistence** - LocalStorage with Zustand
- **Cart Badge** - Header icon with item count
- **Empty State** - Friendly message with CTA

#### 5. Checkout Flow (`/checkout`)
- **Customer Information Form**
  - Full name, email, phone
  - Shipping address (address, city, state, postal code)
  - React Hook Form + Zod validation
- **Payment Method Selection**
  - Display active payment methods with icons
  - Method descriptions
  - Required field validation
- **Shipping Method Selection**
  - Display costs and delivery estimates
  - Free shipping calculation (Standard > $50)
  - Icons and descriptions
  - Required field validation
- **Order Summary Sidebar**
  - Cart items with images
  - Subtotal calculation
  - Shipping cost display (updates with selection)
  - Total amount with shipping
- **Order Notes** - Optional customer instructions

#### 6. Order Confirmation (`/checkout/success`)
- Order number display
- Success message
- Order details summary

#### 7. Order Tracking (`/track-order`)
- Track by order number + email
- Order status display
- Payment status badges
- Order items list
- Shipping information
- Total breakdown

### Admin Features

#### 8. Admin Dashboard (`/admin`)
- **Statistics Cards**
  - Total Products count
  - Total Orders count
  - Total Revenue (sum of verified orders)
  - Low Stock Alerts count
- **Quick Navigation** - Sidebar to Products and Orders

#### 9. Product Management (`/admin/products`)
- **Product List** - All products with key info
- **Search & Filters**
  - Search by name, SKU, brand
  - Filter by category
  - Filter by brand
  - Filter by status (Active/Inactive)
  - Show low stock only toggle
- **Inline Editing**
  - Edit Price
  - Edit Stock Quantity
  - Edit Low Stock Threshold
  - Toggle Active/Inactive status
- **Save/Cancel** - Per-row editing with API updates
- **Real-time Updates** - Immediate feedback

#### 10. Order Management (`/admin/orders`)
- **Order List** - All orders with details
- **Status Management**
  - Update Order Status (6 states)
  - Update Payment Status (3 states)
- **Order Details Modal**
  - Customer information
  - Shipping address
  - Order items breakdown
  - Payment and shipping methods
  - Status badges
  - Notes display
- **Real-time Updates** - Status changes save immediately

## 🎨 Design System

### Color Palette (Rose/Pink Theme)
```css
--primary: #E94B8C (Rose)
--secondary: #F3C5D9 (Light Pink)
--accent: #8B3A62 (Deep Rose)
--background: #FFF9FB (Off White)
--foreground: #1A1A1A (Near Black)
```

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Body**: Inter (default Next.js font)

### Components
- All shadcn/ui components themed with rose colors
- Consistent spacing and border radius
- Smooth transitions and hover states
- Mobile-first responsive design

## 📁 Project Structure

```
src/
├── app/
│   ├── (store)/                    # Store route group with layout
│   │   ├── layout.tsx             # Header, Footer, Toaster
│   │   ├── page.tsx               # Landing page
│   │   ├── products/
│   │   │   ├── page.tsx           # Product catalog
│   │   │   └── [slug]/page.tsx    # Product detail
│   │   ├── cart/page.tsx          # Cart page
│   │   ├── checkout/
│   │   │   ├── page.tsx           # Checkout form
│   │   │   └── success/page.tsx   # Order confirmation
│   │   └── track-order/page.tsx   # Order tracking
│   ├── admin/
│   │   ├── layout.tsx             # Admin sidebar layout
│   │   ├── page.tsx               # Admin dashboard
│   │   ├── products/page.tsx      # Product management
│   │   └── orders/page.tsx        # Order management
│   ├── api/
│   │   ├── orders/
│   │   │   ├── route.ts           # GET/POST orders
│   │   │   └── track/route.ts     # Track order
│   │   ├── products/route.ts      # GET products
│   │   ├── payment-methods/route.ts
│   │   └── shipping-methods/route.ts
│   ├── globals.css                # Global styles + Tailwind
│   └── layout.tsx                 # Root layout
├── components/
│   ├── ui/                        # shadcn components
│   ├── layout/
│   │   ├── Header.tsx             # Navigation + cart icon
│   │   ├── Footer.tsx             # Footer
│   │   └── CartDrawer.tsx         # Slide-out cart
│   ├── products/
│   │   ├── ProductCard.tsx        # Product grid item
│   │   ├── ProductGrid.tsx        # Grid container
│   │   ├── ProductFilters.tsx     # Category/brand filters
│   │   ├── ProductSort.tsx        # Sort dropdown
│   │   ├── ProductSearch.tsx      # Search input
│   │   ├── StockBadge.tsx         # Stock status badge
│   │   ├── ProductDetail.tsx      # Detail view
│   │   └── ProductGallery.tsx     # Image carousel
│   ├── cart/
│   │   ├── AddToCartButton.tsx    # Add to cart with toast
│   │   ├── CartItem.tsx           # Cart item row
│   │   └── CartSummary.tsx        # Price breakdown
│   ├── checkout/
│   │   ├── CheckoutForm.tsx       # Full checkout form
│   │   └── OrderSummary.tsx       # Order review sidebar
│   └── home/
│       ├── Newsletter.tsx         # Newsletter signup
│       ├── CategoriesShowcase.tsx # Category grid
│       └── BrandsShowcase.tsx     # Brand carousel
├── lib/
│   ├── airtable.ts                # Airtable client + queries
│   └── utils.ts                   # Utility functions
├── store/
│   └── cartStore.ts               # Zustand cart state
└── types/
    ├── product.ts                 # Product types
    ├── category.ts                # Category types
    ├── cart.ts                    # Cart types
    └── order.ts                   # Order types
```

## 🚀 Key Implementation Details

### 1. Server vs Client Components
- **Server Components** (default): Product pages, category pages, static content
- **Client Components**: Cart, forms, interactive filters, admin management

### 2. Cart State Management
```typescript
// Zustand store with persistence
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => { /* ... */ },
      removeItem: (productId) => { /* ... */ },
      updateQuantity: (productId, quantity) => { /* ... */ },
      clearCart: () => { /* ... */ },
      getTotalItems: () => { /* ... */ },
      getTotalPrice: () => { /* ... */ },
    }),
    { name: 'cart-storage' }
  )
);
```

### 3. Airtable Integration
- **Authentication**: Personal Access Token (replaced deprecated API keys)
- **Tables**: Products, Categories, Orders, Payment Methods, Shipping Methods
- **Operations**: Select with filtering, create, update
- **Error Handling**: Graceful fallbacks, detailed error logging

### 4. Form Validation
```typescript
const checkoutSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  shippingAddress: z.string().min(5),
  paymentMethod: z.string().min(1),
  shippingMethod: z.string().min(1),
  // ... more fields
});
```

### 5. Shipping Cost Calculation
```typescript
// Free shipping logic
const cost = shippingMethod.Cost || 0;
const freeThreshold = shippingMethod['Free Shipping Threshold'];
const isFree = freeThreshold && subtotal >= freeThreshold;
const shippingCost = isFree ? 0 : cost;
```

### 6. Stock Status Calculation
```typescript
// Fallback when Airtable formula field is missing
if (stockQuantity === 0) status = 'out-of-stock';
else if (stockQuantity <= lowStockThreshold) status = 'low-stock';
else status = 'in-stock';
```

## 📦 CSV Import Files

Located in `airtable-import/`:
- **categories.csv** - 5 pre-configured categories
- **products.csv** - 13 sample makeup products
- **orders.csv** - Empty template with correct structure (includes Payment Method and Shipping Method fields)
- **payment-methods.csv** - 6 payment options
- **shipping-methods.csv** - 5 shipping options
- **IMPORT-GUIDE.md** - Step-by-step import instructions
- **PAYMENT-SHIPPING-SETUP.md** - Payment/shipping setup guide
- **IMAGE-GUIDE.md** - Instructions for adding product images

## 📋 Setup Guides

Located in project root:
- **ORDERS-TABLE-UPDATE.md** - Guide to add Payment Method and Shipping Method fields to existing Orders table
- **PROJECT.md** - This comprehensive documentation
- **IMPROVEMENTS.md** - Future enhancements and feature roadmap

## 🔧 Environment Setup

### Required Environment Variables
```env
AIRTABLE_PERSONAL_TOKEN=patXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXX
```

### Airtable Token Scopes Required
- Products table: Read/Write
- Categories table: Read/Write
- Orders table: Read/Write
- Payment Methods table: Read
- Shipping Methods table: Read

## 🎯 User Flows

### Customer Purchase Flow
1. Browse products → Filter/Search → View details
2. Add to cart → Review cart → Proceed to checkout
3. Enter shipping info → Select payment method → Select shipping method
4. Review order → Place order
5. Receive order confirmation → Track order

### Admin Management Flow
1. Login to admin → View dashboard stats
2. Manage products → Edit prices/stock → Toggle active status
3. View orders → Update payment status → Update order status
4. Track inventory → Low stock alerts

## 📊 Data Flow

### Product Display
```
Airtable Products Table
  ↓ (getProducts)
Server Component
  ↓ (props)
Client Component
  ↓ (user action)
Cart Store (Zustand)
  ↓ (persistence)
LocalStorage
```

### Order Creation
```
Checkout Form
  ↓ (validation)
API Route (/api/orders)
  ↓ (createOrder)
Airtable Orders Table
  ↓ (response)
Success Page
```

## 🚨 Known Issues & Solutions

### 1. Airtable Field Type Issues
**Issue**: "Cannot parse value '1' for field Total Items"
**Solution**: Ensure Total Items is Number type (Integer), not text

### 2. Missing Stock Status Field
**Issue**: Stock Status formula field doesn't exist
**Solution**: Component calculates status from stock quantity

### 3. Payment Methods Authorization
**Issue**: 403 error fetching payment methods
**Solution**: Update Airtable token scopes to include Payment Methods table

### 4. Category Field Type Variance
**Issue**: Category can be string or array in Airtable
**Solution**: Runtime type checking with `Array.isArray()`

## 📈 Performance Optimizations

1. **React Compiler**: Automatic memoization (no manual useMemo/useCallback needed)
2. **Server Components**: Reduced client-side JavaScript
3. **Image Optimization**: Next.js Image component with placeholder
4. **Debounced Search**: Reduces API calls during typing
5. **Persistent Cart**: Faster load times with localStorage
6. **Selective Re-renders**: Zustand selectors prevent unnecessary updates

## 🔒 Security Considerations

1. **API Keys**: Server-side only (never exposed to client)
2. **Form Validation**: Client-side + server-side validation
3. **SQL Injection**: N/A (using Airtable API, not raw SQL)
4. **XSS Protection**: React's built-in escaping
5. **CSRF**: Next.js built-in protections

## 📱 Responsive Design

- **Mobile**: Single column layout, touch-friendly buttons
- **Tablet**: 2-column product grid, collapsible filters
- **Desktop**: 3-4 column grid, persistent filters, sticky cart summary

## 🎓 Learning Resources Used

- Next.js 16 App Router documentation
- React 19 documentation
- shadcn/ui component library
- Airtable API documentation
- Zustand state management guide
- Tailwind CSS 4 documentation

## 📝 Development Notes

### Critical Patterns
1. Always use `Read` tool before `Edit` or `Write`
2. Server Components by default, Client Components when needed
3. Type safety with TypeScript throughout
4. Error boundaries for graceful failures
5. Loading states for async operations

### Common Fixes Applied
1. Changed Airtable authentication from API key to Personal Access Token
2. Updated default sort from "Created At" to "Name" (field didn't exist)
3. Made maxRecords conditional to avoid undefined errors
4. Added fallback stock status calculation
5. Handled Category field as both string and array
6. Enhanced error handling in order creation to show detailed Airtable errors
7. Updated orders.csv to include Payment Method and Shipping Method fields

## 🏁 Current Status

✅ **Completed Features**:
- Full e-commerce catalog
- Shopping cart with persistence
- Checkout with payment/shipping selection
- Order tracking
- Admin dashboard
- Product management
- Order management
- CSV import templates
- Complete documentation

⚠️ **Pending User Setup**:
- Add Payment Method and Shipping Method fields to Orders table
- Update Airtable token permissions for Payment Methods table
- Verify all field types are correct (especially Total Items as Number)

## 🤝 Contributing

This is a custom e-commerce solution. For modifications:
1. Update Airtable schema as needed
2. Modify types in `src/types/`
3. Update API routes in `src/app/api/`
4. Adjust components as needed
5. Test thoroughly before deploying

## 📄 License

Custom built for makeup e-commerce - All rights reserved

---

**Last Updated**: December 2025
**Version**: 1.0.0
**Built with**: ❤️ and Claude Code
