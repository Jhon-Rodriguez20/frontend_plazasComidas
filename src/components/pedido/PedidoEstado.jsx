import PropTypes from 'prop-types';

function EstadoCirculo({ estado, cambiarEstado, editable }) {
    const colores = {
        "Pendiente": "#FF0000", // rojo
        "Preparando": "#FFA500", // amarillo anaranjado
        "Listo": "#3DFF64", // verde claro
        "Entregado": "#3ACEFF"  // azul claro
    };

    const colorGris = "#d3d3d3";
    const estados = ["Pendiente", "Preparando", "Listo", "Entregado"];
    const estadoIndex = estados.indexOf(estado);

    const handleClick = (nuevoEstado, index) => {
        if (editable && index == estadoIndex + 1) {
          cambiarEstado(nuevoEstado);
        }
    };

    const trayectoriaCirculo = (inicioAngulo, finAngulo) => {
        const radio = 45;
        const ejeX = 50;
        const ejeY = 50;
        const inicio = polarACartesiano(ejeX, ejeY, radio, finAngulo);
        const fin = polarACartesiano(ejeX, ejeY, radio, inicioAngulo);
        const largoDeCirculo = finAngulo - inicioAngulo <= 180 ? "0" : "1";
        return [
            "M", inicio.x, inicio.y,
            "A", radio, radio, 0, largoDeCirculo, 0, fin.x, fin.y
        ].join(" ");
    };

    const polarACartesiano = (ejeX, ejeY, radio, anguloEnGrados) => {
        const anguloEnRadianes = (anguloEnGrados - 90) * Math.PI / 180.0;
        return {
            x: ejeX + (radio * Math.cos(anguloEnRadianes)),
            y: ejeY + (radio * Math.sin(anguloEnRadianes))
        };
    };

    return (
        <svg width="170" height="170" viewBox="0 0 100 100" style={{ cursor: 'pointer' }}>
            {estados.map((estadoActual, index) => {
                const inicioAngulo = index * 90 + 4; // Aumento de 4 grados al ángulo de inicio
                const finAngulo = (index + 1) * 90 - 4; // Reducción de 4 grados al ángulo de fin
                return (
                    <path
                        key={estadoActual}
                        d={trayectoriaCirculo(inicioAngulo, finAngulo)}
                        stroke={index <= estadoIndex ? colores[estadoActual] : colorGris}
                        strokeWidth="10"
                        fill="none"
                        onClick={() => handleClick(estadoActual, index)}
                    />
                );
            })}
        </svg>
    );
}

EstadoCirculo.propTypes = {
    estado: PropTypes.string.isRequired,
    cambiarEstado: PropTypes.func,
    editable: PropTypes.bool.isRequired,
};

export { EstadoCirculo }