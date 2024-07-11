import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ValidarUsuarioRol = ({ rolesPermitidos, children }) => {
    const usuario = useSelector((estado) => estado.usuario.usuario);
    return rolesPermitidos.includes(usuario.rol) ? <>{children}</> : null;
}

ValidarUsuarioRol.propTypes = {
    rolesPermitidos: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired
}

export { ValidarUsuarioRol }