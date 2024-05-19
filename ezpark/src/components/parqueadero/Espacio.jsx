import React, { useEffect, useState } from "react";
import EspacioCard from "./EspacioCard";
import { getEspaciosOfParqueaderoById } from "../api/ApiFunctions";
import { Col, Container, Row } from "react-bootstrap";
import ParqueaderoPaginator from "../componente/ParqueaderoPaginator";

const Espacio = ({ idParqueadero }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [espaciosPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        
        setIsLoading(true);
        console.log(getEspaciosOfParqueaderoById(idParqueadero));
        getEspaciosOfParqueaderoById(idParqueadero).then((data) => {
                setData(data);
                setFilteredData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Cargando espacios...</div>;
    }
    if (error) {
        return <div className="text-danger">Error: {error}</div>;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredData.length / espaciosPerPage);

    const renderEspacios = () => {
        const startIndex = (currentPage - 1) * espaciosPerPage;
        const endIndex = startIndex + espaciosPerPage;
        return filteredData
            .slice(startIndex, endIndex)
            .map((espacio) => <EspacioCard key={espacio.id} espacio={espacio} />);
    };

    return (
        <Container>
            <Row>

                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <ParqueaderoPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row>{renderEspacios()}</Row>

            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <ParqueaderoPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Espacio;
