import React, { useState } from "react";
import ParqueaderoCard from "../parqueadero/ParqueaderoCard";
import { Button, Row } from "react-bootstrap";
import ParqueaderoPaginator from "./ParqueaderoPaginator";

const ParqueaderoSearchResults = ({ results, onClearSearch }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 3;
    const totalResults = results.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedResults = results.slice(startIndex, endIndex);

    return (
        <>
            {results.length > 0 ? (
                <>
                    <h5 className="text-center mt-5">Resultados de la búsqueda</h5>
                    <Row>
                        {paginatedResults.map((parqueadero) => (
                            <ParqueaderoCard key={parqueadero.id} parqueadero={parqueadero} />
                        ))}
                    </Row>
                    <Row className="mt-3">
                        {totalResults > resultsPerPage && (
                            <ParqueaderoPaginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                        <Button variant="secondary" onClick={onClearSearch}>
                            Limpiar Búsqueda
                        </Button>
                    </Row>
                </>
            ) : (
                <p>No se encontraron resultados.</p>
            )}
        </>
    );
};

export default ParqueaderoSearchResults;
