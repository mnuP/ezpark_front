import React, { useState} from "react"
import { Link, useParams } from "react-router-dom";
import { addNewEspacio } from "../utils/ApiFunctions"


const AddEspacio = () => {
    const { idParqueadero } = useParams();
    const [newEspacio, setNewEspacio] = useState({
        tipo: "",
        idParqueadero: idParqueadero
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewEspacio({ ...newEspacio, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await addNewEspacio(newEspacio.tipo, newEspacio.idParqueadero)
            if (response) {
                setSuccessMessage("A new space was added successfully!")
                setNewEspacio({ tipo: "", idParqueadero: idParqueadero })
                setErrorMessage("")
            } else {
                setErrorMessage("Error adding new space")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    console.log(idParqueadero)

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Agregar un nuevo espacio</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show">{successMessage}</div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger fade show">{errorMessage}</div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="tipo" className="form-label">
                                    Tipo
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="tipo"
                                    name="tipo"
                                    value={newEspacio.tipo}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Guardar espacio
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddEspacio
