import React, { useState } from "react";
import { addNewParqueadero } from "../utils/ApiFunctions";

const AddParqueadero = () => {
    const [newParqueadero, setNewParqueadero] = useState({
        idAdministrador: "",
        nombre: ""
    })

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    

    const handleParqueaderoInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        setNewParqueadero({ ...newParqueadero, [name]: value });
    }

    const handleIdAdministradorInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        setNewParqueadero({ ...newParqueadero, [name]: value });
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        try {
			const success = await addNewParqueadero(newParqueadero.idAdministrador, newParqueadero.nombre)
			if (success !== undefined) {
				setSuccessMessage("Un nuevo parqueadero ha sido añadido!")
				setNewParqueadero({idAdministrador: "", nombre: "" })
				setErrorMessage("")
			} else {
				setErrorMessage("Error añadiendo nuevo parqueadero")
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
    }

    return (
        <div>
            <h2>Agregar Parqueadero</h2>
            {successMessage &&(
                <div className="alert alert-success fade show">{successMessage}</div>)}
            {errorMessage && <div className="alert alert-danger fade show">{errorMessage}</div>}
            <form>
                <div>
                    <label htmlFor="idAdministrador">ID del Administrador:</label>
                    <input
                        type="text"
                        id="idAdministrador"
                        name="idAdministrador"
                        value={newParqueadero.idAdministrador}
                        onChange={handleIdAdministradorInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="nombre">Nombre del Parqueadero:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={newParqueadero.nombre}
                        onChange={handleParqueaderoInputChange}
                    />
                </div>
                <button type="button" onClick={handleSubmit}>Agregar Parqueadero</button>
            </form>
        </div>
    )
}

export default AddParqueadero;
