import React, { useState, useEffect } from "react"
import BookingForm from "../reserva/ReservaForm"
import { AiFillCar } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { getParqueaderoById } from "../utils/ApiFunctions"
import ParqueaderosCarrusel from "../common/ParqueaderosCarrusel"

const Checkout = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [parkingSpaceInfo, setParkingSpaceInfo] = useState({
        photo: "",
        type: "",
        pricePerHour: "",
        services: []
    })

    const { spaceId } = useParams()

    useEffect(() => {
        getParqueaderoById(spaceId)
            .then((response) => {
                setParkingSpaceInfo(response)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error)
                setIsLoading(false)
            })
    }, [spaceId])

    return (
        <div>
            <section className="container">
                <div className="row">
                    <div className="col-md-4 mt-5 mb-5">
                        {isLoading ? (
                            <p>Cargando información del parqueadero...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="space-info">
                                <img
                                    src={`data:image/png;base64,${parkingSpaceInfo.photo}`}
                                    alt="Parking Space photo"
                                    style={{ width: "100%", height: "200px" }}
                                />
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Type:</th>
                                            <td>{parkingSpaceInfo.type}</td>
                                        </tr>
                                        <tr>
                                            <th>Price per hour:</th>
                                            <td>${parkingSpaceInfo.pricePerHour}</td>
                                        </tr>
                                        <tr>
                                            <th>Services:</th>
                                            <td>
                                                <ul className="list-unstyled">
                                                    {parkingSpaceInfo.services.map((service, index) => (
                                                        <li key={index}>{service}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <BookingForm />
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
