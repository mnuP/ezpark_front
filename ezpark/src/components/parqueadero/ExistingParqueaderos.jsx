import React, { useEffect, useState } from "react";
import { deleteParqueadero, getAllParqueaderos } from "../utils/ApiFunctions";
import { Col, Row } from "react-bootstrap";
import FiltrarParqueadero from "../common/FiltrarParqueadero";
import ParqueaderoPaginator from "../common/ParqueaderoPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingParqueaderos = () => {
    const [parqueaderos, setParqueaderos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [parqueaderosPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredParqueaderos, setFilteredParqueaderos] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetchParqueaderos();
    }, []);

    const fetchParqueaderos = async () => {
        setIsLoading(true);
        try {
            const result = await getAllParqueaderos();
            setParqueaderos(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const filteredParqueaderos = parqueaderos.filter((parqueadero) =>
            parqueadero.nombre.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredParqueaderos(filteredParqueaderos);
        setCurrentPage(1);
    }, [parqueaderos, filter]);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (parqueaderoId) => {
        try {
            const result = await deleteParqueadero(parqueaderoId);
            if (result === "") {
                setSuccessMessage(`Parqueadero No ${parqueaderoId} fue eliminado`);
                fetchParqueaderos();
            } else {
                console.error(`Error eliminando parqueadero : ${result.message}`);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    const calculateTotalPages = (filteredParqueaderos, parqueaderosPerPage, parqueaderos) => {
        const totalParqueaderos = filteredParqueaderos.length > 0 ? filteredParqueaderos.length : parqueaderos.length;
        return Math.ceil(totalParqueaderos / parqueaderosPerPage);
    };

    const indexOfLastParqueadero = currentPage * parqueaderosPerPage;
    const indexOfFirstParqueadero = indexOfLastParqueadero - parqueaderosPerPage;
    const currentParqueaderos = filteredParqueaderos.slice(indexOfFirstParqueadero, indexOfLastParqueadero);

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>
            {isLoading ? (
                <p>Cargando parqueaderos existentes</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Parqueaderos Existentes</h2>
                        </div>
                        <Row>
                            <Col md={6} className="mb-2 md-mb-0">
                                <FiltrarParqueadero data={parqueaderos} setFilteredData={setFilteredParqueaderos} />
                            </Col>
                            <Col md={6} className="d-flex justify-content-end">
                                <Link to={"/add-parqueadero"}>
                                    <FaPlus /> Agregar Parqueadero
                                </Link>
                            </Col>
                        </Row>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>ID Administrador</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentParqueaderos.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center">No se encontraron parqueaderos que coincidan con el filtro aplicado.</td>
                                    </tr>
                                )}
                                {currentParqueaderos.map((parqueadero) => (
                                    <tr key={parqueadero.id} className="text-center">
                                        <td>{parqueadero.id}</td>
                                        <td>{parqueadero.idAdministrador}</td>
                                        <td>{parqueadero.nombre}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-parqueadero/${parqueadero.id}`} className="btn btn-info btn-sm">
                                                <FaEdit />
                                            </Link>
                                            <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(parqueadero.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ParqueaderoPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredParqueaderos, parqueaderosPerPage, parqueaderos)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    );
};

export default ExistingParqueaderos;