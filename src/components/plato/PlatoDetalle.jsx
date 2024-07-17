import PropTypes from 'prop-types';
import { Typography, CardMedia, Grid, Chip } from '@mui/material';
import { Restaurant, Description, FoodBank } from '@mui/icons-material';
import { API_URL } from "../../connections/helpers/endpoints";
import { DetalleContenedor } from '../common/detalleDrawer/DetalleContenedor';

function PlatoDetalle({ abrir, cerrar, platoEntidad }) {
    const imagenUrl = platoEntidad ? `${API_URL}${platoEntidad.imgPlato}` : '';

    const contenido = platoEntidad ? (
        <>
            <CardMedia
                component="img"
                sx={{ width: '100%', height: 'auto', borderRadius: 2, mt: 6, mb: 3 }}
                image={imagenUrl}
                alt={platoEntidad.nombrePlato}
            />            
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', mt: 0.5, mb: 2, color: "#C56B22" }}>
                        <FoodBank sx={{ marginRight: 1, fontSize: 45 }} /> {platoEntidad.nombrePlato}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 0.3, fontWeight: "bold", color: "#C56B22" }}>
                        <Chip
                            sx={{color: '#fff', bgcolor: '#FFA726', fontSize: 25, pt: 3, pb: 3}}
                            key={`${platoEntidad.precio} COP`}
                            label={`$${platoEntidad.precio} COP`}>                            
                        </Chip>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Restaurant sx={{ color: '#c2c2c2', marginRight: 1 }} /> {platoEntidad.nombreRestaurante}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: "justify" }}>
                        <Description sx={{ color: '#c2c2c2', marginRight: 1 }} /> {platoEntidad.descPlato}
                    </Typography>
                </Grid>                            
            </Grid>            
        </>
    ) : (
        <Typography variant="body2">Cargando...</Typography>
    )

    return (
        <DetalleContenedor abrir={abrir} cerrar={cerrar} contenido={contenido} />
    )
}

PlatoDetalle.propTypes = {
    abrir: PropTypes.bool.isRequired,
    cerrar: PropTypes.func.isRequired,
    platoEntidad: PropTypes.shape({
        nombrePlato: PropTypes.string,
        precio: PropTypes.number,
        nombreRestaurante: PropTypes.string,
        descPlato: PropTypes.string,
        imgPlato: PropTypes.string,
    })
}

export { PlatoDetalle }