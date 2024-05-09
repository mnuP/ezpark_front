import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl, Button } from "react-bootstrap";
import BookingSummary from "./ReservaSummary";
import { saveReserva, getParqueaderoById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const ReservaForm = () => {
    const [validated, setValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [parkingSpacePrice, setParkingSpacePrice] = useState(0);

    const currentUser = localStorage.getItem("userId");

    const [booking, setBooking] = useState({
        customerName: "",
        customerEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        vehiclePlateNumber: ""
    });

    const { spaceId } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };

    const getParkingSpacePriceById = async (spaceId) => {
        try {
            const response = await getParqueaderoById(spaceId); // Ajustar para obtener el precio de un espacio de estacionamiento
            setParkingSpacePrice(response.price);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getParkingSpacePriceById(spaceId);
    }, [spaceId]);

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffInDays = checkOutDate.diff(checkInDate, "days");
        const paymentPerDay = parkingSpacePrice ? parkingSpacePrice : 0;
        return diffInDays * paymentPerDay;
    };

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("La fecha de salida debe ser después de la fecha de entrada");
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false || !isCheckOutDateValid()) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
        setValidated(true);
    };

    const handleFormSubmit = async () => {
        try {
            const confirmationCode = await saveReserva(spaceId, booking); // Ajustar para reservar un espacio de estacionamiento
            setIsSubmitted(true);
            navigate("/booking-success", { state: { message: confirmationCode } });
        } catch (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
            navigate("/booking-success", { state: { error: errorMessage } });
        }
    };

    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mt-5">
                            <h4 className="card-title">Reserve Parking Space</h4>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                {}
                            </Form>
                        </div>
                    </div>

                    <div className="col-md-4">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                onConfirm={handleFormSubmit}
                                isFormValid={validated}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReservaForm;
