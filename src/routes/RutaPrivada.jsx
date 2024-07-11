import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from "prop-types";

function RutaPrivadaConRol({ rolesPermitidos }) {
    const conectado = useSelector((estado) => estado.usuario.conectado);
    const usuario = useSelector((estado) => estado.usuario.usuario);
    const tienePermiso = rolesPermitidos.includes(usuario.rol);

    if (!conectado) {
        return <Navigate to="/usuario/loguearse" replace />;
    }

    return tienePermiso ? <Outlet /> : <Navigate to="/" replace />;
}

RutaPrivadaConRol.propTypes = {
    rolesPermitidos: PropTypes.array.isRequired
}

export { RutaPrivadaConRol }