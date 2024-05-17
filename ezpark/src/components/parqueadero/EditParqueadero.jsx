import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getParqueaderoById, updateParqueadero } from "../utils/ApiFunctions";

const EditParqueadero = () => {
    const { idParqueadero } = useParams();
    console.log(idParqueadero)
    const [parqueadero, setParqueadero] = useState({
        idParqueadero: "",
        nombre: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchParqueaderoData = async () => {
            try {
                const parqueaderoData = await getParqueaderoById(idParqueadero);
                setParqueadero(parqueaderoData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchParqueaderoData();
    }, [idParqueadero]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setParqueadero({ ...parqueadero, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateParqueadero(parqueadero.idParqueadero, parqueadero.nombre);
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
                            <label htmlFor="idParqueadero" className="form-label">
                               Id Parqueadero
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="idParqueadero"
                                name="idParqueadero"
                                value={parqueadero.idParqueadero}
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
                            <Link to={"/existing-parqueadero"} className="btn btn-outline-info ml-5">
                                Regresar
                            </Link>
                            <Link to={`/add-espacio/${idParqueadero}`} className="btn btn-outline-info ml-5">
                                Añadir Espacio
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
