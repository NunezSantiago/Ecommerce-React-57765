import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

export const FinalizePurchase = () => {

	const {register, handleSubmit} = useForm()

	const { cart, itemsInCart, cartValue, clearCart } = useContext(CartContext)

	const purchase = (data) => {

		Swal.fire({
			title: "Would you like to complete thie purchase?",
			text: `Total cost: U$S${cartValue()}`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes"
		}).then((result) => {
			if (result.isConfirmed) {
				const ticketRef = collection(db, "ticket")
				addDoc(ticketRef, {
					"purchaser_name": data.name,
					"purchaser_last_name": data.last_name,
					"purchaser_phone_number": data.phone_number,
					"purchaser_email": data.email,
					date: new Date(),
					value: cartValue(),
					numberOfItems: itemsInCart(),
					items: cart
				})
				.then((res) => {
					clearCart()
					Swal.fire({
						title: "Thank you!",
						text: `Your purchase id is ${res.id}`,
						icon: "success"
					});
				})
			}
		});

		
	}
    
	return (
		<div className="purchaseForm">
			<form onSubmit={handleSubmit(purchase)}>
				<div className="formItem">
					<input type="text" required placeholder="Name" {...register("name")}/>
				</div>
				<div className="formItem">
					<input type="text" required placeholder="Last name" {...register("last_name")}/>
				</div>
				<div className="formItem">
					<input type="text" required placeholder="Phone number" {...register("phone_number")} />
				</div>
				<div className="formItem">
					<input type="email" required placeholder="Email" {...register("email")}/>
				</div>
				<div className="formItem">
					<button type="Submit">Finalize purchase</button>
				</div>
			</form>
		</div>
	)
}
