import React, { useEffect, useState } from "react";
import { getAllParqueaderos } from "../utils/ApiFunctions";
import ParqueaderoCard from "./ParqueaderoCard";
import { Col, Container, Row } from "react-bootstrap";
import FiltrarParqueadero from "../common/FiltrarParqueadero";
import ParqueaderoPaginator from "../common/ParqueaderoPaginator";

const Parqueadero = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [parqueaderosPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAllParqueaderos()
            .then((data) => {
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
        return <div>Cargando parqueaderos...</div>;
    }
    if (error) {
        return <div className="text-danger">Error: {error}</div>;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredData.length / parqueaderosPerPage);

    const renderParqueaderos = () => {
        const startIndex = (currentPage - 1) * parqueaderosPerPage;
        const endIndex = startIndex + parqueaderosPerPage;
        return filteredData
            .slice(startIndex, endIndex)
            .map((parqueadero) => <ParqueaderoCard key={parqueadero.idParqueadero} parqueadero={parqueadero} />);
    };

    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <FiltrarParqueadero data={data} setFilteredData={setFilteredData} />
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <ParqueaderoPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row>{renderParqueaderos()}</Row>

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

export default Parqueadero;
