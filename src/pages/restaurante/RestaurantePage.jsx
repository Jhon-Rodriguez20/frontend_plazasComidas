import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { RestauranteCard } from "../../components/restaurante/RestauranteCard";
import { obtenerRestaurantes, leerDetalleRestaurante } from "../../services/restaurante/restauranteServicio";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { RestauranteDetalle } from "../../components/restaurante/RestauranteDetalle";

function RestaurantePage() {
    const [restaurantes, setRestaurantes] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [detalleOpen, setDetalleOpen] = useState(false);
    const [restauranteDetalle, setRestauranteDetalle] = useState(null);

    useEffect(() => {
        const verRestaurantes = async () => {
            try {
                const data = await obtenerRestaurantes();
                setRestaurantes(data);
            } catch (error) {
                console.error("Error al obtener restaurantes:", error);
                setBuscando(false);
            }
        }
        verRestaurantes();
    }, []);

    const abrirDetalle = async (restaurante) => {
        try {
            setDetalleOpen(true);
            const detalle = await leerDetalleRestaurante(restaurante);
            setRestauranteDetalle(detalle);
        } catch (error) {
            console.error("Error al obtener el detalle del restaurante:", error);
        }
    };

    return (
        <Container>
            {buscando ? (
                <SkeletonCard contador={6}/>
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
                                    onClick={() => abrirDetalle(restaurante)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
            <RestauranteDetalle open={detalleOpen} onClose={() => setDetalleOpen(false)} restauranteEntity={restauranteDetalle} />
        </Container>
    );
}

export { RestaurantePage };
