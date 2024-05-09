import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api, getHeader } from "../utils/ApiFunctions";

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [parqueaderos, setParqueaderos] = useState([]);

    useEffect(() => {
        const fetchParqueaderos = async () => {
            try {
                const response = await api.get("/parqueaderos", { headers: getHeader() });
                setParqueaderos(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchParqueaderos()
            .then(() => setLoading(false))
            .catch((error) => setError(error.message));
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section className="container mt-5">
            <h2>Bienvenido administrador</h2>
            <hr />
            <h3>Administrar parqueaderos</h3>
            <ul>
                {parqueaderos.map((parqueadero) => (
                    <li key={parqueadero.id}>
                        {parqueadero.nombre}
                    </li>
                ))}
            </ul>
            <Link to="/administrar-parqueaderos">Administrar parqueaderos</Link>
        </section>
    );
};

export default Admin;
