/* eslint-disable no-unused-vars */

import data from "../data/products.json"
import brands from "../data/brands.json"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { NotFound } from './NotFound'

export const ItemDetailContainer = () => {

  const [product, setProduct] = useState()
  let {itemId} = useParams()

  const getProducts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 500)
    })
  }
  useEffect(() => {
    getProducts()
    .then((res) => {
      let item = res.data.find((prod) => prod.id == itemId)
      setProduct(item)
    })
  }, [itemId])

  return (
    <div>
      {product ? 
      <div>
        <h1>{`${product.brand_name} ${product.phone_name}`}</h1>
        <img src={product.image_url} alt={`${product.brand_name} ${product.phone_name}`} />
        <p>{product.description}</p>
        <p>U$S1200</p>
        <button>Add to cart</button>
      </div> : <NotFound />}
    </div>
  )
}
  