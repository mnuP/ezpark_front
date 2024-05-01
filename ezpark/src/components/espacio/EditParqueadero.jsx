import React, { useState, useEffect } from "react";
import { updateParqueadero } from "../utils/ApiFunctions";

const EditParqueadero = ({ match }) => {
    const [parqueadero, setParqueadero] = useState({
        idAdministrador: "",
        nombre: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Aquí podrías hacer una solicitud para obtener los datos del parqueadero a editar
        // Utilizando la ID proporcionada en match.params
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParqueadero({ ...parqueadero, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await updateParqueadero(parqueadero.idAdministrador, parqueadero.nombre);
            if (success) {
                setSuccessMessage("El parqueadero ha sido actualizado correctamente.");
            } else {
                setErrorMessage("Error al actualizar el parqueadero.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <div>
            <h2>Editar Parqueadero</h2>
            {successMessage && <div className="alert alert-success fade show">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger fade show">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idAdministrador">ID del Administrador:</label>
                    <input
                        type="text"
                        id="idAdministrador"
                        name="idAdministrador"
                        value={parqueadero.idAdministrador}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="nombre">Nombre del Parqueadero:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={parqueadero.nombre}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Actualizar Parqueadero</button>
            </form>
        </div>
    );
}

export default EditParqueadero;
