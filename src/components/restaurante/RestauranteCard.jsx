import { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardMedia, Typography,
 IconButton, Menu, MenuItem, Fade, Box, Stack, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { API_URL } from "../../connections/helpers/endpoints";
import { obtenerTotalPedidosRestaurante } from "../../services/pedido/pedidoServicio";
import PropTypes from "prop-types";
import { Place, Restaurant, AddBox, MoreVert, DinnerDining, Fastfood } from '@mui/icons-material';
import { useSelector } from "react-redux";

function RestauranteCard({ restauranteEntity, onClick, mostrar }) {
    const [numPedidos, setNumPedidos] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const conectado = useSelector((estado) => estado.conectado);
    const usuario = useSelector((estado) => estado.usuario);
    const imagenUrl = `${API_URL}${restauranteEntity.imgRestaurante}`;

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

    useEffect(() => {
        const obtenerNumPedidos = async () => {
            try {
                const totalPedidos = await obtenerTotalPedidosRestaurante(restauranteEntity.idRestaurante);
                setNumPedidos(totalPedidos);
            } catch (error) {
                console.error("Error al obtener el número de pedidos:", error);
            }
        };

        if (usuario.rol === "3") {
            obtenerNumPedidos();
        }
    }, [restauranteEntity.idRestaurante, usuario.rol]);

    return (
        <Grid container onClick={onClick}>
            <Card sx={{ display: "flex", alignItems: 'center', padding: '4%', marginTop: 3, maxWidth: { xs: '100%', sm: '100%', md:'100%', lg: '100%' }, minWidth: { xs: '93%', sm: '93%', md:'92%', lg: '92%'},
                        maxHeight: { xs: '100%', sm: '100%', md:'100%', lg: '100%' }, minHeight: {xs: '95%', sm: '95%', md:'100%', lg: '100%'}, position: 'relative' }}
                className="tarjeta-estilo"
                >
                <CardMedia
                    component="img"
                    sx={{ width: 110, height: 110, borderRadius: '50%' }}
                    image={imagenUrl}
                    alt={restauranteEntity.razonSocial}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Restaurant sx={{ marginRight: 1 }} /> {restauranteEntity.razonSocial}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Place sx={{ color: '#c2c2c2', marginRight: 1 }} /> {restauranteEntity.direccion}
                    </Typography>
                </CardContent>
                {mostrar && conectado && usuario.rol === "2" ? (
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
                            <MenuItem component={Link} to={`/crear/plato/${restauranteEntity.idRestaurante}`}>
                                <AddBox sx={{ color: '#c2c2c2', marginRight: 1 }} /> Crear plato
                            </MenuItem>
                            <MenuItem component={Link} to={`/verPlatos/${restauranteEntity.idRestaurante}`}>
                                <DinnerDining sx={{ color: '#c2c2c2', marginRight: 1 }} /> Ver platos
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (mostrar && conectado && usuario.rol === "3") ? (
                    <Link to={`/verPedidos/restaurante/${restauranteEntity.idRestaurante}`} style={{ textDecoration: 'none' }}>
                        <Stack sx={{ position: 'absolute', top: 15, right: 15 }}>
                            {numPedidos > 0 && (
                                <Badge badgeContent={numPedidos > 9 ? "9+" : numPedidos} color="secondary"/>
                            )}
                            <Fastfood color="action" />                            
                        </Stack>
                    </Link>
                ) : ""}
            </Card>
        </Grid>
    )
}

RestauranteCard.propTypes = {
    restauranteEntity: PropTypes.shape({
        razonSocial: PropTypes.string,
        direccion: PropTypes.string,
        imgRestaurante: PropTypes.string,
        idRestaurante: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    mostrar: PropTypes.bool.isRequired
}

export { RestauranteCard }