/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { NotFound } from './NotFound'
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export const ItemDetailContainer = () => {

  const [product, setProduct] = useState()
  let {itemId} = useParams()


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
        <button>Add to cart</button>
      </div> : <NotFound />}
    </div>
  )
}
  