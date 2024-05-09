import React, { useState, useEffect } from "react";
import { cancelReserva, getAllReservas } from "../utils/ApiFunctions";
import Header from "../common/Header";
import TablaReservas from "./TablaReservas";

const ParkingReservations = () => {
    const [reservationInfo, setReservationInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            getAllReservas()
                .then((data) => {
                    setReservationInfo(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setIsLoading(false);
                });
        }, 1000);
    }, []);

    const handleReservationCancellation = async (reservationId) => {
        try {
            await cancelReserva(reservationId);
            const data = await getAllReservas();
            setReservationInfo(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section style={{ backgroundColor: "whitesmoke" }}>
            <Header title={"Parking Reservations"} />
            {error && <div className="text-danger">{error}</div>}
            {isLoading ? (
                <div>Cargando Reservas</div>
            ) : (
                <TablaReservas
                    reservationInfo={reservationInfo}
                    handleReservationCancellation={handleReservationCancellation}
                />
            )}
        </section>
    );
};

export default ParkingReservations;
