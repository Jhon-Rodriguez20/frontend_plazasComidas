import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Fade } from '@mui/material';
import { MoreVert, AddBox, DinnerDining } from '@mui/icons-material';
import PropTypes from 'prop-types';

function MenuOpciones({ anchorEl, handleClick, handleCerrar, handleMenuClick, restauranteId }) {
    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCerrar}
                TransitionComponent={Fade}
                onClick={handleMenuClick}
            >
                <MenuItem component={Link} to={`/crear/plato/${restauranteId}`}>
                    <AddBox sx={{ color: '#c2c2c2', marginRight: 1 }} /> Crear plato
                </MenuItem>
                <MenuItem component={Link} to={`/verPlatos/${restauranteId}`}>
                    <DinnerDining sx={{ color: '#c2c2c2', marginRight: 1 }} /> Ver platos
                </MenuItem>
            </Menu>
        </>
    );
}

MenuOpciones.propTypes = {
    anchorEl: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    handleCerrar: PropTypes.func.isRequired,
    handleMenuClick: PropTypes.func.isRequired,
    restauranteId: PropTypes.string.isRequired,
};

export { MenuOpciones }