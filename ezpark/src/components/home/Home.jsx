import React from "react";
import MainHeader from "../pagina/MainHeader";
import Parallax from "../componente/Parallax";
import { useLocation } from "react-router-dom";
import Servicios from "../componente/Servicios";
import ParqueaderosCarrusel from "../componente/ParqueaderosCarrusel";

const Home = () => {
  const location = useLocation();
  

  const message = location.state && location.state.message;
  const currentUser = localStorage.getItem("userId")

  return (
    <section>
      {message && <p className="text-warning px-5">{message}</p>}
      {currentUser && (
          <h6 className="text-success text-center">Estás conectado como {currentUser}</h6>
      )}
      <MainHeader />
      <div className="container">

        <Parallax />
        <ParqueaderosCarrusel />
        <Servicios />
      </div>
    </section>
  );
};

export default Home;
