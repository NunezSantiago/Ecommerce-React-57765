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
  const { addToCart } = useContext(CartContext)

  //To be implemented: Stock validation
  // If quantity < stock, then sum, else do nothing
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
      setProduct({...res.data(), id: res.id})
    })

  }, [itemId])

  return (
    <div>
      {product ? 
      <div>
        <h1>{`${product.brand.brand_name} ${product.product_name}`}</h1>
        <img src={product.image_url} alt={`${product.brand.brand_name} ${product.product_name}`} />
        <p>{product.description}</p>
        <p>{`U$S${product.price}`}</p>
        
        <br />

        <div>
          <button onClick={handleSubstract}>➖</button>
          <p>{quantity}</p>
          <button onClick={handleSum}>➕</button>
        </div>

        <br />

        <button onClick={() => {addToCart(product.id, quantity)}}>Add to cart</button>

      </div> : <NotFound />}
    </div>
  )
}
  