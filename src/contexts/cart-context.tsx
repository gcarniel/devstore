'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface CartItem {
  productId: number
  quantity: number
}

interface CartContextProps {
  items: CartItem[]
  addToCart: (productId: number) => void
}

const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(productId: number) {
    const existingItem = cartItems.some((item) => item.productId === productId)

    if (existingItem) {
      return setCartItems((prev) => {
        return prev.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 }
          }

          return item
        })
      })
    }

    setCartItems((prev) => [...prev, { productId, quantity: 1 }])
  }

  return (
    <CartContext.Provider value={{ addToCart, items: cartItems }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
