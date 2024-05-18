import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl, Button } from "react-bootstrap";
import BookingSummary from "./ReservaSummary";
import { saveReserva, getParqueaderoById } from "../api/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../seguridad/AuthProvider";

const ReservaForm = () => {
    const [validated, setValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const currentUser = localStorage.getItem("idUsuario");
    const { id } = useParams()

    const [booking, setBooking] = useState({
        idUsuario: currentUser,
        idEspacio: id,
        dia: "",
        horaInicioReserva: "",
        horaFinReserva: "",
        matricula: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
        setValidated(true);
    };

    const handleFormSubmit = async () => {
        try {
            const confirmationCode = await saveReserva(id, booking);
            setIsSubmitted(true);
            navigate("/reserva-exitosa", { state: { message: confirmationCode } });
        } catch (error) {
            alert("Horario no Disponible");
            const errorMessage = error.message;
            console.log(errorMessage);
        }
    };

    return (
        <>
			<div className="container mb-5">
				<div className="row">
					<div className="col-md-6">
						<div className="card card-body mt-5">
							<h4 className="card-title">Reservar Parqueadero</h4>

							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								

								<fieldset style={{ border: "2px" }}>
									<legend>Seleccione: </legend>
									<div className="row">
										<div className="col-6">
											<Form.Label htmlFor="dia" className="park-color">
												Día de la Reserva
											</Form.Label>
											<FormControl
												required
												type="date"
												id="dia"
												name="dia"
												value={booking.dia}
												placeholder="DiaReserva"
												min={moment().format("MMM Do, YYYY")}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Selecciona un Dia para la reserva.
											</Form.Control.Feedback>
										</div>
									</div>
								</fieldset>

								<fieldset style={{ border: "2px" }}>
									<legend>Informacion de la Reserva</legend>
									<div className="row">
										<div className="col-6">
											<Form.Label htmlFor="horaInicioReserva" className="park-color">
												Hora de Inicio
											</Form.Label>
											<FormControl
												required
												type="number"
												id="horaInicioReserva"
												name="horaInicioReserva"
												value={booking.horaInicioReserva}
												min={5}
												placeholder="0"
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Hora minima: 5am.
											</Form.Control.Feedback>
										</div>
										<div className="col-6">
											<Form.Label htmlFor="horaFinReserva" className="park-color">
												Hora de Fin
											</Form.Label>
											<FormControl
												required
												type="number"
												id="horaFinReserva"
												name="horaFinReserva"
												value={booking.horaFinReserva}
												placeholder="0"
												min={6}
                                                max={21}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Seleccione una hora entre las 6 y 21 horas
											</Form.Control.Feedback>
										</div>
                                        <div className="col-6">
											<Form.Label htmlFor="matricula" className="park-color">
												matricula del vehiculo
											</Form.Label>
											<FormControl
												required
												type="text"
												id="matricula"
												name="matricula"
												value={booking.matricula}
												min={5}
												placeholder="AAA000"
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Hora mínima: 5am.
											</Form.Control.Feedback>
										</div>
									</div>
								</fieldset>

								<div className="fom-group mt-2 mb-2">
									<button type="submit" className="btn btn-park">
										Continuar
									</button>
								</div>
							</Form>
						</div>
					</div>

					<div className="col-md-4">
						{isSubmitted && (
							<BookingSummary
								booking={booking}
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
