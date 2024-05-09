import { parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import DateSlider from "../common/SliderFecha";

const TablaReservas = ({ reservationInfo, handleReservationCancellation }) => {
    const [filteredReservations, setFilteredReservations] = useState(reservationInfo);

    const filterReservations = (startDate, endDate) => {
        let filtered = reservationInfo;
        if (startDate && endDate) {
            filtered = reservationInfo.filter((reservation) => {
                const reservationStartDate = parseISO(reservation.checkInDate);
                const reservationEndDate = parseISO(reservation.checkOutDate);
                return (
                    reservationStartDate >= startDate &&
                    reservationEndDate <= endDate &&
                    reservationEndDate > startDate
                );
            });
        }
        setFilteredReservations(filtered);
    };

    useEffect(() => {
        setFilteredReservations(reservationInfo);
    }, [reservationInfo]);

    return (
        <section className="p-4">
            <DateSlider onDateChange={filterReservations} onFilterChange={filterReservations} />
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>ID de Reserva</th>
                        <th>Fecha de Entrada</th>
                        <th>Fecha de Salida</th>
                        <th>Placa</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {filteredReservations.map((reservation, index) => (
                        <tr key={reservation.id}>
                            <td>{index + 1}</td>
                            <td>{reservation.id}</td>
                            <td>{reservation.checkInDate}</td>
                            <td>{reservation.checkOutDate}</td>
                            <td>{reservation.vehiclePlate}</td>
                            <td>{reservation.guestName}</td>
                            <td>{reservation.guestEmail}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleReservationCancellation(reservation.id)}>
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredReservations.length === 0 && <p>Reservas no encontradas para la fecha seleccionada</p>}
        </section>
    );
};

export default TablaReservas;
