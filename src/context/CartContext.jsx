/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext()

const localCart = JSON.parse(localStorage.getItem("cart")) || []

export const CartProvider = ({children}) => {

	/*
	Cart structure
	[
		{
			item: itemID,
			quantity: number
		}
	]
	*/

	const [cart, setCart] = useState(localCart)

	useEffect( () => {
		console.log(cart)
		localStorage.setItem("cart", JSON.stringify(cart))
	}, [cart])

	// Receives the id of the item that is to be added
	// and hoy many of this items should be added
	const addToCart = (item, quantity) => {

		let newCart = cart	
		// Checks if the item is already in the cart
		const inCart = newCart.find((prod) => prod.id == item.id)

		if(inCart){
			inCart.quantity += quantity
		} else{
			newCart.push ( {...item, quantity} )
		}

		setCart(newCart)

		console.log(cart)
	}

	const removeFromCart = (item, quantity) => {
		let newCart = cart
		const indexOfProduct = newCart.indexOf(item)
		console.log(indexOfProduct)
		console.log(item)
		if(indexOfProduct != -1){
			if(newCart[indexOfProduct].quantity > quantity){
				newCart[indexOfProduct].quantity-=quantity
			} else {
				newCart.splice(indexOfProduct, 1)
			}
		}
		console.log(newCart)
		setCart(newCart)
	}

	const itemsInCart = () => {
		let number = cart.reduce((count, prod) => count + prod.quantity, 0)
		return number
	}

	const cartValue = () => {
		let fullPrice = cart.reduce((price, prod) => price + prod.quantity*prod.price, 0)
		return fullPrice
	}

	return (
		<CartContext.Provider value={ {cart, addToCart, itemsInCart, cartValue, removeFromCart} }>
			{children}
		</CartContext.Provider>
	)

}

