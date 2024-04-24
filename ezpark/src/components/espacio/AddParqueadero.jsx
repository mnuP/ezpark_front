import React, { useState } from "react";

const AddParqueadero = () => {
    const [newParqueadero, setNewParqueadero] = useState({
        idAdministrador: "",
        nombre: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleParqueaderoInputChange = (e) => {
        const { name, value } = e.target;

        setNewParqueadero({ ...newParqueadero, [name]: value });
    };

    const handleSubmit = () => {
        
        fetch('/ruta/al/backend', { //CAMBIAR LA GRAN PUTA RUTA
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newParqueadero),
        })
        .then(response => response.json())
        .then(data => {
            
            if (data.success) {
                setSuccessMessage("¡Parqueadero agregado exitosamente!");
                setNewParqueadero({ idAdministrador: "", nombre: "" });
            } else {
                setErrorMessage("Error al agregar el parqueadero. Inténtalo de nuevo.");
            }
        })
        .catch(error => {
            console.error('Error al agregar el parqueadero:', error);
            setErrorMessage("Error al agregar el parqueadero. Inténtalo de nuevo.");
        });
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    };

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
                        onChange={handleParqueaderoInputChange}
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
    );
};

export default AddParqueadero;
