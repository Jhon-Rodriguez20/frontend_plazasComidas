import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ValidarUsuarioConectado = ({ children, conectado }) => {
    const usuarioConectado = useSelector((estado) => estado.usuario.conectado);
    return conectado === usuarioConectado ? <>{children}</> : null;
}

const UsuarioIniciales = () => {
    const usuarioConectado = useSelector((estado) => estado.usuario.usuario);
    const iniciales = usuarioConectado && usuarioConectado.name ? usuarioConectado.name.slice(0, 2).toUpperCase() : '';
    return <>{iniciales}</>;
}

ValidarUsuarioConectado.propTypes = {
    children: PropTypes.node.isRequired,
    conectado: PropTypes.bool.isRequired,
}

export { ValidarUsuarioConectado, UsuarioIniciales }