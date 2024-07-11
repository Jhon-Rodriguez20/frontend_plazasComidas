import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Tooltip, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../../../connections/usuarioAcciones';
import logo from "../../../assets/img/PlazaDelicias.webp";
import { MenuBotonesConectado, MenuBotonesDesconectado } from '../../../config/navbarWeb/enlacesNavegacion';
import menuEnlaces from '../../../config/navbarCelular/menuEnlaces';
import AvatarUsuario from '../../../config/navbarWeb/avatarUsuario';
import { ValidarUsuarioConectado } from '../../../middleware/ValidarUsuarioConectado';

function NavbarWeb() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const dispatch = useDispatch();
    const usuario = useSelector((estado) => estado.usuario.usuario);

    const handleAbrirMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCerrarMenu = () => {
        setAnchorElUser(null);
    };

    const handleCerrarSesion = () => {
        setAnchorElUser(null);
        dispatch(cerrarSesion());
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ bgcolor: '#FFF', color: '#FFA726', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }} component={Link} to="/">
                    <Typography
                        component="img"
                        src={logo}
                        sx={{ mt: 1, mb: 1, width: { xs: '80%', sm: 'auto' }, maxWidth: 200 }}
                        alt="Logo"
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>

                    {/* BOTONES DE ENLACES DEL NAVBAR */}
                    <MenuBotonesConectado />
                    <MenuBotonesDesconectado />

                    <ValidarUsuarioConectado conectado={true}>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Abrir configuración">
                                <IconButton onClick={handleAbrirMenu} sx={{ p: 0, marginLeft: 2 }}>
                                    <AvatarUsuario bgcolor="#FFA726" color="#FFF" />
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
                                onClose={handleCerrarMenu}
                            >
                                {menuEnlaces(usuario, true, handleCerrarMenu, handleCerrarSesion)
                                    .filter(enlace => enlace.condition)
                                    .map((enlace, index) => (
                                        <MenuItem key={index} onClick={enlace.onClick || handleCerrarMenu} component={Link} to={enlace.to}>
                                            {enlace.icon}
                                            {enlace.label}
                                        </MenuItem>
                                    ))}
                            </Menu>
                        </Box>
                    </ValidarUsuarioConectado>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export { NavbarWeb };
