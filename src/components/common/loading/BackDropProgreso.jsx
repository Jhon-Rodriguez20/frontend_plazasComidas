import { Backdrop, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function BackDropProgreso({ abrir, mostrarTexto }) {
    return (
        <Backdrop open={abrir} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box className="loader">
                    <Box className="sombra-externa">
                        <Box className="central"></Box>
                        <Box className="interno"></Box>
                    </Box>
                </Box>
                {mostrarTexto && (
                    <Box>
                        <Typography variant='subtitle1'>Convirtiendo imagen a Webp</Typography>
                    </Box>
                )}
            </Box>
        </Backdrop>
    );
}

BackDropProgreso.propTypes = {
    abrir: PropTypes.bool.isRequired,
    mostrarTexto: PropTypes.bool
}

export { BackDropProgreso }