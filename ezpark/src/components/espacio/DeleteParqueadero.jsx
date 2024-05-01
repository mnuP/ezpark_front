import React, { useState } from "react";
import { deleteParqueadero } from "../utils/ApiFunctions";

const DeleteParqueadero = ({ id }) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleDelete = async () => {
        try {
            await deleteParqueadero(id);
            setSuccessMessage("El parqueadero ha sido eliminado correctamente.");
        } catch (error) {
            setErrorMessage("Error al eliminar el parqueadero.");
        }
    }

    return (
        <div>
            {successMessage && <div className="alert alert-success fade show">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger fade show">{errorMessage}</div>}
            <button onClick={handleDelete}>Eliminar Parqueadero</button>
        </div>
    );
}

export default DeleteParqueadero;
