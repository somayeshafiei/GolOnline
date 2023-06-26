import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface CartItem {
  productId: string;
  count: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  increaseItemCount: (productId: string) => void;
  decreaseItemCount: (productId: string) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (productId: string) =>
        set((state) => {
          const itemIndex = state.cartItems.findIndex(
            (item) => item.productId === productId
          );
          if (itemIndex === -1) {
            return { cartItems: [...state.cartItems, { productId, count: 1 }] };
          } else {
            const updatedCartItems = [...state.cartItems];
            updatedCartItems[itemIndex].count += 1;
            return { cartItems: updatedCartItems };
          }
        }),
      removeFromCart: (productId: string) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.productId !== productId
          ),
        })),
      increaseItemCount: (productId: string) =>
        set((state) => {
          const itemIndex = state.cartItems.findIndex(
            (item) => item.productId === productId
          );
          if (itemIndex === -1) {
            return state;
          } else {
            const updatedCartItems = [...state.cartItems];
            updatedCartItems[itemIndex].count += 1;
            return { cartItems: updatedCartItems };
          }
        }),
      decreaseItemCount: (productId: string) =>
        set((state) => {
          const itemIndex = state.cartItems.findIndex(
            (item) => item.productId === productId
          );
          if (itemIndex === -1) {
            return state;
          } else {
            const updatedCartItems = [...state.cartItems];
            updatedCartItems[itemIndex].count -= 1;
            if (updatedCartItems[itemIndex].count === 0) {
              updatedCartItems.splice(itemIndex, 1);
            }
            return { cartItems: updatedCartItems };
          }
        }),
    }),
    { name: 'global', getStorage: () => localStorage },
  ),
);

export default useCartStore;
