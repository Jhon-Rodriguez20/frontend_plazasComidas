import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from "prop-types";
import { IconoPendiente } from '../static/icon/IconoPendiente';
import { IconoPreparandoComida } from '../static/icon/IconoPreparando';
import { IconoListo } from '../static/icon/IconoListo';
import { IconoPedidoEntregado } from '../static/icon/IconoEntregado';
import moment from 'moment';
import { EliminarPedidoBoton } from "./EliminarPedidoToolTip";
import { Link } from 'react-router-dom';

function PedidoCard({ pedidoEntity, mostrarAccion }) {
    moment.locale('es');

    return (
        <Card
            sx={{ display: "flex", alignItems: 'center', padding: '4%', marginTop: 3, width: '100%', height: 'auto', position: 'relative' }}
        >
            <CardMedia>
                {pedidoEntity.idEstado === "1" ? (
                    <IconoPendiente ancho={90} alto={90} />
                ) :
                pedidoEntity.idEstado === "2" ? (
                    <IconoPreparandoComida ancho={90} alto={90} />
                ) :
                pedidoEntity.idEstado === "3" ? (
                    <IconoListo ancho={90} alto={90} />
                ) :
                    <IconoPedidoEntregado ancho={90} alto={90} />
                }
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" fontWeight={"bold"} component="div">
                    {pedidoEntity.numeroPedido}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {pedidoEntity.nombrePersona}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    {moment(pedidoEntity.fechaPedido).fromNow()}
                </Typography>
                <Link to={`/pedido/informacion/${pedidoEntity.idPedido}`} style={{ color: '#0051ff' }}>
                    Ver detalles del pedido
                </Link>
            </CardContent>
            {mostrarAccion && (pedidoEntity.idEstado === "1") ? (
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <EliminarPedidoBoton id={pedidoEntity.idPedido} />
                </Box>
            ) : ""}
        </Card>
    );
}

PedidoCard.propTypes = {
    mostrarAccion: PropTypes.bool.isRequired,
    pedidoEntity: PropTypes.shape({
        idPedido: PropTypes.string,
        nombrePersona: PropTypes.string,
        numeroPedido: PropTypes.string,
        idEstado: PropTypes.string,
        fechaPedido: PropTypes.string
    }).isRequired
}

export { PedidoCard }