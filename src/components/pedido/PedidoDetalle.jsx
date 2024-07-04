import PropTypes from "prop-types";
import { Typography, Grid, Card, CardMedia, CardContent, Box } from '@mui/material';
import { DateRange, Restaurant, Phone, PersonOutline, Person, Receipt, FastfoodOutlined, Payment, AttachMoney } from "@mui/icons-material";
import { EstadoCirculo } from './PedidoEstado';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function PedidoDetalle({ pedidoEntity }) {
    const fecha = new Date(pedidoEntity.fechaPedido);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const fechaFormateada = fecha.toLocaleString('es-ES', options);
    const usuario = useSelector((estado) => estado.usuario.usuario);
    const navegar = useNavigate();

    const handleEditarEstado = () => (usuario.rol === "3") ? navegar(`/pedido/editar-estado/${pedidoEntity.idPedido}`) : null;

    return (
        <>
            <Typography variant="h4" fontWeight={"bold"} textAlign={"center"} mt={3} mb={7}>
                Datos del pedido
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" color="ButtonText" display="flex" alignItems="center">
                        <PersonOutline sx={{ marginRight: 1 }} /> Datos del cliente
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                        <Person sx={{ marginRight: 1 }} /> Cliente
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.nombrePersona}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                        <Phone sx={{ marginRight: 1 }} /> Número de contacto
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.celular}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                        <Restaurant sx={{ marginRight: 1 }} /> Nombre restaurante
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.razonSocial}
                    </Typography>
                </Grid>
                <Grid item xs={12} mt={3}>
                    <Typography variant="h5" color="ButtonText" display="flex" alignItems="center">
                        <FastfoodOutlined sx={{ marginRight: 1 }} /> Datos del pedido
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                        <DateRange sx={{ marginRight: 1 }} /> Fecha de pedido
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {fechaFormateada}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                        <Receipt sx={{ marginRight: 1 }} /> Número de pedido
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.numeroPedido}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                        <Payment sx={{ marginRight: 1 }} /> Método de pago
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.metodoPago}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                        <AttachMoney sx={{ marginRight: 1 }} /> Total a pagar
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.totalPagar} COP
                    </Typography>
                </Grid>
            </Grid>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                onClick={handleEditarEstado}
                sx={{ cursor: 'pointer' }}
            >
                <Typography variant="h4" fontWeight="bold" display="flex" alignItems="center" mt={5} mb={3}>
                    Estado del pedido
                </Typography>
                <EstadoCirculo estado={pedidoEntity.estado} editable={false} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    {pedidoEntity.estado}
                </Typography>
            </Box>

            <Typography variant="h4" fontWeight={"bold"} textAlign={"center"} mt={7} mb={7}>
                Detalles del pedido
            </Typography>
            <Grid container spacing={2} mb={8}>
                {pedidoEntity.detalles.map((detalle) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={detalle.idDetalle}>
                            <Card className="tarjeta-estilo" sx={{ mb: 3 }}>
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={detalle.imgPlato}
                                    alt={detalle.nombrePlato}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {detalle.nombrePlato}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" gutterBottom>
                                        Precio: {detalle.precio} COP
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" gutterBottom>
                                        Cantidad: {detalle.cantidad}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
}

PedidoDetalle.propTypes = {
    pedidoEntity: PropTypes.object.isRequired,
};

export { PedidoDetalle }