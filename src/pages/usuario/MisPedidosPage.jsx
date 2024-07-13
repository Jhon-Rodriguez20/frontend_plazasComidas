import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography, Stack } from "@mui/material";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { PedidoCard } from "../../components/pedido/PedidoCard";
import { obtenerMisPedidos } from "../../services/usuario/usuarioServicio";
import { Paginacion } from "../../components/common/paginacion/Paginacion";

function MisPedidosPage() {
    const [pedidos, setPedidos] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(8);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const verPedidos = async () => {
            try {
                const { pedidos, total } = await obtenerMisPedidos(page, pageSize);
                setPedidos(pedidos);
                setTotal(total);
            } catch (error) {
                console.error(error);
            } finally {
                setBuscando(false);
            }
        };
        verPedidos();
    }, [page, pageSize]);

    const handleCambiarPagina = (value) => {
        setPage(value);
    };

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
                    <>
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
    )
}

export {MisPedidosPage}