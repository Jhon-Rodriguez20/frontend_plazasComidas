import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography, Stack } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { RestauranteCard } from "../../components/restaurante/RestauranteCard";
import { obtenerRestaurantes, leerDetalleRestaurante } from "../../services/restaurante/restauranteServicio";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { RestauranteDetalle } from "../../components/restaurante/RestauranteDetalle";
import PropTypes from "prop-types";
import { Paginacion } from "../common/paginacion/Paginacion";

function RestauranteLista({ mostrarPropiedad, extraBottomSpacing }) {
    const [restaurantes, setRestaurantes] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [detalleAbrir, setDetalleAbrir] = useState(false);
    const [restauranteDetalle, setRestauranteDetalle] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(8);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const verRestaurantes = async () => {
            setBuscando(true);
            try {
                const { restaurantes, total } = await obtenerRestaurantes(page, pageSize);
                setRestaurantes(restaurantes);
                setTotal(total);
            } catch (error) {
                console.error(error);
            } finally {
                setBuscando(false);
            }
        };
        verRestaurantes();
    }, [page, pageSize]);

    const abrirDetalle = (restaurante) => {
        leerDetalleRestaurante(restaurante)
            .then(detalle => {
                setRestauranteDetalle(detalle);
                setDetalleAbrir(true);
            })
            .catch(() => {});
    };

    const handlePageChange = (value) => {
        setPage(value);
    };

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
                    <>
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
                        <Stack spacing={2} alignItems="center" mt={4}>
                            <Paginacion 
                                page={page} 
                                totalPages={Math.ceil(total / pageSize)} 
                                onPageChange={handlePageChange} 
                            />
                        </Stack>
                    </>
                )
            )}
            <RestauranteDetalle abrir={detalleAbrir} cerrar={() => setDetalleAbrir(false)} restauranteEntity={restauranteDetalle} />
        </Container>
    );
}

RestauranteLista.propTypes = {
    mostrarPropiedad: PropTypes.bool.isRequired,
    extraBottomSpacing: PropTypes.number.isRequired
};

export { RestauranteLista }