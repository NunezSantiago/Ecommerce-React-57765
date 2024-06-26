/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { NotFound } from './NotFound'
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import { CartContext } from "../context/CartContext"

export const ItemDetailContainer = () => {

  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  let {itemId} = useParams()
  const { cart, addToCart } = useContext(CartContext)

  const handleSum = () => {
    setQuantity(quantity + 1)
  }

  const handleSubstract = () => {
    quantity > 1 && setQuantity(quantity - 1)
  }


  useEffect(() => {

    const productRef = itemId && doc(db, "products", itemId)
    getDoc(productRef)
    .then ((res) => {
      res.data() && setProduct({...res.data(), id: res.id})
    })

  }, [itemId])

  return (
    <div className="itemDetailContainer">
      {product ? 
      <div className="itemDetail">
        <h1>{`${product.brand.brand_name} ${product.product_name}`}</h1>
        <img src={product.image_url} alt={`${product.brand.brand_name} ${product.product_name}`} />
        <p>{product.description}</p>
        <p>{`U$S${product.price}`}</p>

        <div className="itemCounter">
          <button onClick={handleSubstract}>➖</button>
          <p className="quantitySelector">{quantity}</p>
          <button onClick={handleSum}>➕</button>
        </div>

        <button onClick={() => {addToCart(product, quantity)}}>Add to cart</button>

      </div> : <NotFound />}
    </div>
  )
}
  