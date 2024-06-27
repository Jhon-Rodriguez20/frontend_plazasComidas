import { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { PedidoDetalle } from "../../components/pedido/PedidoDetalle";
import { verPedidoDetalle } from "../../services/pedido/pedidoServicio";
import { useNavigate, useParams } from "react-router-dom";

function PedidoDetallePage() {
    const { id } = useParams();
    const [pedido, setPedido] = useState(null);
    const navegar = useNavigate();

    useEffect(() => {
        const verDetalle = async () => {
            try {
                const data = await verPedidoDetalle(id);
                setPedido(data);
            } catch (error) {
                navegar(-1);
            }
        };
        verDetalle();
    }, [id, navegar]);

    return (
        <Container>
            <Box>
                {pedido && (
                    <PedidoDetalle pedidoEntity={pedido} />
                )}
            </Box>
        </Container>
    )
}

export { PedidoDetallePage }
