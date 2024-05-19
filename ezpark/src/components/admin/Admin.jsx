
import React from "react"
import { Link } from "react-router-dom"

const Admin = () => {
	return (
		<section className="container mt-5">
			<h2>Bienvenido al panel de administrador</h2>
			<hr />
			<Link to={"/add-parqueadero"}>Administar Parqueaderos</Link> <br />
			<Link to={"/existing-bookings"}>Administrar reservas</Link> <br />
			<Link to={"/reports"}>Ver reportes</Link>
		</section>
	)
}

export default Admin