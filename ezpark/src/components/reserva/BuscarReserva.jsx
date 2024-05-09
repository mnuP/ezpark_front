import React, { useState } from "react"
import moment from "moment"
import { cancelReserva, saveReserva } from "../utils/ApiFunctions"

const BuscarReserva = () => {
    const [confirmationCode, setConfirmationCode] = useState("")
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [reservationInfo, setReservationInfo] = useState({
        id: "",
        confirmationCode: "",
        parkingSpace: { id: "", type: "" },
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        carPlate: "",
        phoneNumber: ""
    })

    const emptyReservationInfo = {
        id: "",
        confirmationCode: "",
        parkingSpace: { id: "", type: "" },
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        carPlate: "",
        phoneNumber: ""
    }

    const [isDeleted, setIsDeleted] = useState(false)

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const data = await saveReserva(confirmationCode)
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
            setSuccessMessage("Reservation has been cancelled successfully!")
            setReservationInfo(emptyReservationInfo)
            setConfirmationCode("")
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
                        id="confirmationCode"
                        name="confirmationCode"
                        value={confirmationCode}
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
            ) : reservationInfo.confirmationCode ? (
                <div className="col-md-6 mt-4 mb-5">
                    <h3>Información de Reserva</h3>
                    <p className="text-success">Código de confirmación: {reservationInfo.confirmationCode}</p>
                    <p>Espacio: {reservationInfo.parkingSpace.type}</p>
                    <p>Fecha de Entrada: {moment(reservationInfo.checkInDate).format("MMM Do, YYYY")}</p>
                    <p>Fecha de Salida: {moment(reservationInfo.checkOutDate).format("MMM Do, YYYY")}</p>
                    <p>Nombre: {reservationInfo.guestName}</p>
                    <p>Email: {reservationInfo.guestEmail}</p>
                    <p>Placa: {reservationInfo.carPlate}</p>
                    <p>Teléfono: {reservationInfo.phoneNumber}</p>

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
