import React, { useEffect, useState } from "react";
import { getAllParqueaderos } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const ParqueaderosCarrusel = () => {
    const [parqueaderos, setParqueaderos] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllParqueaderos()
            .then((data) => {
                setParqueaderos(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="mt-5">Cargando parqueaderos....</div>;
    }
    if (errorMessage) {
        return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>;
    }

    return (
        <section className="bg-light mb-5 mt-5 shadow">
            <Link to={"/browse-all-parqueaderos"} className="park-color text-center">
                Ver todos los parqueaderos
            </Link>

            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(parqueaderos.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {parqueaderos.slice(index * 4, index * 4 + 4).map((parqueadero) => (
                                    <Col key={parqueadero.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-parqueadero/${parqueadero.id}`}>
                                                <Card.Body>
                                                    <Card.Title className="park-color">{parqueadero.nombre}</Card.Title>
                                                    <div className="flex-shrink-0">
                                                        <Link to={`/book-parqueadero/${parqueadero.id}`} className="btn btn-park btn-sm">
                                                            Reservar ahora
                                                        </Link>
                                                    </div>
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default ParqueaderosCarrusel;
