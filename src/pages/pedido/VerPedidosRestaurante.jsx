import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography, Stack } from "@mui/material";
import { PedidoCard } from "../../components/pedido/PedidoCard";
import { obtenerPedidosRestaurante } from "../../services/pedido/pedidoServicio";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { useParams } from "react-router-dom";
import { Paginacion } from "../../components/common/paginacion/Paginacion";
import { IconoNoEncontrado } from "../../components/static/icon/IconoNoEncontrado";

function VerPedidosRestaurantePage() {
    const { id } = useParams();
    const [pedidosRestaurante, setPedidosRestaurante] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(8);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const verPedidosRestaurantes = async () => {
            try {
                const { pedidos, total } = await obtenerPedidosRestaurante(id, page, pageSize);
                setPedidosRestaurante(pedidos);
                setTotal(total);
            } catch (error) {
                console.error(error);
            } finally {
                setBuscando(false);
            }
        };
        verPedidosRestaurantes();
    }, [id, page, pageSize]);

    const handleCambiarPagina = (value) => {
        setPage(value);
    }

    return (
        <Container sx={{ mb: 8 }}>
            {buscando ? (
                <SkeletonCard contador={6} />
            ) : (
                pedidosRestaurante.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <IconoNoEncontrado ancho={100} alto={100} />
                        <Typography variant="h6" mt={2}>No se encontraron pedidos a este restaurante</Typography>
                    </Box>
                ) : (
                    <>
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
                        <Stack spacing={2} alignItems="center" mt={4}>
                            <Paginacion 
                                page={page} 
                                totalPages={Math.ceil(total / pageSize)}
                                onPageChange={handleCambiarPagina}
                            />
                        </Stack>
                    </>
                )
            )}
        </Container>
    );
}

export { VerPedidosRestaurantePage }