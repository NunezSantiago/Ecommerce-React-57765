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

	// Receives the id of the item that is to be added
	// and hoy many of this items should be added
	const addToCart = (itemID, quantity) => {

		let newCart = cart	
		// Checks if the item is already in the cart
		const inCart = newCart.find((prod) => prod.itemID == itemID)

		if(inCart){
			inCart.quantity += quantity
		} else{
			newCart.push ( {itemID, quantity} )
		}

		setCart(newCart)
	}

	const itemsInCart = () => {
		let number = cart.reduce((count, prod) => count + prod.quantity, 0)
		return number
	}

	useEffect( () => {
		console.log(cart)
		localStorage.setItem("cart", JSON.stringify(cart))
	}, [cart])

	return (
		<CartContext.Provider value={{cart, addToCart, itemsInCart}}>
			{children}
		</CartContext.Provider>
	)

}

