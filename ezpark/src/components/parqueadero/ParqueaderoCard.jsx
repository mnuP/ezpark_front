import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ParqueaderoCard = ({ parqueadero }) => {
    return (
        <Col key={parqueadero.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
                        <Link to={`/book-parqueadero/${parqueadero.id}`}>
                            <Card.Img
                                variant="top"
                                src={`data:image/png;base64, ${parqueadero.photo}`}
                                alt="Parqueadero Photo"
                                style={{ width: "100%", maxWidth: "200px", height: "auto" }}
                            />
                        </Link>
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="park-color">{parqueadero.nombre}</Card.Title>
                        <Card.Text>Información sobre el parqueadero.</Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`/book-parqueadero/${parqueadero.id}`} className="btn btn-park btn-sm">
                            Reservar Ahora
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ParqueaderoCard;
