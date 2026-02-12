# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **GlamStore** - a makeup online store catalog built with Next.js 16.1.0, featuring a full e-commerce experience with Airtable backend, shopping cart functionality, and order management.

### Application Features
- Product catalog with category filtering and search
- Individual product detail pages with image galleries
- Shopping cart with persistent state (Zustand + localStorage)
- Full checkout flow with form validation
- Stock status indicators (in-stock, low-stock, out-of-stock)
- Manual payment verification workflow
- Rose/pink cosmetic-focused theme
- Responsive design for all screen sizes

## Key Technologies

- **Next.js 16.1.0** with App Router (src/app directory structure)
- **React 19.2.3** with React Compiler enabled (next.config.ts:5)
- **Tailwind CSS 4** with PostCSS plugin architecture
- **TypeScript 5** with strict mode enabled
- **Biome 2.2.0** for linting and formatting (replaces ESLint + Prettier)
- **shadcn/ui** for UI components (Button, Card, Form, etc.)
- **Airtable** as backend database for products, categories, and orders
- **Zustand** for cart state management with persistence
- **React Hook Form + Zod** for form validation
- **Sonner** for toast notifications

## Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run Biome linter (checks code quality)
npm run format       # Format code with Biome
```

## Architecture Notes

### React Compiler
The project has React Compiler enabled (next.config.ts:5), which means:
- Manual memoization (useMemo, useCallback, React.memo) is often unnecessary
- Components are automatically optimized for performance
- Prefer writing straightforward code and let the compiler optimize

### Tailwind CSS 4
This project uses Tailwind CSS 4's new CSS-first configuration:
- Configuration is in `globals.css` using `@theme` directive, not a separate config file
- Custom design tokens are defined using CSS variables in the `@theme` block
- The `@import "tailwindcss"` import is required in globals.css:1

### Path Aliases
TypeScript is configured with path alias `@/*` mapping to `./src/*` (tsconfig.json:22-23)

### Biome Configuration
- Uses Biome for both linting and formatting (not ESLint/Prettier)
- Configured with Next.js and React recommended rules (biome.json:26-27)
- Auto-organizes imports on save (biome.json:33)
- 2-space indentation (biome.json:15)

### Fonts
The app uses Geist font family (sans and mono variants) from `next/font/google`, loaded in the root layout with CSS variables (src/app/layout.tsx:5-13).

## Application Structure

### Airtable Backend
The application uses Airtable as the database with three main tables:

**Categories Table:**
- Name, Slug, Description, Image
- Display Order, Active status
- Linked to Products

**Products Table:**
- Name, Slug, Description, Short Description
- Price, Compare At Price (for sales)
- SKU, Images (multiple), Brand, Shade/Color, Weight
- Stock Quantity, Low Stock Threshold
- Stock Status (formula: in-stock/low-stock/out-of-stock)
- Featured, Active status

**Orders Table:**
- Order Number (auto-generated)
- Customer info: Name, Email, Phone
- Shipping address fields
- Order Items (JSON string of cart items)
- Total Items, Subtotal, Total Amount
- Order Status, Payment Status
- Notes

Environment variables needed in `.env.local`:
- `AIRTABLE_PERSONAL_TOKEN` - Your Airtable Personal Access Token (create at https://airtable.com/create/tokens)
- `AIRTABLE_BASE_ID` - Your Airtable base ID

**Note:** Airtable deprecated API keys in 2024. Use Personal Access Tokens instead.

### State Management
- **Zustand** (`src/store/cartStore.ts`) manages shopping cart state
- Cart persisted to localStorage automatically
- Cart actions: addItem, removeItem, updateQuantity, clearCart
- Selectors: getTotalItems, getTotalPrice

### Component Organization
```
src/components/
├── ui/              # shadcn/ui components
├── layout/          # Header, Footer, CartDrawer
├── products/        # ProductCard, ProductGrid, StockBadge, etc.
├── cart/            # AddToCartButton, CartItem, CartSummary
└── checkout/        # CheckoutForm, OrderSummary
```

### Route Structure
```
src/app/(store)/
├── page.tsx                    # Homepage with featured products
├── products/
│   ├── page.tsx                # Product catalog
│   └── [slug]/page.tsx         # Product detail
├── cart/page.tsx               # Shopping cart
└── checkout/
    ├── page.tsx                # Checkout form
    └── success/page.tsx        # Order confirmation
```

### API Routes
- `POST /api/orders` - Create new order in Airtable

## Theme Customization

The application uses a rose/pink color scheme optimized for a makeup/cosmetics store:
- Primary: Rose pink (#E94B8C)
- Secondary: Light rose (#FAF0F4)
- Accent: Vibrant pink (#F94892)
- Custom scrollbar styling with brand colors
- Full dark mode support

All colors defined in `src/app/globals.css` using CSS variables in the `@layer base` section.
