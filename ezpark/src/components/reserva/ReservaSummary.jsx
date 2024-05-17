import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const ReservaSummary = ({booking, onConfirm}) => {

    const handleConfirmBooking = () => {
		onConfirm()
	}

    return (
        <div className="row">
            <div className="col-md-6"></div>
            <div className="card card-body mt-5">
                <h4 className="card-title park-color">Procesando reserva... </h4>
                <p>
                    Usuario: <strong>{booking.idUsuario}</strong>
                </p>
                <p>
                    Espacio: <strong>{booking.idEspacio}</strong>
                </p>
                <p>
                    Dia Reserva: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
                </p>

                <Button variant="success" onClick={handleConfirmBooking}>							
				    Reservar			
				</Button>
            </div>

        </div>
    );
};

export default ReservaSummary;
