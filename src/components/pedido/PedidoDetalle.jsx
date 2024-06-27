import PropTypes from "prop-types";
import { Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { DateRange, Restaurant, Phone, PersonOutline, Person,
    Receipt, FastfoodOutlined, Payment, AttachMoney, Info
 } from "@mui/icons-material";

function PedidoDetalle({ pedidoEntity }) {
    const fecha = new Date(pedidoEntity.fechaPedido);
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}
    const fechaFormateada = fecha.toLocaleString('es-ES', options);

    return (
        <>
            <Typography variant="h4" fontWeight={"bold"} textAlign={"center"} mt={3} mb={7}>
                Datos del pedido
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" color="ButtonText">
                        <PersonOutline/> Datos del cliente
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        <Person/> Cliente
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.nombrePersona}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        <Phone/> Número de contacto
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.celular}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        <Restaurant /> Nombre restaurante
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.razonSocial}
                    </Typography>
                </Grid>
                <Grid item xs={12} mt={3}>
                    <Typography variant="h5" color="ButtonText">
                        <FastfoodOutlined/> Datos del pedido
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        <DateRange /> Fecha de pedido
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {fechaFormateada}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        <Receipt/> Número de pedido
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.numeroPedido}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        <Payment/> Método de pago
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.metodoPago}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        <AttachMoney/> Total a pagar
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.totalPagar} COP
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="h6" gutterBottom>
                        <Info/> Estado de pedido
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {pedidoEntity.estado}
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="h4" fontWeight={"bold"} textAlign={"center"} mt={5} mb={7}>
                Detalles del pedido
            </Typography>
            <Grid container spacing={2}>
                {pedidoEntity.detalles.map((detalle) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={detalle.idDetalle}>
                            <Card>
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
                    );
                })}
            </Grid>
        </>
    );
}

PedidoDetalle.propTypes = {
    pedidoEntity: PropTypes.shape({
        razonSocial: PropTypes.string,
        nombrePersona: PropTypes.string,
        fechaPedido: PropTypes.string,
        numeroPedido: PropTypes.string,
        totalPagar: PropTypes.number,
        metodoPago: PropTypes.string,
        estado: PropTypes.string,
        celular: PropTypes.string,
        detalles: PropTypes.arrayOf(
            PropTypes.shape({
                idDetalle: PropTypes.string,
                nombrePlato: PropTypes.string,
                precio: PropTypes.number,
                cantidad: PropTypes.number,
                imgPlato: PropTypes.string
            })
        ).isRequired
    }).isRequired
}

export { PedidoDetalle }
