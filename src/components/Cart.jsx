/* eslint-disable no-unused-vars */

import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { CartContext } from "../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";

export const Cart = () => {
  
	const { cart, itemsInCart, cartValue, addToCart, removeFromCart } = useContext(CartContext)
	const [quantity, setQuantity] = useState(1)

	useEffect(() => {}, [cart])
  
	return (		
		<div>
			<h1>Cart</h1>
			<br />
			<div>
				<p>Total elements in cart: {itemsInCart()}</p>
				<p>Cart total price: U$S{cartValue()}</p>
			</div>
			<br />
			{cart.length > 0 ? 
			cart.map( (prod) => {
				return (
				<div key={prod.id}>
					<p>{`${prod.quantity} X ${prod.brand.brand_name} ${prod.product_name}`}</p>
					<div>
						<button onClick={() => {removeFromCart(prod, 1)}}>➖</button>
						<button onClick={() => {addToCart(prod, 1)}}>➕</button>
						<button onClick={() => {removeFromCart(prod, prod.quantity)}}>Remove all</button>
						
        </div>
				</div>
				)
			})
			:
			<div>
				<h4>No elements in cart</h4>	
			</div>}
		</div>
	)
}


