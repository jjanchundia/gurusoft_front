import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import { axiosInstance } from '../index';

function UsuarioList() {
    const [UsuarioList, setUsuarioList] = useState([])

    useEffect(() => {
        fetchUsuarioList()
    }, [])

    const fetchUsuarioList = () => {
        axiosInstance.get('/api/usuarios')
            .then(function (response) {
                setUsuarioList(response.data.value);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Listado de Usuarios</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/Usuarios/create">Ingresar Nuevo Usuario
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Usuario</th>
                                    {/* <th width="240px">Acción</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {UsuarioList.map((Usuario, key) => {
                                    return (
                                        <tr key={Usuario.id}>
                                            <td>{Usuario.nombres}</td>
                                            <td>{Usuario.apellidos}</td>
                                            <td>{Usuario.username}</td>
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

export default UsuarioList;
