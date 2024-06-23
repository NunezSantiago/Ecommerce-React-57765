// import React from 'react'

import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"

export const CartWidget = () => {

  const { itemsInCart, cartValue } = useContext(CartContext)

  return (
    <div className="cart">
      <Link to="/cart">
        🛒{itemsInCart()} U$S{cartValue()}
      </Link>
    </div>
  )
}
