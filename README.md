# 💄 GlamStore - Makeup Online Store

A beautiful, modern makeup e-commerce catalog built with Next.js 16, featuring Airtable backend, shopping cart functionality, and a stunning rose/pink theme.

![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

- 🛍️ **Product Catalog** - Browse makeup products with filtering and search
- 🛒 **Shopping Cart** - Full cart functionality with persistent state
- 📱 **Responsive Design** - Beautiful on all devices
- 🎨 **Rose/Pink Theme** - Cosmetic-focused color scheme
- 📦 **Stock Management** - Real-time stock status indicators
- 💳 **Checkout Flow** - Complete order process with form validation
- 🗄️ **Airtable Backend** - Easy product and order management
- ⚡ **Performance Optimized** - React Compiler & Server Components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- An Airtable account (free tier works!)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Airtable:**

   Follow the detailed guide in [SETUP.md](./SETUP.md) to:
   - Create your Airtable base
   - Set up the three required tables
   - Get your credentials

3. **Configure environment variables:**

   Update `.env.local` with your Airtable credentials:
   ```env
   AIRTABLE_PERSONAL_TOKEN=your_token_here
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   ```

4. **Run the setup script:**
   ```bash
   npm run setup
   ```

   This populates your Airtable with demo categories and products!

5. **Start the dev server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**

   Visit [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run Biome linter
npm run format   # Format code with Biome
npm run setup    # Populate Airtable with demo data
```

## 🏗️ Tech Stack

- **Framework:** Next.js 16.1.0 with App Router
- **UI Library:** React 19.2.3
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui
- **Database:** Airtable
- **State Management:** Zustand (cart)
- **Forms:** React Hook Form + Zod
- **Language:** TypeScript
- **Code Quality:** Biome

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (store)/           # Store pages
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Header, Footer, etc.
│   │   ├── products/          # Product components
│   │   ├── cart/              # Cart components
│   │   └── checkout/          # Checkout components
│   ├── lib/                   # Utilities & Airtable client
│   ├── store/                 # Zustand stores
│   └── types/                 # TypeScript types
├── scripts/
│   └── setup-airtable.js      # Airtable setup script
└── public/                    # Static assets
```

## 🎨 Customization

### Changing Colors

Edit `src/app/globals.css` to customize the rose/pink theme:

```css
:root {
  --primary: 346 77% 58%;     /* Rose pink */
  --secondary: 332 45% 95%;   /* Light rose */
  --accent: 350 89% 60%;      /* Vibrant pink */
}
```

### Adding Products

Add products directly in Airtable - they'll appear on your site immediately!

### Custom Branding

1. Update store name in `src/components/layout/Header.tsx`
2. Replace logo/favicon in `public/`
3. Update site name in `.env.local`

## 🗄️ Airtable Schema

### Categories
- Product categories (Lipsticks, Eyeshadow, etc.)
- Linked to products

### Products
- Full product details
- Images, pricing, stock
- Category associations

### Orders
- Customer information
- Order items (JSON)
- Payment & order status

See [SETUP.md](./SETUP.md) for detailed schema.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `AIRTABLE_PERSONAL_TOKEN`
   - `AIRTABLE_BASE_ID`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy!

The app is optimized for Vercel's platform with automatic builds and deployments.

## 📝 Development Notes

- **React Compiler Enabled:** Manual memoization not needed
- **Server Components:** Used by default for better performance
- **Biome:** Replaces ESLint + Prettier
- **Tailwind CSS 4:** CSS-first configuration

See [CLAUDE.md](./CLAUDE.md) for detailed architecture notes.

## 🤝 Contributing

This is a template project. Feel free to:
- Fork and customize for your needs
- Report issues
- Suggest improvements

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🆘 Support

- Check [SETUP.md](./SETUP.md) for setup help
- Review [CLAUDE.md](./CLAUDE.md) for architecture details
- Airtable docs: https://airtable.com/developers/web/api

---

Built with ❤️ using Next.js, Tailwind CSS, and Airtable
