import { Backdrop, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

function BackDropProgreso({ abrir }) {
    return (
        <Backdrop open={abrir} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

BackDropProgreso.propTypes = {
    abrir: PropTypes.bool.isRequired,
}

export { BackDropProgreso }