import PropTypes from 'prop-types';
import { Drawer, Box, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

function DetalleDrawer({ open, onClose, contenido }) {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ padding: '16px', position: 'relative',
                minWidth: {xs: 280, sm: 320, md: 350, lg: 350}, maxWidth: {xs: 300, sm: 330, md: 370, lg: 400}
             }}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
                    <Close />
                </IconButton>
                {contenido}
            </Box>
        </Drawer>
    );
}

DetalleDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    contenido: PropTypes.node.isRequired
}

export { DetalleDrawer }