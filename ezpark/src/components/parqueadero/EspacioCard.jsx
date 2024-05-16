import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import imagenEspacio from "../../assets/images/1.jpg";

const EspacioCard = ({ espacio }) => {
    console.log(espacio)
    return (
        <Col key={espacio.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
                        <Card.Img
                            variant="top"
                            src={`data:image/png;base64, ${imagenEspacio}`}
                            alt="espacio Photo"
                            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
                        />
                        
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="park-color">{espacio.tipo}</Card.Title>
                        <Card.Text>Codigo del espacio: {espacio.id}</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`/reserva-espacio/${espacio.id}`} className="btn btn-park btn-sm">
                            Reservar el espacio
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default EspacioCard;
