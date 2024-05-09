import React, { useState } from "react";

const ParqueaderoSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar parqueadero..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button className="btn btn-primary" type="button" onClick={handleSearch}>
                Buscar
            </button>
        </div>
    );
};

export default ParqueaderoSearch;
