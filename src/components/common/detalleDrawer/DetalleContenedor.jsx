import PropTypes from 'prop-types';
import { Drawer, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

function DetalleContenedor({ abrir, cerrar, contenido }) {
    return (
        <Drawer anchor="right" open={abrir} onClose={cerrar}>
            <Box sx={{ padding: '16px', position: 'relative', overflowY: 'auto',
                minWidth: {xs: 290, sm: 340, md: 380, lg: 420}, maxWidth: {xs: 305, sm: 360, md: 400, lg: 440}
             }}>
                <IconButton onClick={cerrar} sx={{ position: 'absolute', right: 16, top: 16 }}>
                    <Close />
                </IconButton>
                {contenido}
            </Box>
        </Drawer>
    );
}

DetalleContenedor.propTypes = {
    abrir: PropTypes.bool.isRequired,
    cerrar: PropTypes.func.isRequired,
    contenido: PropTypes.node.isRequired
}

export { DetalleContenedor }