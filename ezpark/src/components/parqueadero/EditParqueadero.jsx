import React, { useEffect, useState } from "react";
import { getEspacioById, updateParqueadero } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

const EditParqueadero = () => {
    const [espacio, setEspacio] = useState({
        photo: "",
        tipoEspacio: "",
        precioEspacio: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { espacioId } = useParams();

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setEspacio({ ...espacio, photo: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEspacio({ ...espacio, [name]: value });
    };

    useEffect(() => {
        const fetchEspacio = async () => {
            try {
                const espacioData = await getEspacioById(espacioId);
                setEspacio(espacioData);
                setImagePreview(espacioData.photo);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEspacio();
    }, [espacioId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateParqueadero(espacioId, espacio);
            if (response.status === 200) {
                setSuccessMessage("Parqueadero actualizado correctamente");
                const updatedEspacioData = await getEspacioById(espacioId);
                setEspacio(updatedEspacioData);
                setImagePreview(updatedEspacioData.photo);
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
            <h3 className="text-center mb-5 mt-5">Editar Espacio</h3>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="tipoEspacio" className="form-label park-color">
                                Tipo de Parqueadero
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="tipoEspacio"
                                name="tipoEspacio"
                                value={espacio.tipoEspacio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="precioEspacio" className="form-label park-color">
                                Precio de Parqueadero
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="precioEspacio"
                                name="precioEspacio"
                                value={espacio.precioEspacio}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label park-color">
                                Foto
                            </label>
                            <input
                                required
                                type="file"
                                className="form-control"
                                id="photo"
                                name="photo"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img
                                    src={`data:image/jpeg;base64,${imagePreview}`}
                                    alt="Vista previa del espacio"
                                    style={{ maxWidth: "400px", maxHeight: "400" }}
                                    className="mt-3"
                                />
                            )}
                        </div>
                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <Link to={"/existing-espacios"} className="btn btn-outline-info ml-5">
                                Volver
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
