import React from "react"
import { Link, useLocation } from "react-router-dom"
import Header from "../componente/Header"

const ReservaSuccess = () => {
	const location = useLocation()
	const message = location.state?.message
	return (
		<div className="container">
			<Header title="Tu reserva ha sido exitosa!" />
			<div className="mt-5">
				<div>
					<h3 className="text-success"> Reserva exitosa!</h3>
					<p className="text-success">{message}</p>
				</div>
			</div>
		</div>
	)
}

export default ReservaSuccess