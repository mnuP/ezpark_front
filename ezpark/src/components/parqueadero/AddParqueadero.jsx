import React, { useState } from "react";
import { addNewParqueadero } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";

const AddParqueadero = () => {
    const [newParqueadero, setNewParqueadero] = useState({
        idAdministrador: "",
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
                setSuccessMessage("A new parqueadero was added successfully!");
                setNewParqueadero({ idAdministrador: "", nombre: "" });
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding new parqueadero");
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
                        <h2 className="mt-5 mb-2">Add a New Parqueadero</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show">{successMessage}</div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger fade show">{errorMessage}</div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="idAdministrador" className="form-label">
                                    ID Administrador
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="idAdministrador"
                                    name="idAdministrador"
                                    value={newParqueadero.idAdministrador}
                                    onChange={handleInputChange}
                                />
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
                                    Existing Parqueaderos
                                </Link>
                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Save Parqueadero
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