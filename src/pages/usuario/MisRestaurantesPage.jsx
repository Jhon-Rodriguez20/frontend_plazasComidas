import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { Restaurant } from "@mui/icons-material";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { RestauranteCard } from "../../components/restaurante/RestauranteCard";
import { obtenerMisRestaurantes } from "../../services/usuario/usuarioServicio";
import { leerDetalleRestaurante } from "../../services/restaurante/restauranteServicio";
import { RestauranteDetalle } from "../../components/restaurante/RestauranteDetalle";

function MisRestaurantesPage() {
    const [restaurantes, setRestaurantes] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [detalleAbrir, setDetalleAbrir] = useState(false);
    const [restauranteDetalle, setRestauranteDetalle] = useState(null);

    useEffect(() => {
        const verRestaurantes = async () => {
            obtenerMisRestaurantes()
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
        <Container sx={{mb: 8}}>
            {buscando ? (
                <SkeletonCard contador={6} />
            ) : (
                restaurantes.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <Restaurant sx={{ fontSize: 60 }} color="action" />
                        <Typography variant="h6" mt={2}>No se encontraron restaurantes</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3} mb={5}>
                        {restaurantes.map(restaurante => (
                            <Grid item xs={12} sm={6} md={6} lg={6} key={restaurante.idRestaurante}>
                                <RestauranteCard
                                    mostrar={true}
                                    restauranteEntity={restaurante}
                                    onClick={() => abrirDetalle(restaurante)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
            <RestauranteDetalle abrir={detalleAbrir} cerrar={() => setDetalleAbrir(false)} restauranteEntity={restauranteDetalle} />
        </Container>
    )
}

export {MisRestaurantesPage}