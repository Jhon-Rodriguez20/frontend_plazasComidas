import PropTypes from 'prop-types';

const IconoListo = ({ ancho = 100, alto = 100 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        width={ancho}
        height={alto}
    >
        <defs>
            <linearGradient id="readyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#8BC34A", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#4CAF50", stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"
            fill="url(#readyGradient)"
        />
    </svg>
);

IconoListo.propTypes = {
    ancho: PropTypes.number,
    alto: PropTypes.number
}

export {IconoListo}