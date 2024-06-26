/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { NotFound } from './NotFound.jsx'
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase/config.js"
import { CartContext } from "../context/CartContext.jsx"



export const ItemListContainer = () => {

  const [products, setProducts] = useState([])
  const [title, setTitle] = useState("All products")
  let { brandId } = useParams()

  const { cart, addToCart } = useContext(CartContext)

  useEffect(() => {

    const productsRef = collection(db, "products")
    const q = brandId ? query(productsRef, where("brand.brand_id", "==", brandId)) : productsRef
    
    const brandsRef = collection(db, "brands")
    let catQuery = brandId && query(brandsRef, where("brand_id", "==", brandId))

    getDocs(q)
    .then( (res) => {
      setProducts(res.docs.map((doc) => {
        return {...doc.data(), id: doc.id}
      }))
    })

    if(catQuery){
      getDocs(catQuery)
      .then((res) => {
        setTitle(res.docs[0].data().brand_name)
      })
    } else {
      setTitle("All products")
    }


  }, [brandId, cart])

  console.log(products)

  return (
    <div className="itemsContainer">

      <h1>{title}</h1>

      <div className="items">
        {products && products.length != 0 ? products.map( (product) => {
              return (
                <div className="item" key={product.id}>
                  <img src={product.image_url} alt={`${product.brand.brand_name} ${product.product_name}`} />
                  <br />
                  <Link to={`/item/${product.id}`}>{`${product.brand.brand_name} ${product.product_name}`}</Link>
                  <p>{`U$S${product.price}`}</p>
                  <button onClick={() => {addToCart(product, 1)}}>Add to cart</button>
                </div>
              )
            }) : <NotFound />
        }
      </div>
    </div>  
  )
}
