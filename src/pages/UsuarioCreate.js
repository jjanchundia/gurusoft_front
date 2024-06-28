import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import { axiosInstance } from '../index';

function UsuarioCreate() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const go = useNavigate();

    const handleSave = () => {

        if (nombre === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Nombres!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (apellido === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Apellidos!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (username === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Usuario!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (password === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Password!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        axiosInstance.post('/api/usuarios/register', {
            Nombres: nombre,
            Apellidos: apellido,
            user: username,
            password: password,
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario Creado Correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setNombre('')
                setApellido('')
                setUsername("")
                setPassword("")
                go("/usuarios")
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Crear Nuevo Usuario</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/Usuarios">Ver todos los Usuarios
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombres</label>
                                <input
                                    onChange={(event) => { setNombre(event.target.value) }}
                                    value={nombre}
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    nombre="nombre" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellido">Apellidos</label>
                                <input
                                    onChange={(event) => { setApellido(event.target.value) }}
                                    value={apellido}
                                    type="text"
                                    className="form-control"
                                    id="apellido"
                                    nombre="apellido" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Usuario</label>
                                <input
                                    onChange={(event) => { setUsername(event.target.value) }}
                                    value={username}
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    nombre="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    onChange={(event) => { setPassword(event.target.value) }}
                                    value={password}
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    nombre="password" />
                            </div>

                            <button
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UsuarioCreate;