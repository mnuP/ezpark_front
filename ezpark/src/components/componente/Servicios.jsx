import React from "react"
import { Row } from "react-bootstrap"
import Header from "./Header"
import {
	FaClock,
} from "react-icons/fa"

const Servicios = () => {
	return (
		<>
			<div className="mb-2">
				<Header title={"Servicios de parqueo"} />

				<Row className="mt-4">
					<h4 className="text-center">
						Servicio 1 <span className="park-color"> Ezparking - </span> Parqueadero 
						<span className="gap-2">
							<FaClock className="ml-5" /> Las 24 horas
						</span>
					</h4>
				</Row>
				<hr />
			</div>
			<hr />
		</>
	)
}

export default Servicios