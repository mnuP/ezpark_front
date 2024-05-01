import React, { useState, useEffect } from "react";
import { getAllParqueaderos } from "../utils/ApiFunctions";

const ListParqueaderos = () => {
    const [parqueaderos, setParqueaderos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParqueaderos = async () => {
            try {
                const data = await getAllParqueaderos();
                setParqueaderos(data);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener la lista de parqueaderos:", error);
            }
        }
        fetchParqueaderos();
    }, []);

    return (
        <div>
            <h2>Listado de Parqueaderos</h2>
            {loading ? (
                <p>Cargando parqueaderos...</p>
            ) : (
                <ul>
                    {parqueaderos.map(parqueadero => (
                        <li key={parqueadero.id}>{parqueadero.nombre}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListParqueaderos;
