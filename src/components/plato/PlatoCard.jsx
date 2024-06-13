import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { API_URL } from "../../connections/helpers/endpoints";
import PropTypes from "prop-types";

function PlatoCard({ platoEntidad, mostrar, click }) {
    const imagenUrl = `${API_URL}${platoEntidad.imgPlato}`;

    if (!mostrar || platoEntidad.mostrado !== "1") return null;

    return (
        <Grid container onClick={click}>
            <Card sx={{ display: "flex", alignItems: 'center', padding: '4%', width: '100%', height: 'auto' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 110, height: 110, borderRadius: '50%' }}
                    image={imagenUrl}
                    alt={platoEntidad.nombrePlato}
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {platoEntidad.nombrePlato}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        $ {platoEntidad.precio}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

PlatoCard.propTypes = {
    click: PropTypes.func.isRequired,
    mostrar: PropTypes.bool.isRequired,
    platoEntidad: PropTypes.shape({
        nombrePlato: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        imgPlato: PropTypes.string.isRequired,
        mostrado: PropTypes.string.isRequired
    }).isRequired
}

export { PlatoCard }