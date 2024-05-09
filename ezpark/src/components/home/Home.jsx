import React from "react";
import MainHeader from "../layout/MainHeader";
import Parallax from "../common/Parallax";
import EspacioSearch from "../common/ParqueaderoSearch";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Home = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  const message = location.state && location.state.message;

  return (
    <section>
      {message && <p className="text-warning px-5">{message}</p>}
      {currentUser && (
        <h6 className="text-success text-center">Estás conectado como {currentUser}</h6>
      )}
      <MainHeader />
      <div className="container">
        <EspacioSearch />
        <Parallax />
        <Parallax />
      </div>
    </section>
  );
};

export default Home;
