import React, { useState, useEffect } from 'react';
import {  
    getAllParqueaderos, 
    getAllEspacios, 
} from '../api/ApiFunctions';

const Reportes = () => {
    const [parqueaderos, setParqueaderos] = useState([]);
    const [espacios, setEspacios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchParqueaderos();
        fetchEspacios();
    }, []);

    const fetchParqueaderos = async () => {
        try {
            const data = await getAllParqueaderos();
            
            setParqueaderos(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchEspacios = async () => {
        try {
            const data = await getAllEspacios();
            console.log(data)
            setEspacios(data);
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div>
            <h1>Reportes del Administrador</h1>

            <section>
                <h2>Parqueaderos</h2>
                <table className="reportes-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Número de espacios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parqueaderos.map(parqueadero => (
                            <tr key={parqueadero.idParqueadero}>
                                <td>{parqueadero.idParqueadero}</td>
                                <td>{parqueadero.nombre}</td>
                                <td>{parqueadero.espacioResponses.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Espacios</h2>
                <table className="reportes-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Número de reservas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {espacios.map(espacio => (
                            <tr key={espacio.id}>
                                <td>{espacio.id}</td>
                                <td>{espacio.tipo}</td>
                                <td>{espacio.reservasResponses.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>


            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Reportes;
