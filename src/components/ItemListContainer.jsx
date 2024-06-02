/* eslint-disable no-unused-vars */

import data from "../data/products.json"
import brands from "../data/brands.json"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { NotFound } from './NotFound.jsx'

//import React from 'react'


export const ItemListContainer = () => {

  const [products, setProducts] = useState()
  const [title, setTitle] = useState()
  let { categoryId } = useParams()

  const getProducts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 500)
    })
  }

  useEffect(() => {
    getProducts()
      .then(res => {
        if(!categoryId){
          setTitle("All products")
          setProducts(res.data)
        } else{
          let category = brands.find(brand => brand.brand_id === categoryId)
          setTitle(category ? category.brand_name : "Not found")
          setProducts(res.data.filter(prod => prod.brand_id == categoryId))
        }
      })
  }, [categoryId])

  return (
    <div className="itemsContainer">

      <h1>{title}</h1>

      <div className="items">
        {products && products.length != 0 ? products.map( (product) => {
              return (
                <div className="item" key={product.id}>
                  <img src={product.image_url} alt={`${product.brand_name} ${product.phone_name}`} />
                  <br />
                  <Link to={`/item/${product.id}`}>{`${product.brand_name} ${product.phone_name}`}</Link>
                  <p>U$S1200</p>
                  <button>Add to cart</button>
                </div>
              )
            }) : <NotFound />
        }
      </div>
    </div>  
  )
}
