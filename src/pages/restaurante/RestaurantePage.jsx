import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { RestauranteCard } from "../../components/restaurante/RestauranteCard";
import { obtenerRestaurantes } from "../../services/restaurante/restauranteServicio";
import { SkeletonCard } from "../../components/common/loading/Skeleton";

function RestaurantePage() {
    const [restauranteEntity, setRestaurantes] = useState([]);
    const [buscando, setBuscando] = useState(true);

    useEffect(() => {
        const restaurantesData = async () => {
            try {
                const data = await obtenerRestaurantes();
                setRestaurantes(data);
                setBuscando(false);
            } catch (error) {
                setBuscando(false);
            }   
        }
        restaurantesData();
    }, []);

    return (
        <Container>
            {buscando ? (
                <SkeletonCard contador={6}/>
            ) : (
                restauranteEntity.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <SentimentVeryDissatisfied sx={{ fontSize: 60 }} color="action" />
                        <Typography variant="h6" mt={2}>No se encontraron restaurantes</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3} mb={5}>
                        {restauranteEntity.map(restaurante => (
                            <Grid item xs={12} sm={6} md={6} lg={6} key={restaurante.idRestaurante}>
                                <RestauranteCard restauranteEntity={restaurante} />
                            </Grid>
                        ))}
                    </Grid>
                ))
            }
        </Container>
    );
}

export { RestaurantePage };
