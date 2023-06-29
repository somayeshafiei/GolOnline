import { DateObject } from 'react-multi-date-picker';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface CartItem {
  product: string;
  count: number;
}

interface CartState {
  products: CartItem[];
  deliveryDate: any;
  setDeliveryDate: (newDate: any) => void;
  addToCart: (product: string) => void;
  removeFromCart: (product: string) => void;
  increaseItemCount: (product: string) => void;
  decreaseItemCount: (product: string) => void;
  clearState: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      deliveryDate: '',
      clearState: () => set({ products: [], deliveryDate: '' }),
      setDeliveryDate: (newDate: any) => set(() => ({ deliveryDate: newDate })),
      products: [],
      addToCart: (product: string) =>
        set((state) => {
          const itemIndex = state.products.findIndex(
            (item) => item.product === product
          );
          if (itemIndex === -1) {
            return { products: [...state.products, { product, count: 1 }] };
          } else {
            const updatedProducts = [...state.products];
            updatedProducts[itemIndex].count += 1;
            return { cartItems: updatedProducts };
          }
        }),
      removeFromCart: (product: string) =>
        set((state) => ({
          products: state.products.filter((item) => item.product !== product),
        })),
      increaseItemCount: (product: string) =>
        set((state) => {
          const itemIndex = state.products.findIndex(
            (item) => item.product === product
          );
          if (itemIndex === -1) {
            return state;
          } else {
            const updatedCartItems = [...state.products];
            updatedCartItems[itemIndex].count += 1;
            return { products: updatedCartItems };
          }
        }),
      decreaseItemCount: (product: string) =>
        set((state) => {
          const itemIndex = state.products.findIndex(
            (item) => item.product === product
          );
          if (itemIndex === -1) {
            return state;
          } else {
            const updatedCartItems = [...state.products];
            updatedCartItems[itemIndex].count -= 1;
            if (updatedCartItems[itemIndex].count === 0) {
              updatedCartItems.splice(itemIndex, 1);
            }
            return { products: updatedCartItems };
          }
        }),
    }),
    { name: 'global', getStorage: () => localStorage }
  )
);

export default useCartStore;
