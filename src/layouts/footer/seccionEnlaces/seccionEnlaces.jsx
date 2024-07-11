import { Typography, Link } from '@mui/material';
import PropTypes from 'prop-types';

const seccionEnlace = ({ titulo, enlace }) => (
    <>
        <Typography variant="h6" gutterBottom sx={{color: '#C56B22'}}>{titulo}</Typography>
        {enlace.map((link, index) => (
            <Typography key={index} variant="body2">
                <Link href={link.href} color="inherit" underline="none">{link.texto}</Link>
            </Typography>
        ))}
    </>
);

seccionEnlace.propTypes = {
    titulo: PropTypes.string.isRequired,
    enlace: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string.isRequired,
        texto: PropTypes.string.isRequired
    })).isRequired
};

export default seccionEnlace;