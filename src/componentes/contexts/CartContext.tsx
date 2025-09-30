import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface CartContextData {
  cart: CartProps[];
  cartAmout: number;
  addItemCart: (item: CartProps) => void;
  removeItemCart: (products: CartProps)=> void
  total: string;
}

export interface CartProps {
  cover: string;
  description: string;
  id: number;
  price: number;
  title: string;
  cartAmout: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState('')

  function addItemCart(item: CartProps) {
    const indexItem = cart.findIndex(product => product.id === item.id);

    if (indexItem !== -1) {
      let cartList = cart; 

      cartList[indexItem].cartAmout = cartList[indexItem].cartAmout + 1;
  
        cartList[indexItem].total = cartList[indexItem].cartAmout * cartList[indexItem].price;

      setCart(cartList);
      totalResultCart(cartList)
      return;
    }

    let data = {
      ...item,
      cartAmout: 1,
      total: item.price,
    };

    setCart(prevCart => [...prevCart, data]);
    totalResultCart([...cart, data])
  }
  function removeItemCart(product: CartProps){
    const indexItem = cart.findIndex(item => item.id === product.id)
    if(cart[indexItem]?.cartAmout > 1){
      let cartList = cart
      cartList[indexItem].cartAmout = cartList[indexItem].cartAmout -1
      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price
      setCart(cartList)
      totalResultCart(cartList)
      return;
    }
    const removeItem = cart.filter(item => item.id !== product.id)
    setCart(removeItem)
    totalResultCart(removeItem)
  }

  function totalResultCart(items: CartProps[]){
    let myCart = items
    let result = myCart.reduce((acc, obj)=>{return acc + obj.total}, 0)
    const format = result.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    setTotal(format)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmout: cart.length,
        addItemCart,
        removeItemCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
