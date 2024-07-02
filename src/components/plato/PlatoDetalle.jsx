import PropTypes from 'prop-types';
import { Typography, CardMedia, Grid } from '@mui/material';
import { Restaurant, Description, FoodBank, MonetizationOn } from '@mui/icons-material';
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
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', mt: 0.5, mb: 2 }}>
                        <FoodBank sx={{ marginRight: 1, fontSize: "125%" }} /> {platoEntidad.nombrePlato}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontWeight: "bold" }}>
                        <MonetizationOn sx={{ fontSize: "95%" }}/> {platoEntidad.precio}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Restaurant sx={{ color: '#c2c2c2', marginRight: 1 }} /> {platoEntidad.nombreRestaurante}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: "justify" }}>
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