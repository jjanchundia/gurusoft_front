import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import { axiosInstance } from '../index'; 
 
function NumeroPrimoCreate() {
    const [numeroInicio, setNumeroInicio] = useState(null);
    const [numerosCalcular, setNumerosCalcular] = useState(null)
    const go = useNavigate();
  
    const handleSave = () => {

        if(numeroInicio === null){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Número de inicio!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if(numerosCalcular === null){
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Números a calcular!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        let token = localStorage.getItem("token");
        let idUsuario = localStorage.getItem("idUsuario");
        axiosInstance.post('/api/numerosPrimos', {
            NumeroInicio: numeroInicio,
            NumerosCalcular: numerosCalcular,
            usuarioId: idUsuario
          },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Numeros Primos Creados Correctamente!',
                showConfirmButton: false,
                timer: 1500
            })
            go("/numerosPrimos")
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
                <h2 className="text-center mt-5 mb-3">Crear Números Primos</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/numerosPrimos">Ver todos los Numeros Primos
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Inicio</label>
                                <input 
                                    onChange={(event)=>{setNumeroInicio(event.target.value)}}
                                    value={numeroInicio}
                                    type="number"
                                    className="form-control"
                                    id="numeroInicio"
                                    name="numeroInicio"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellido">Números a calcular</label>
                                <input 
                                    onChange={(event)=>{setNumerosCalcular(event.target.value)}}
                                    value={numerosCalcular}
                                    type="number"
                                    className="form-control"
                                    id="numerosCalcular"
                                    name="numerosCalcular"/>
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
  
export default NumeroPrimoCreate;