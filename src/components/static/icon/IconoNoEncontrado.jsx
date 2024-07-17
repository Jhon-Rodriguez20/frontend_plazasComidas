import PropTypes from 'prop-types';

const IconoNoEncontrado = ({ ancho = 100, alto = 100 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        width={ancho}
        height={alto}
    >
        <defs>
            <linearGradient id="notFoundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#FFA726", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#C56B22", stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-12h2v10h-2V4z"
            fill="url(#notFoundGradient)"
        />
    </svg>
);

IconoNoEncontrado.propTypes = {
    ancho: PropTypes.number,
    alto: PropTypes.number
}

export { IconoNoEncontrado }