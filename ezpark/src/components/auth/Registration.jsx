import React, { useState } from "react";
import { registerUser } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";

const Registration = () => {
    const [registration, setRegistration] = useState({
        nombre: "",
        apellido: "",
        email: "",
        contraseña: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        setRegistration({ ...registration, [e.target.name]: e.target.value });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const result = await registerUser(registration);
            setSuccessMessage(result);
            setErrorMessage("");
            setRegistration({ nombre: "", apellido: "", email: "", contraseña: "" });
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(`Error al registrar usuario: ${error.message}`);
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 5000);
    };

    return (
        <section className="container col-6 mt-5 mb-5">
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}

            <h2>Registro</h2>
            <form onSubmit={handleRegistration}>
                <div className="mb-3 row">
                    <label htmlFor="nombre" className="col-sm-2 col-form-label">
                        Nombre
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            className="form-control"
                            value={registration.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="apellido" className="col-sm-2 col-form-label">
                        Apellido
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="apellido"
                            name="apellido"
                            type="text"
                            className="form-control"
                            value={registration.apellido}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={registration.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="contraseña" className="col-sm-2 col-form-label">
                        Contraseña
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="contraseña"
                            className="form-control"
                            id="contraseña"
                            name="contraseña"
                            value={registration.contraseña}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
                        Registrar
                    </button>
                    <span style={{ marginLeft: "10px" }}>
                        ¿Ya tienes una cuenta? <Link to={"/login"}>Iniciar sesión</Link>
                    </span>
                </div>
            </form>
        </section>
    );
};

export default Registration;
