import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { API_URL } from "../../connections/helpers/endpoints";
import PropTypes from "prop-types";
import { Place, Restaurant } from '@mui/icons-material';

function RestauranteCard({ restauranteEntity, onClick, mostrar }) {

    const imagenUrl = `${API_URL}${restauranteEntity.imgRestaurante}`;

    return (
        <Grid container onClick={onClick}>
            <Card sx={{ display: "flex", alignItems: 'center', padding: '4%', marginTop: 3, maxWidth: { xs: '100%', sm: '100%', md:'100%', lg: '100%' }, minWidth: { xs: '93%', sm: '93%', md:'92%', lg: '92%'},
                        maxHeight: { xs: '100%', sm: '100%', md:'100%', lg: '100%' }, minHeight: {xs: '95%', sm: '95%', md:'100%', lg: '100%'} }}>
                <CardMedia
                    component="img"
                    sx={{ width: 110, height: 110, borderRadius: '50%' }}
                    image={imagenUrl}
                    alt={restauranteEntity.razonSocial}
                />
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Restaurant sx={{ marginRight: 1 }} /> {restauranteEntity.razonSocial}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Place sx={{ color: '#c2c2c2', marginRight: 1 }} /> {restauranteEntity.direccion}
                    </Typography>
                    {mostrar && (
                        <Typography component="div" sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                            <Button variant='contained' size='medium' component={Link} to={`/crear/plato/${restauranteEntity.idRestaurante}`}>
                                Crear un plato
                            </Button>
                        </Typography>
                    )}
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
        idRestaurante: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    mostrar: PropTypes.bool.isRequired
}

export { RestauranteCard }