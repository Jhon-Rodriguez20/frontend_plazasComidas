import { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Box, Stack, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { API_URL } from "../../connections/helpers/endpoints";
import { obtenerTotalPedidosRestaurante } from "../../services/pedido/pedidoServicio";
import PropTypes from "prop-types";
import { Place, Restaurant, Fastfood } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { MenuOpciones } from "../../config/restaurante/MenuOpciones";
import { ValidarUsuarioConectado } from "../../middleware/ValidarUsuarioConectado";
import { ValidarUsuarioRol } from "../../middleware/ValidarUsuarioRol";

function RestauranteCard({ restauranteEntity, onClick, mostrar }) {
    const [numPedidos, setNumPedidos] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const usuario = useSelector((estado) => estado.usuario.usuario);
    const imagenUrl = `${API_URL}${restauranteEntity.imgRestaurante}`;

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    }

    const handleCerrar = (event) => {
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
            <Card sx={{ display: "flex", alignItems: 'center', padding: '4%', marginTop: 3, width: '100%', height: 'auto', position: 'relative', borderRadius: 3 }}
                className="tarjeta-estilo"
                >
                <CardMedia
                    component="img"
                    sx={{ width: 110, height: 110, borderRadius: '50%' }}
                    image={imagenUrl}
                    alt={restauranteEntity.razonSocial}
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontWeight: 'bold', color: "#C56B22" }}>
                        <Restaurant sx={{ marginRight: 1 }} /> {restauranteEntity.razonSocial}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Place sx={{ color: '#c2c2c2', marginRight: 1 }} /> {restauranteEntity.direccion}
                    </Typography>
                </CardContent>
                {mostrar && (
                    <>
                        <ValidarUsuarioConectado conectado={true}>
                            <ValidarUsuarioRol rolesPermitidos={["2"]}>
                                <Box sx={{ position: 'absolute', top: 5, right: 2 }}>
                                    <MenuOpciones 
                                        anchorEl={anchorEl}
                                        handleClick={handleClick}
                                        handleCerrar={handleCerrar}
                                        handleMenuClick={handleMenuClick}
                                        restauranteId={restauranteEntity.idRestaurante}
                                    />
                                </Box>
                            </ValidarUsuarioRol>
                        </ValidarUsuarioConectado>
                        <ValidarUsuarioConectado conectado={true}>
                            <ValidarUsuarioRol rolesPermitidos={["3"]}>
                                <Link to={`/verPedidos/restaurante/${restauranteEntity.idRestaurante}`} sx={{ textDecoration: 'none' }}>
                                    <Stack className="icono-pedido" sx={{ position: 'absolute', top: 15, right: 15 }}>
                                        {numPedidos > 0 && (
                                            <Badge badgeContent={numPedidos > 9 ? "9+" : numPedidos} color="secondary"/>
                                        )}
                                        <Fastfood color="action" />
                                    </Stack>
                                </Link>
                            </ValidarUsuarioRol>
                        </ValidarUsuarioConectado>
                    </>
                )}
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