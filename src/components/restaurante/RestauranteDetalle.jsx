import PropTypes from 'prop-types';
import { Box, Typography, CardMedia, Grid, Button } from '@mui/material';
import { Place, LocalPhone, Restaurant, RestaurantMenu, Assignment } from '@mui/icons-material';
import { API_URL } from "../../connections/helpers/endpoints";
import { DetalleDrawer } from '../common/detalleDrawer/DetalleContenedor';

function RestauranteDetalle({ open, onClose, restauranteEntity }) {

    const imagenUrl = restauranteEntity ? `${API_URL}${restauranteEntity.imgRestaurante}` : '';
    const contenido = restauranteEntity ? (
        <>
            <CardMedia
                component="img"
                sx={{ width: '100%', height: 'auto', borderRadius: 2, mt: 6, mb: 2 }}
                image={imagenUrl}
                alt={restauranteEntity.razonSocial}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', mb: 2 }}>
                <Restaurant sx={{ marginRight: 1 }} /> {restauranteEntity.razonSocial}
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Assignment sx={{ color: '#c2c2c2', marginRight: 1 }} /> {restauranteEntity.nit}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocalPhone sx={{ color: '#c2c2c2', marginRight: 1 }} /> {restauranteEntity.telefono}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Place sx={{ color: '#c2c2c2', marginRight: 1 }} /> {restauranteEntity.direccion}
                    </Typography>
                </Grid>                            
            </Grid>
            <Box display='flex' justifyContent='center' mt={2}>
                <Button variant='contained'> <RestaurantMenu sx={{marginRight: 1}} />Ver platos</Button>
            </Box>                    
        </>
    ) : (
        <Typography variant="body2">Cargando...</Typography>
    );

    return (
        <DetalleDrawer open={open} onClose={onClose} contenido={contenido} />
    );
}

RestauranteDetalle.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    restauranteEntity: PropTypes.shape({
        razonSocial: PropTypes.string,
        nit: PropTypes.string,
        direccion: PropTypes.string,
        telefono: PropTypes.string,
        imgRestaurante: PropTypes.string,
    })
};

export { RestauranteDetalle }