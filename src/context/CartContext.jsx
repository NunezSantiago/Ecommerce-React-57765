/* eslint-disable no-unused-vars */

import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext()

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

	const [cart, setCart] = useState([])

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

		console.log(cart)
	}

	return (
		<CartContext.Provider value={{cart, addToCart}}>
			{children}
		</CartContext.Provider>
	)

}

