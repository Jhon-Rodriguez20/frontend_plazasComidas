import { AppBar, Toolbar, Typography, Button, Box, Tooltip, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { Logout, Login, SupervisorAccount, People, AssignmentInd, Group, PersonAdd, Fastfood, Restaurant } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../connections/usuarioAcciones';

function NavbarWeb() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const conectado = useSelector((estado) => estado.usuario.conectado);
    const usuario = useSelector((estado) => estado.usuario.usuario);
    const dispatch = useDispatch();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const handleLogout = () => {
        setAnchorElUser(null);
        dispatch(cerrarSesion());
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" component="div">
                        Plazas de comidas
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                    {usuario && usuario.rol === "1" && conectado && (
                        <Button color="inherit" component={Link} to="/crear/gerente"><SupervisorAccount sx={{ marginRight: 1 }} /> Crear gerente</Button>
                    )}
                    {usuario.rol === "2" && conectado && (
                        <Button color="inherit" component={Link} to="/crear/empleado"><People sx={{ marginRight: 1 }} /> Crear empleado</Button>
                    )}
                    {usuario && usuario.rol === "3" && conectado && (
                        <Button color="inherit" component={Link} to="/pedidos/restaurante"><Fastfood sx={{ marginRight: 1 }} /> Ver pedidos</Button>
                    )}
                    {!conectado ? (
                        <>
                            <Button color="inherit" component={Link} to="/usuario/loguearse"><Login sx={{ marginRight: 1 }} /> Iniciar sesión</Button>
                            <Button color="inherit" component={Link} to="/usuario/registrarse"><PersonAdd sx={{ marginRight: 1 }} /> Registrarse</Button>
                        </>
                    ) : null}
                    <Box sx={{ flexGrow: 0 }}>
                        {conectado ? (
                            <>
                                <Tooltip title="Abrir configuración">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: 2 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '3.2%' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {usuario && usuario.rol === "1" && conectado && (
                                        <MenuItem onClick={handleCloseUserMenu} component={Link} to="/misGerentes">
                                            <AssignmentInd sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis gerentes
                                        </MenuItem>
                                    )}
                                    {usuario && usuario.rol === "2" && conectado && (
                                        <MenuItem onClick={handleCloseUserMenu} component={Link} to="/misRestaurantes">
                                            <Restaurant sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis restaurantes
                                        </MenuItem>
                                    )}
                                    {usuario && usuario.rol === "2" && conectado && (
                                        <MenuItem onClick={handleCloseUserMenu} component={Link} to="/misEmpleados">
                                            <Group sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis empleados
                                        </MenuItem>
                                    )}
                                    {usuario && usuario.rol === "4" && conectado && (
                                        <MenuItem onClick={handleCloseUserMenu} component={Link} to="/verPedidos/hechos">
                                            <Fastfood sx={{ color: '#c2c2c2', marginRight: 1 }} /> Ver mis pedidos
                                        </MenuItem>
                                    )}
                                    <MenuItem onClick={handleLogout}>
                                        <Logout sx={{ color: '#c2c2c2', marginRight: 1 }} /> Cerrar sesión
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : null}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export { NavbarWeb }