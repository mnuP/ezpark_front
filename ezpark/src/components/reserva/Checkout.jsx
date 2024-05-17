import React, { useState, useEffect } from "react"
import ReservaForm from "../reserva/ReservaForm"
import { AiFillCar } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { getEspacioById } from "../utils/ApiFunctions"
import ParqueaderosCarrusel from "../common/ParqueaderosCarrusel"

const Checkout = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [espacioInfo, setEspacioInfo] = useState({
        id: "",
        tipo: ""
    })

    const { id } = useParams()

    useEffect(() => {
        getEspacioById(id)
            .then((response) => {
                setEspacioInfo(response)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error)
                setIsLoading(false)
            })
    }, [id])

    return (
        <div>
			<section className="container">
				<div className="row">
					<div className="col-md-4 mt-5 mb-5">
						{isLoading ? (
							<p>Cargando Informacion...</p>
						) : error ? (
							<p>{error}</p>
						) : (
							<div className="espacio-info">
								<table className="table table-bordered">
									<tbody>
										<tr>
											<th>Tipo:</th>
											<td>{espacioInfo.tipo}</td>
										</tr>
										<tr>
											<th>Codigo del Espacio:</th>
											<td>{espacioInfo.id}</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
					</div>
					<div className="col-md-8">
						<ReservaForm />
					</div>
				</div>
			</section>
			<div className="container">
				<ParqueaderosCarrusel />
			</div>
		</div>
    )
}

export default Checkout
