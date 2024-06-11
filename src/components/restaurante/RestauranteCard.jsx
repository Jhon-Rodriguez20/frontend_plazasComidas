import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { API_URL } from "../../connections/helpers/endpoints";
import PropTypes from "prop-types";

function RestauranteCard({ restauranteEntity }) {

    const imagenUrl = `${API_URL}${restauranteEntity.imgRestaurante}`;

    return (
        <Grid container>
            <Card sx={{ display: "flex", alignItems: 'center', padding: '4%', maxWidth: { xs: '100%', sm: '100%', md:'100%', lg: '100%' }, minWidth: { xs: '93%', sm: '93%', md:'92%', lg: '92%'},
                        maxHeight: { xs: '100%', sm: '100%', md:'100%', lg: '100%' }, minHeight: {xs: '95%', sm: '95%', md:'100%', lg: '100%'} }}>
                <CardMedia
                    component="img"
                    sx={{ width: 110, height: 110, borderRadius: '50%' }}
                    image={imagenUrl}
                    alt={restauranteEntity.razonSocial}
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {restauranteEntity.razonSocial}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {restauranteEntity.direccion}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

RestauranteCard.propTypes = {
    restauranteEntity: PropTypes.shape({
        razonSocial: PropTypes.string,
        direccion: PropTypes.string,
        imgRestaurante: PropTypes.string,
    }).isRequired
}

export {RestauranteCard}