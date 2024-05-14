import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getParqueaderoById, updateParqueadero } from "../utils/ApiFunctions";

const EditParqueadero = () => {
    const { parqueaderoId } = useParams();
    const [parqueadero, setParqueadero] = useState({
        idAdministrador: "",
        nombre: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchParqueaderoData = async () => {
            try {
                const parqueaderoData = await getParqueaderoById(parqueaderoId);
                setParqueadero(parqueaderoData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchParqueaderoData();
    }, [parqueaderoId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setParqueadero({ ...parqueadero, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateParqueadero(parqueadero.idAdministrador, parqueadero.nombre);
            if (response) {
                setSuccessMessage("Parqueadero actualizado exitosamente");
                setErrorMessage("");
            } else {
                setErrorMessage("Error al actualizar el parqueadero");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Editar Parqueadero</h3>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="idAdministrador" className="form-label">
                                ID del Administrador
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="idAdministrador"
                                name="idAdministrador"
                                value={parqueadero.idAdministrador}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">
                                Nombre del Parqueadero
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                value={parqueadero.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <Link to={"/existing-parqueaderos"} className="btn btn-outline-info ml-5">
                                Regresar
                            </Link>
                            <button type="submit" className="btn btn-outline-warning">
                                Editar Parqueadero
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditParqueadero;
