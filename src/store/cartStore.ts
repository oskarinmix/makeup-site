import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartState } from '@/types/cart';
import type { Product } from '@/types/product';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + quantity,
                        product['Stock Quantity']
                      ),
                    }
                  : item
              ),
            };
          }

          const newItem: CartItem = {
            productId: product.id,
            name: product.Name,
            price: product.Price,
            quantity: Math.min(quantity, product['Stock Quantity']),
            image: product.Images?.[0]?.url,
            slug: product.Slug,
            stockQuantity: product['Stock Quantity'],
          };

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: Math.min(quantity, item.stockQuantity),
                }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'makeup-cart-storage',
    }
  )
);
