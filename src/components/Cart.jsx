/* eslint-disable no-unused-vars */

import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { CartContext } from "../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { FinalizePurchase } from "./FinalizePurchase.jsx";

export const Cart = () => {
  
	const { cart, itemsInCart, cartValue, addToCart, removeFromCart } = useContext(CartContext)
  
	return (		
		<div className="cartContainer">
			<h1>Cart</h1>
			<br />

			<div>
				<p>Total elements in cart: {itemsInCart()}</p>
				<p>Cart total price: U$S{cartValue()}</p>
			</div>

			<br />
			<div className="cartItemsContainer">
				<div className="cartItems">
				{
				
					cart.length > 0 ? 
						
					cart.map( (prod) => {
						return (
						<div key={prod.id} className="cartItem">
							<p>{`${prod.quantity} X ${prod.brand.brand_name} ${prod.product_name}`}</p>
							<div className="cartItemCounter">
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
					</div>
				}
				</div>

			{cart.length > 0 && <FinalizePurchase />}
			
			</div>

		</div>
	)
}


