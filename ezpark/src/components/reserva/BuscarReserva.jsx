import React, { useState } from "react"
import moment from "moment"
import { cancelReserva, saveReserva , getReservaById} from "../utils/ApiFunctions"

const BuscarReserva = () => {
    const [idState, setIdState] = useState("")
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [reservationInfo, setReservationInfo] = useState({
        id: "",
        dia: "",
        horaInicio: "",
        horaFin: "",
        matriculaVehiculo: "",
        idUsuario: "",
        idEspacio: "",
    })

    const emptyReservationInfo = {
        id: "",
        dia: "",
        horaInicio: "",
        horaFin: "",
        matriculaVehiculo: "",
        idUsuario: "",
        idEspacio: "",
    }

    const [isDeleted, setIsDeleted] = useState(false)

    const handleInputChange = (event) => {
        setIdState(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        /*try {
            const data = await saveReserva(dia)
            setReservationInfo(data)
            setError(null)
        } catch (error) {
            setReservationInfo(emptyReservationInfo)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }*/

        try {
            const data = await getReservaById(idState)
            console.log(data)
            setReservationInfo(data)
            setError(null)
        } catch (error) {
            setReservationInfo(emptyReservationInfo)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }

        setTimeout(() => setIsLoading(false), 2000)
    }

    const handleReservationCancellation = async () => {
        try {
            await cancelReserva(reservationInfo.id)
            setIsDeleted(true)
            setSuccessMessage("Se cancelo la reserva")
            setReservationInfo(emptyReservationInfo)
            setError(null)
        } catch (error) {
            setError(error.message)
        }

        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }

    return (
        <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center mb-4">Encontrar mi reserva</h2>
            <form onSubmit={handleFormSubmit} className="col-md-6">
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        type="text"
                        id="id"
                        name="id"
                        value={idState}
                        onChange={handleInputChange}
                        placeholder="Ingrese el código de la reserva"
                    />

                    <button type="submit" className="btn btn-hotel input-group-text">
                        Buscar Reserva
                    </button>
                </div>
            </form>

            {isLoading ? (
                <div>Buscando tu reserva...</div>
            ) : error ? (
                <div className="text-danger">Error: {error}</div>
            ) : reservationInfo.id ? (
                <div className="col-md-6 mt-4 mb-5">
                    <h3>Información de Reserva</h3>
                    <p className="text-success">Código de Reserva: {reservationInfo.id}</p>
                    <p>Dia de la Reserva: {(reservationInfo.dia)}</p>
                    <p>Hora de Entrada: {(reservationInfo.horaInicio)}</p>
                    <p>Hora de Salida: {(reservationInfo.horaFin)}</p>
                    <p>Vehiculo: {reservationInfo.matriculaVehiculo}</p>
                    <p>Id Usuario: {reservationInfo.idUsuario}</p>
                    <p>Codigo Espacio: {reservationInfo.idEspacio}</p>

                    {!isDeleted && (
                        <button onClick={handleReservationCancellation} className="btn btn-danger">
                            Cancelar Reserva
                        </button>
                    )}
                </div>
            ) : (
                <div>Buscar Reserva...</div>
            )}

            {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
        </div>
    )
}

export default BuscarReserva
