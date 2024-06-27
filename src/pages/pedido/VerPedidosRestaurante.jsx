import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { PedidoCard } from "../../components/pedido/PedidoCard";
import { obtenerPedidosRestaurante } from "../../services/pedido/pedidoServicio";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { useParams } from "react-router-dom";

function VerPedidosRestaurantePage() {
    const { id } = useParams();
    const [pedidosRestaurante, setPedidosRestaurante] = useState([]);
    const [buscando, setBuscando] = useState(true);

    useEffect(() => {
        const verPedidosRestaurantes = async () => {
            obtenerPedidosRestaurante(id)
                .then(data => setPedidosRestaurante(data))
                .catch(error => console.error("Error al obtener los pedidos de restaurantes: ", error))
                .finally(() => setBuscando(false));
        };
        verPedidosRestaurantes();
    }, [id]);

    return (
        <Container>
            {buscando ? (
                <SkeletonCard contador={6} />
            ) : (
                pedidosRestaurante.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <SentimentVeryDissatisfied sx={{ fontSize: 60 }} color="action" />
                        <Typography variant="h6" mt={2}>No se encontraron pedidos a este restaurante</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2} mb={5}>
                        {pedidosRestaurante.map(pedido => (
                            <Grid item xs={12} sm={6} md={4} lg={4} key={pedido.idPedido}>
                                <PedidoCard
                                    pedidoEntity={pedido}
                                    mostrarAccion={false}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
        </Container>
    );
}

export { VerPedidosRestaurantePage }