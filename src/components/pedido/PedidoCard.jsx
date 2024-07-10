import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
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
        <Grid container>
            <Card sx={{ display: "flex", alignItems: 'center', padding: '4%', marginTop: 3, width: '100%', height: 'auto', position: 'relative', borderRadius: 4 }}
                className="tarjeta-estilo"
            >
                <CardMedia>
                    {pedidoEntity.idEstado === "1" ? (
                        <IconoPendiente ancho={90} alto={90} />
                    ) : pedidoEntity.idEstado === "2" ? (
                        <IconoPreparandoComida ancho={90} alto={90} />
                    ) : pedidoEntity.idEstado === "3" ? (
                        <IconoListo ancho={90} alto={90} />
                    ) : (
                        <IconoPedidoEntregado ancho={90} alto={90} />
                    )}
                </CardMedia>
                <CardContent
                sx={{
                    flex: '1 1 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    textAlign: { xs: 'center', sm: 'left' }
                }}
                >
                    <Typography gutterBottom variant="h5" fontWeight="bold" component="div">
                        {pedidoEntity.numeroPedido}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={1}>
                        {pedidoEntity.nombrePersona}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        {moment(pedidoEntity.fechaPedido).fromNow()}
                    </Typography>
                    <Button sx={{ border: '1px solid', borderColor: '#FEA93C', color: '#FFF', textTransform: 'uppercase', fontWeight: 'bold'}}
                        className='estilo-botones-autenticacion' size='medium' component={Link} 
                        to={`/pedido/informacion/${pedidoEntity.idPedido}`}>
                        Consultar detalle
                    </Button>
                    {mostrarAccion && pedidoEntity.idEstado === "1" && (
                        <Box sx={{ position: 'absolute', top: 5, right: 2 }}>
                            <EliminarPedidoBoton id={pedidoEntity.idPedido} sx={{ mt: 2, alignSelf: 'flex-end' }} />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Grid>
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