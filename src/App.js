import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import NotFound from "./components/NotFound"
import NumeroPrimoList from "./pages/NumerosPrimosList"
import NumeroPrimoCreate from "./pages/NumeroPrimoCreate"
import Login from "./components/Login"
// import NumeroPrimoEdit from "./pages/NumeroPrimoEdit"
// import NumeroPrimoShow from "./pages/NumeroPrimoShow"
import UsuarioList from './pages/UsuarioList'
import UsuarioCreate from './pages/UsuarioCreate'
// import UsuarioEdit from './pages/UsuarioEdit'

function App() {
  const isAuthenticated = () => {
    // Verificar si el usuario está autenticado, por ejemplo, verificamos si hay un token en localStorage
    return localStorage.getItem('token') !== null;
  };

  const PrivateRoute = ({ element, ...props }) => {
    return isAuthenticated() ? (
      // Si el usuario está autenticado, renderiza el componente
      element
    ) : (
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      <Navigate to="/"/>
    );
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* Utilizamos el componente PrivateRoute para proteger las rutas */}
        <Route path="/numerosPrimos" element={<PrivateRoute element={<NumeroPrimoList />} />} />
        <Route path="/numerosPrimos/create" element={<PrivateRoute element={<NumeroPrimoCreate />} />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/NumeroPrimos/editar/:id" element={<PrivateRoute element={<NumeroPrimoEdit />} />} /> */}
        {/* <Route path="/NumeroPrimos/mostrar/:id" element={<PrivateRoute element={<NumeroPrimoShow />} />} /> */}

        <Route path="/usuarios" element={<PrivateRoute element={<UsuarioList />} />} />
        <Route path="/usuarios/create" element={<PrivateRoute element={<UsuarioCreate />} />} />
        {/* <Route path="/usuarios/editar/:id" element={<PrivateRoute element={<UsuarioEdit />} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;