import React from "react"
import { Link, useLocation } from "react-router-dom"
import Header from "../common/Header"

const ReservaSuccess = () => {
	const location = useLocation()
	const message = location.state?.message
	const error = location.state?.error
	return (
		<div className="container">
			<Header title="Reserva-Success" />
			<div className="mt-5">
				{message ? (
					<div>
						<h3 className="text-success"> Reserva exitosa!</h3>
						<p className="text-success">{message}</p>
					</div>
				) : (
					<div>
						<h3 className="text-danger"> Error en la reserva!</h3>
						<p className="text-danger">{error}</p>
						
					</div>
				)}
			</div>
		</div>
	)
}

export default ReservaSuccess