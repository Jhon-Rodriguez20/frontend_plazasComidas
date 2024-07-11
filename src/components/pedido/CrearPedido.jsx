import { useState, useEffect } from 'react';
import { Fab, Tooltip, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Badge, Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { ShoppingCart, Delete, Remove, Add } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { eliminarPlato, actualizarCantidad, vaciarPedido } from '../../store/pedidoStore';
import { DetalleContenedor } from '../common/detalleDrawer/DetalleContenedor';
import { API_URL, CREARPEDIDO_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { PedidoMetodoPago } from './PedidoMetodoPago';
import useAlertas from "../common/alertas/tipoAlertas";

const CrearPedido = () => {
    const [abrir, setAbrir] = useState(false);
    const [idMetodoPago, setMetodoPago] = useState("");
    const platosSeleccionados = useSelector(state => state.pedido.platos);
    const idRestaurante = useSelector(state => state.pedido.idRestaurante);
    const dispatch = useDispatch();
    const theme = useTheme();
    const pantallaPequena = useMediaQuery(theme.breakpoints.down('sm'));
    const navegar = useNavigate();
    const { mostrarAlertaAdvertencia, mostrarAlertaExito, mostrarAlertaError } = useAlertas();

    useEffect(() => {
        if (platosSeleccionados.length === 0) {
            setAbrir(false);
        }
    }, [platosSeleccionados]);

    const handleAbrir = () => {
        setAbrir(true);
    };

    const handleCerrar = () => {
        setAbrir(false);
    };

    const handleEliminarPlato = (idPlato) => {
        dispatch(eliminarPlato(idPlato));
    };

    const handleCantidad = (idPlato, cantidad) => {
        if (cantidad > 0) {
            dispatch(actualizarCantidad({ idPlato, cantidad }));
        }
    };

    const totalPagar = platosSeleccionados.reduce((total, plato) => total + (plato.cantidad * plato.precio), 0);

    const handleCrearPedido = async () => {
        if (!idMetodoPago) {
            mostrarAlertaAdvertencia("Seleccione un método de pago");
            return;
        }

        const detalles = platosSeleccionados.map(plato => ({
            idPlato: plato.idPlato,
            cantidad: plato.cantidad
        }));

        const pedido = {
            totalPagar,
            idMetodoPago,
            idRestaurante,
            detalles
        };

        try {
            await axios.post(CREARPEDIDO_POST_ENDPOINT, pedido);
            navegar("/verPedidos/hechos");
            mostrarAlertaExito("Pedido ordenado exitosamente");
            dispatch(vaciarPedido());
            setAbrir(false);
        } catch (error) {
            const mensajeError = error.response?.data?.error || "Ocurrió un error al crear el pedido.";
            mostrarAlertaError(mensajeError);
        }
    };

    return (
        <>
            {platosSeleccionados.length > 0 && (
                <Tooltip title="Ver Pedido">
                    <Fab color='warning' aria-label="ver pedido" onClick={handleAbrir} sx={{ position: 'fixed', top: "50%", right: 16 }}>
                        <Badge badgeContent={platosSeleccionados.length} color="error">
                            <ShoppingCart sx={{ fontSize: 30 }} />
                        </Badge>
                    </Fab>
                </Tooltip>
            )}
            <DetalleContenedor
                abrir={abrir}
                cerrar={handleCerrar}
                contenido={
                    <List sx={{ mt: 4 }}>
                        {platosSeleccionados.map(plato => (
                            <ListItem key={plato.idPlato} sx={{ mb: 1 }}>
                                <ListItemAvatar sx={{ mr: 2 }}>
                                    <Avatar src={`${API_URL}${plato.imgPlato}`} sx={{ width: 80, height: 80 }} />
                                </ListItemAvatar>
                                <ListItemText primary={plato.nombrePlato} secondary={`$${plato.precio}`} />
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton
                                        variant="text"
                                        sx={{ m: 1 }}
                                        size={pantallaPequena ? 'small' : 'medium'}
                                        color="inherit"
                                        onClick={() => handleCantidad(plato.idPlato, plato.cantidad > 1 ? plato.cantidad - 1 : 1)}
                                        disabled={plato.cantidad <= 1}
                                    >
                                        <Remove />
                                    </IconButton>
                                    <Typography variant='body1' color="text.secondary">{plato.cantidad}</Typography>
                                    <IconButton
                                        variant="text"
                                        sx={{ m: 1 }}
                                        size={pantallaPequena ? 'small' : 'medium'}
                                        color="inherit"
                                        onClick={() => handleCantidad(plato.idPlato, plato.cantidad + 1)}
                                    >
                                        <Add />
                                    </IconButton>
                                </Box>
                                <IconButton edge="end" aria-label="eliminar" onClick={() => handleEliminarPlato(plato.idPlato)}>
                                    <Delete sx={{ color: 'red' }} />
                                </IconButton>
                            </ListItem>
                        ))}
                        <ListItem>
                            <PedidoMetodoPago idMetodoPago={setMetodoPago} />
                        </ListItem>
                        <ListItem sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                            <Typography variant='h6' sx={{ fontWeight: 'bold', }}>Total a Pagar: ${totalPagar}</Typography>
                        </ListItem>
                        <ListItem>
                            <Box display={'flex'} justifyContent={'center'} width={'100%'}>
                                <Button className="estilo-button" onClick={handleCrearPedido} size='medium'
                                    sx={{border: '1px solid', borderColor: '#FEA93C', color: '#FEA93C', textTransform: 'uppercase', fontWeight: 'bold'}}>
                                    Ordenar pedido
                                </Button>
                            </Box>
                        </ListItem>
                    </List>
                }
            />
        </>
    );
};

export { CrearPedido }