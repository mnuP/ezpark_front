import React from "react";
import MainHeader from "../layout/MainHeader";
import Parallax from "../common/Parallax";
import EspacioSearch from "../common/ParqueaderoSearch";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Servicios from "../common/Servicios";
import ParqueaderosCarrusel from "../common/ParqueaderosCarrusel";

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
