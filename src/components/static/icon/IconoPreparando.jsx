import PropTypes from 'prop-types';

const IconoPreparandoComida = ({ ancho = 100, alto = 100 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        width={ancho}
        height={alto}
    >
        <defs>
            <linearGradient id="preparingFoodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#FFA500", stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-1-11h2v4h3v2h-5V8zm1 10c-1.1 0-2-.9-2-2h2v2zm0-2h-2v-2h2v2z"
            fill="url(#preparingFoodGradient)"
        />
    </svg>
);

IconoPreparandoComida.propTypes = {
    ancho: PropTypes.number,
    alto: PropTypes.number
}

export {IconoPreparandoComida}