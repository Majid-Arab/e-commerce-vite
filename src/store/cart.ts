import { create } from "zustand";
import { Product } from "../type";
import { persist } from "zustand/middleware";

type CartState = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
};

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) => {
        console.log(product);
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === product.id
          );
          if (!existingProduct) {
            return { cart: [...state.cart, product] };
          }
          return state;
        });
      },
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== productId),
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
