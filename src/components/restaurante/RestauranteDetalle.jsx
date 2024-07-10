import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Typography, CardMedia, Grid, Button } from '@mui/material';
import { Place, LocalPhone, Restaurant, RestaurantMenu, Assignment } from '@mui/icons-material';
import { API_URL } from "../../connections/helpers/endpoints";
import { DetalleContenedor } from '../common/detalleDrawer/DetalleContenedor';

function RestauranteDetalle({ abrir, cerrar, restauranteEntity }) {
    const imagenUrl = restauranteEntity ? `${API_URL}${restauranteEntity.imgRestaurante}` : '';

    const contenido = restauranteEntity ? (
        <>
            <CardMedia
                component="img"
                sx={{ width: '100%', height: 'auto', borderRadius: 2, mt: 6, mb: 3 }}
                image={imagenUrl}
                alt={restauranteEntity.razonSocial}
            />
            <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', mb: 2, color: "#C56B22" }}>
                <Restaurant sx={{ marginRight: 1, fontSize: 30 }} /> {restauranteEntity.razonSocial}
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
                <Button className="estilo-button" sx={{border: '1px solid', borderColor: '#FEA93C', color: '#FEA93C', textTransform: 'uppercase', fontWeight: 'bold'}}
                    component={Link} to={`/platos/restaurante/${restauranteEntity.idRestaurante}`}>
                    <RestaurantMenu sx={{ marginRight: 1 }} />Ver platos
                </Button>
            </Box>
        </>
    ) : (
        <Typography variant="body2">Cargando...</Typography>
    )

    return (
        <DetalleContenedor abrir={abrir} cerrar={cerrar} contenido={contenido} />
    )
}

RestauranteDetalle.propTypes = {
    abrir: PropTypes.bool.isRequired,
    cerrar: PropTypes.func.isRequired,
    restauranteEntity: PropTypes.shape({
        idRestaurante: PropTypes.string,
        razonSocial: PropTypes.string,
        nit: PropTypes.string,
        direccion: PropTypes.string,
        telefono: PropTypes.string,
        imgRestaurante: PropTypes.string,
    })
}

export { RestauranteDetalle }