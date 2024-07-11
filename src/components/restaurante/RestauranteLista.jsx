import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { RestauranteCard } from "../../components/restaurante/RestauranteCard";
import { obtenerRestaurantes, leerDetalleRestaurante } from "../../services/restaurante/restauranteServicio";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { RestauranteDetalle } from "../../components/restaurante/RestauranteDetalle";
import PropTypes from "prop-types";

function RestauranteLista({ mostrarPropiedad, extraBottomSpacing }) {
    const [restaurantes, setRestaurantes] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [detalleAbrir, setDetalleAbrir] = useState(false);
    const [restauranteDetalle, setRestauranteDetalle] = useState(null);

    useEffect(() => {
        const verRestaurantes = async () => {
            obtenerRestaurantes()
                .then(data => setRestaurantes(data))
                .catch(() => {})
                .finally(() => setBuscando(false));
        };
        verRestaurantes();
    }, []);

    const abrirDetalle = (restaurante) => {
        leerDetalleRestaurante(restaurante)
            .then(detalle => {
                setRestauranteDetalle(detalle);
                setDetalleAbrir(true);
            })
            .catch(() => {});
    }

    return (
        <Container sx={{ mb: extraBottomSpacing }}>
            {buscando ? (
                <SkeletonCard contador={6} />
            ) : (
                restaurantes.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <SentimentVeryDissatisfied sx={{ fontSize: 60 }} color="action" />
                        <Typography variant="h6" mt={2}>No se encontraron restaurantes</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3} mb={5}>
                        {restaurantes.map(restaurante => (
                            <Grid item xs={12} sm={6} md={6} lg={6} key={restaurante.idRestaurante}>
                                <RestauranteCard 
                                    restauranteEntity={restaurante}
                                    mostrar={mostrarPropiedad}
                                    onClick={() => abrirDetalle(restaurante)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
            <RestauranteDetalle abrir={detalleAbrir} cerrar={() => setDetalleAbrir(false)} restauranteEntity={restauranteDetalle} />
        </Container>
    );
}

RestauranteLista.propTypes = {
    mostrarPropiedad: PropTypes.bool.isRequired,
    extraBottomSpacing: PropTypes.number.isRequired
}

export { RestauranteLista }