import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { PedidoCard } from "../../components/pedido/PedidoCard";
import { obtenerMisPedidos } from "../../services/usuario/usuarioServicio";

function MisPedidosPage() {
    const [pedidos, setPedidos] = useState([]);
    const [buscando, setBuscando] = useState(true);

    useEffect(() => {
        const verPedidos = async () => {
            obtenerMisPedidos()
                .then(data => setPedidos(data))
                .catch(error => console.error("Error al obtener los pedidos: ", error))
                .finally(() => setBuscando(false));
        };
        verPedidos();
    }, []);

    return (
        <Container sx={{mb: 8}}>
            {buscando ? (
                <SkeletonCard contador={6} />
            ) : (
                pedidos.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        {/* <VerifiedUser sx={{ fontSize: 60 }} color="action" /> */}
                        <Typography variant="h6" mt={2}>No se encontraron pedidos</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3} mb={5}>
                        {pedidos.map(pedido => (
                            <Grid item xs={12} sm={6} md={4} lg={4} key={pedido.idPedido}>
                                <PedidoCard 
                                    pedidoEntity={pedido}
                                    mostrarAccion={true}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
        </Container>
    )
}

export {MisPedidosPage}