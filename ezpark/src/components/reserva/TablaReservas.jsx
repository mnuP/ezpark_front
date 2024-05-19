import { parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import DateSlider from "../componente/SliderFecha";

const TablaReservas = ({ reservationInfo, handleReservationCancellation }) => {
    const [reservas, setReservas] = useState(reservationInfo);


    return (
        <section className="p-4">
            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>ID de Reserva</th>
                        <th>Fecha de Entrada</th>
                        <th>Fecha de Salida</th>
                        <th>Placa</th>
                        
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {reservas.map((reservation, index) => (
                        <tr key={reservation.id}>
                            <td>{index + 1}</td>
                            <td>{reservation.id}</td>
                            <td>{reservation.horaInicio}</td>
                            <td>{reservation.horaFin}</td>
                            <td>{reservation.matriculaVehiculo}</td>
                            
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
            {reservas.length === 0 && <p>Reservas no encontradas para la fecha seleccionada</p>}
        </section>
    );
};

export default TablaReservas;
