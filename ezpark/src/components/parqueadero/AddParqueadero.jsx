import React, { useState } from "react";
import { addNewParqueadero } from "../api/ApiFunctions";
import { Link } from "react-router-dom";

const AddParqueadero = () => {
    const currentUser = localStorage.getItem("idUsuario");
    const [newParqueadero, setNewParqueadero] = useState({
        idAdministrador: currentUser,
        nombre: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewParqueadero({ ...newParqueadero, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addNewParqueadero(newParqueadero.idAdministrador, newParqueadero.nombre);
            if (response !== undefined) {
                setSuccessMessage("parqueadero añadido exitosamente!");
                setNewParqueadero({ idAdministrador: "", nombre: "" });
                setErrorMessage("");
            } else {
                setErrorMessage("Error añadiendo parqueadero");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Agregar nuevo Parqueadero</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show">{successMessage}</div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger fade show">{errorMessage}</div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="idAdministrador" className="form-label">
                                    ID Administrador:
                                </label>
                                <div>{currentUser}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">
                                    Nombre
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    name="nombre"
                                    value={newParqueadero.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-parqueadero"} className="btn btn-outline-info">
                                    Parqueaderos existentes
                                </Link>
                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Guardar Parqueadero
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddParqueadero;
