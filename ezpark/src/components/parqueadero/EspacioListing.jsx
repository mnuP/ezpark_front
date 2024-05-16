import React from "react";
import Espacio from "./Espacio";
import { useParams } from "react-router-dom"

const EspacioListing = () => {

    const { idParqueadero } = useParams()
    
    return (
        <section className="bg-light p-2 mb-5 mt-5 shadow">
            <Espacio idParqueadero={idParqueadero}/>
        </section>
    );
};

export default EspacioListing;
