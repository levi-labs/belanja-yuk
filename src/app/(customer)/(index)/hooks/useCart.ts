import { TCart } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartState {
  products: TCart[];
  addProduct: (cart: TCart) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeProduct: (id: number) => void;
}
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (cart) =>
        set({
          products: [
            ...get().products.filter((item) => item.id !== cart.id),
            cart,
          ],
        }),
      increaseQuantity: (id) => {
        const newItem = get().products.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        set({ products: newItem });
      },
      decreaseQuantity: (id) => {
        const newItem = get().products.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            };
          }
          return item;
        });
        set({ products: newItem.filter((item) => item.quantity !== 0) });
      },
      removeProduct: (id) =>
        set({
          products: get().products.filter((item) => item.id !== id),
        }),
    }),
    {
      name: 'cart-storage', // unique name for the storage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
