import Cart from "@/pages/cart";
import { useContext, createContext, useReducer, useEffect } from "react";

// Types
interface CartContextType {
  cart: Cart[];
  addToCart: (product: Cart) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
}

type Action =
  | { type: "set"; cart: Cart[] }
  | { type: "updated_qty"; id: number; qty: number }
  | {
      type: "added";
      product: Cart;
    }
  | {
      type: "removed";
      id: number;
    };

// Cart context
const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQty: () => {},
});

// Cart reducer
const initialCart: Cart[] = [];

function cartReducer(state: Cart[], action: Action) {
  switch (action.type) {
    case "set": {
      return action.cart;
    }

    case "updated_qty": {
      const product = state.find((value) => value.id === action.id);
      if (product) {
        product.quantity = action.qty;
        const updatedCart = state.filter((value) => value.id !== action.id);
        return [...updatedCart, product];
      }

      return state;
    }

    case "added": {
      return [...state, action.product];
    }

    case "removed": {
      return state.filter((val) => val.id !== action.id);
    }

    default:
      throw Error("Unknown action");
  }
}

function CartContextProvider({ children }: { children: JSX.Element }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Add to cart
  const addToCart = (product: Cart) => {
    dispatch({ type: "added", product });
    alert("Added to cart!");
  };

  // Remove from cart
  const removeFromCart = (id: number) => {
    dispatch({ type: "removed", id });
    alert("Removed from cart!");
  };

  // Update quantity
  const updateQty = (id: number, qty: number) => {
    dispatch({ type: "updated_qty", id, qty });
  };

  // Set cart stored in localstorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (!cart.length && storedCart) {
      dispatch({ type: "set", cart: JSON.parse(storedCart) });
    }
  }, []);

  // Store updated cart
  useEffect(() => {
    if (cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const contextValues: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
export const useCart = () => useContext(CartContext);
