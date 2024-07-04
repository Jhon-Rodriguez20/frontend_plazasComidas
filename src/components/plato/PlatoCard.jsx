import { useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Menu, MenuItem, Fade, Box, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { Edit, MoreVert, EmojiFoodBeverage } from '@mui/icons-material';
import { API_URL } from "../../connections/helpers/endpoints";
import { EliminarPlatoMenuItem } from "./EliminarPlatoMenuItem";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { agregarPlato } from "../../store/pedidoStore"; // Importa la acción de agregarPlato

function PlatoCard({ platoEntidad, mostrar, mostrarAcciones, click }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const conectado = useSelector((estado) => estado.usuario.conectado);
    const usuario = useSelector((estado) => estado.usuario.usuario); // Accede a la información del usuario
    const dispatch = useDispatch(); // Usa useDispatch para despachar acciones

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    }

    const handleMenuClick = (event) => {
        event.stopPropagation();
    }

    const agregarAlPedido = (event) => {
        event.stopPropagation();
        dispatch(agregarPlato(platoEntidad)); // Despacha la acción para agregar el plato
    }

    const imagenUrl = `${API_URL}${platoEntidad.imgPlato}`;

    if (!mostrar && platoEntidad.mostrado !== "1") return null;

    return (
        <Grid container onClick={click}>
            <Card sx={{ display: "flex", alignItems: 'center', padding: '4%', marginTop: 3, width: '100%', height: 'auto', position: 'relative' }}
                className="tarjeta-estilo"
            >
                <CardMedia
                    component="img"
                    sx={{ width: 110, height: 110, borderRadius: '50%' }}
                    image={imagenUrl}
                    alt={platoEntidad.nombrePlato}
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {platoEntidad.nombrePlato}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        $ {platoEntidad.precio}
                    </Typography>
                </CardContent>
                {mostrarAcciones ? (
                    <Box sx={{ position: 'absolute', top: 5, right: 2 }}>
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            onClick={handleMenuClick}
                        >
                            <MenuItem component={Link} to={`/editar/plato/${platoEntidad.idPlato}`}>
                                <Edit sx={{ color: 'blue', marginRight: 1 }} /> Editar plato
                            </MenuItem>
                            <EliminarPlatoMenuItem id={platoEntidad.idPlato}
                                nombrePlato={platoEntidad.nombrePlato} nombreRestaurante={platoEntidad.nombreRestaurante} />
                        </Menu>
                    </Box>
                ) : (usuario && usuario.rol === "4" && conectado) ? (
                    <Box sx={{ position: 'absolute', top: 12, right: 15 }}>
                        <Tooltip title="Agregar al pedido">
                            <IconButton
                                onClick={agregarAlPedido} // Asocia la función agregarAlPedido al click
                                aria-label="agregar"
                            >
                                <EmojiFoodBeverage sx={{ fontSize: 30 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ) : null}
            </Card>
        </Grid>
    );
}

PlatoCard.propTypes = {
    click: PropTypes.func.isRequired,
    mostrar: PropTypes.bool.isRequired,
    mostrarAcciones: PropTypes.bool.isRequired,
    platoEntidad: PropTypes.shape({
        nombrePlato: PropTypes.string,
        precio: PropTypes.number,
        imgPlato: PropTypes.string,
        mostrado: PropTypes.string,
        idPlato: PropTypes.string,
        nombreRestaurante: PropTypes.string
    }).isRequired
}

export { PlatoCard }