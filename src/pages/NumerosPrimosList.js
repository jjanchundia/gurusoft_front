import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import { axiosInstance } from '../index';

function NumerosPrimosList() {
    const [NumerosPrimosList, setNumerosPrimosList] = useState([])
    let token = localStorage.getItem("token");

    useEffect(() => {
        fetchNumerosPrimosList()
    }, [])

    const fetchNumerosPrimosList = () => {
        axiosInstance.get('/api/numerosPrimos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                setNumerosPrimosList(response.data.value);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Listado de Números Primos</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/numerosPrimos">Ingresar Nuevos Números Primos
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Request</th>
                                    <th>Fecha Request</th>
                                    <th>Response</th>
                                    <th>Fecha Response</th>
                                    <th>Usuario</th>
                                    {/* <th width="240px">Acción</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {NumerosPrimosList.map((NumeroPrimo, key) => {
                                    return (
                                        <tr key={NumeroPrimo.idNumeroPrimo}>
                                            <td>{NumeroPrimo.request}</td>
                                            <td>{NumeroPrimo.fechaRequest}</td>
                                            <td>{NumeroPrimo.response}</td>
                                            <td>{NumeroPrimo.fechaResponse}</td>
                                            <td>{NumeroPrimo.nombreUsuario}</td>
                                            {/* <td>
                                                <Link
                                                    to={`/clientes/mostrar/${Cliente.clienteId}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Ver
                                                </Link>
                                            </td> */}

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NumerosPrimosList;
