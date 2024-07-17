import PropTypes from 'prop-types';
import { Drawer, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

function DetalleContenedor({ abrir, cerrar, contenido }) {
    return (
        <Drawer anchor="right" open={abrir} onClose={cerrar}>
            <Box 
                sx={{
                    padding: 3,
                    position: 'relative',
                    overflowY: 'auto',
                    minWidth: { xs: 280, sm: 340, md: 380, lg: 430 },
                    maxWidth: { xs: 305, sm: 360, md: 400, lg: 450 },
                    maxHeight: '100vh',
                    overflowX: 'hidden'
                }}
            >
                <IconButton onClick={cerrar} sx={{ position: 'absolute', right: 16, top: 16 }}>
                    <Close />
                </IconButton>
                <Box sx={{ wordWrap: 'break-word', wordBreak: 'break-all'}}>
                    {contenido}
                </Box>
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