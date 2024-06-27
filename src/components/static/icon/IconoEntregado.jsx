import PropTypes from 'prop-types';

const IconoPedidoEntregado = ({ ancho = 100, alto = 100 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        width={ancho}
        height={alto}
    >
        <defs>
            <linearGradient id="deliveredGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#2196F3", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#0D47A1", stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"
            fill="url(#deliveredGradient)"
        />
    </svg>
);

IconoPedidoEntregado.propTypes = {
    ancho: PropTypes.number,
    alto: PropTypes.number
}

export {IconoPedidoEntregado}