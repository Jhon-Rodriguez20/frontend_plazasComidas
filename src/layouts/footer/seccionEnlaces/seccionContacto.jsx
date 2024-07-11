import { Typography } from '@mui/material';
import { Home, Email, Phone, Print } from '@mui/icons-material';
import PropTypes from 'prop-types';

const seccionContacto = [
    { icono: <Home sx={{ verticalAlign: 'middle', mr: 1 }} />, texto: "Localización aquí" },
    { icono: <Email sx={{ verticalAlign: 'middle', mr: 1 }} />, texto: "correoElectrónico@gmail.com" },
    { icono: <Phone sx={{ verticalAlign: 'middle', mr: 1 }} />, texto: "+ 01 99 999 99" },
    { icono: <Print sx={{ verticalAlign: 'middle', mr: 1 }} />, texto: "+ 01 888 888 888" },
];

const InformacionContacto = () => (
    <>
        <Typography variant="h6" gutterBottom sx={{ color: '#C56B22' }}>Contacto</Typography>
        {seccionContacto.map((item, index) => (
            <Typography key={index} variant="body2">
                {item.icono}
                {item.texto}
            </Typography>
        ))}
    </>
);

InformacionContacto.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            icono: PropTypes.element.isRequired,
            texto: PropTypes.string.isRequired
        })
    )
};

export default InformacionContacto;