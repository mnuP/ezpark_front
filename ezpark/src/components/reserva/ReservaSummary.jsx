import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const ReservaSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true);
            onConfirm();
        }, 3000);
    };

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/Reserva-success");
        }
    }, [isBookingConfirmed, navigate]);

    return (
        <div className="row">
            <div className="col-md-6"></div>
            <div className="card card-body mt-5">
                <h4 className="card-title hotel-color">Reservation Summary</h4>
                <p>
                    Name: <strong>{booking.customerName}</strong>
                </p>
                <p>
                    Email: <strong>{booking.customerEmail}</strong>
                </p>
                <p>
                    Check-in Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
                </p>
                <p>
                    Check-out Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
                </p>

                {payment > 0 ? (
                    <>
                        <p>
                            Total payment: <strong>${payment}</strong>
                        </p>

                        {isFormValid && !isBookingConfirmed ? (
                            <Button variant="success" onClick={handleConfirmBooking} disabled={isProcessingPayment}>
                                {isProcessingPayment ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm mr-2"
                                            role="status"
                                            aria-hidden="true"></span>
                                        Booking Confirmed, redirecting to payment...
                                    </>
                                ) : (
                                    "Confirm Booking & proceed to payment"
                                )}
                            </Button>
                        ) : isBookingConfirmed ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : (
                    <p className="text-danger">La fecha de salida debe ser después de la fecha de entrada.</p>
                )}
            </div>
        </div>
    );
};

export default ReservaSummary;
