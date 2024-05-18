import React, { useState } from "react";

const FiltrarParqueadero = ({ data, setFilteredData }) => {
    const [filter, setFilter] = useState("");

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setFilter(inputValue);

        const filteredParqueaderos = data.filter((parqueadero) =>
            parqueadero.nombre.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredData(filteredParqueaderos);
    };

    const clearFilter = () => {
        setFilter("");
        setFilteredData(data);
    };

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="park-type-filter">
                Filtrar parqueaderos por nombre
            </span>
            <input
                type="text"
                className="form-control"
                placeholder="Nombre del parqueadero"
                value={filter}
                onChange={handleInputChange}
            />
            <button className="btn btn-park" type="button" onClick={clearFilter}>
                Limpiar Filtro
            </button>
        </div>
    );
};

export default FiltrarParqueadero;