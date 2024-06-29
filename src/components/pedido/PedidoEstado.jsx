import PropTypes from 'prop-types';

const EstadoCirculo = ({ estado, onEstadoChange }) => {
    const colors = {
        "Pendiente": "#FF0000", // rojo
        "Preparando": "#FFA500", // amarillo anaranjado
        "Listo": "#3DFF64", // verde clarito
        "Entregado": "#3ACEFF"  // azul claro
    };

    const gray = "#d3d3d3";

    const handleClick = (nuevoEstado) => {
        onEstadoChange(nuevoEstado);
    };

    return (
        <svg width="150" height="150" viewBox="0 0 100 100" style={{ cursor: 'pointer' }}>
            {/* Cuarto 1 */}
            <path d="M50 5 A 45 45 0 0 1 95 50" 
                  stroke={estado === "Pendiente" ? colors["Pendiente"] : gray} 
                  strokeWidth="10" 
                  fill="none" 
                  onClick={() => handleClick("Pendiente")} />
            {/* Cuarto 2 */}
            <path d="M95 50 A 45 45 0 0 1 50 95" 
                  stroke={estado === "Preparando" ? colors["Preparando"] : gray} 
                  strokeWidth="10" 
                  fill="none" 
                  onClick={() => handleClick("Preparando")} />
            {/* Cuarto 3 */}
            <path d="M50 95 A 45 45 0 0 1 5 50" 
                  stroke={estado === "Listo" ? colors["Listo"] : gray} 
                  strokeWidth="10" 
                  fill="none" 
                  onClick={() => handleClick("Listo")} />
            {/* Cuarto 4 */}
            <path d="M5 50 A 45 45 0 0 1 50 5" 
                  stroke={estado === "Entregado" ? colors["Entregado"] : gray} 
                  strokeWidth="10" 
                  fill="none" 
                  onClick={() => handleClick("Entregado")} />
        </svg>
    );
}

EstadoCirculo.propTypes = {
    estado: PropTypes.string.isRequired,
    onEstadoChange: PropTypes.func.isRequired,
};

export { EstadoCirculo };