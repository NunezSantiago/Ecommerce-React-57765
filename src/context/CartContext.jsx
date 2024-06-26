/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { createContext } from "react";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const CartContext = createContext()

const localCart = JSON.parse(localStorage.getItem("cart")) || []

export const CartProvider = ({children}) => {

	const [cart, setCart] = useState(localCart)

	useEffect( () => {
		console.log(cart)
		localStorage.setItem("cart", JSON.stringify(cart))
	}, [cart])

	// Receives the id of the item that is to be added
	// and hoy many of this items should be added
	const addToCart = (item, quantity) => {

		let newCart = [...cart]  // Create a copy of the current cart

		// Checks if the item is already in the cart
		const inCart = newCart.find((prod) => prod.id == item.id)

		if(inCart){
			inCart.quantity += quantity
		} else{
			newCart.push ( {...item, quantity} )
		}

		setCart(newCart)

		Toastify({
			text: "Product added to cart",
			duration: 2000,
			style: {
				background: "linear-gradient(to right, #00b09b, #96c93d)",
			}
			}).showToast();
	}

	const removeFromCart = (item, quantity) => {

		let newCart = [...cart]  // Create a copy of the current cart

        const indexOfProduct = newCart.findIndex((prod) => prod.id === item.id)
		
		if(indexOfProduct != -1){
			if(newCart[indexOfProduct].quantity > quantity){
				newCart[indexOfProduct].quantity-=quantity
			} else {
				newCart.splice(indexOfProduct, 1)
			}
		}

		setCart(newCart)

		Toastify({
			text: "Product removed from cart",
			duration: 2000,
			style: {
				background: "linear-gradient(to right, #ED213A, #93291E)",
			}
			}).showToast();
	}

	const itemsInCart = () => {
		let number = cart.reduce((count, prod) => count + prod.quantity, 0)
		return number
	}

	const cartValue = () => {
		let fullPrice = cart.reduce((price, prod) => price + prod.quantity*prod.price, 0)
		return fullPrice
	}

	const clearCart = () =>{
		setCart([])
	}

	return (
		<CartContext.Provider value={ {cart, addToCart, itemsInCart, cartValue, removeFromCart, clearCart} }>
			{children}
		</CartContext.Provider>
	)

}

