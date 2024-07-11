import { useState, useEffect } from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Menu, MenuItem, AppBar, Toolbar, Typography } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../../../connections/usuarioAcciones';
import logo from "../../../assets/img/PlazaDelicias.webp";
import enlacesNavbar from '../../../config/navbarCelular/enlacesNavegacion';
import menuEnlaces from '../../../config/navbarCelular/menuEnlaces';

function NavbarCelular() {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);
    const [anchorEl, setAnchorEl] = useState(null);
    const conectado = useSelector((estado) => estado.usuario.conectado);
    const usuario = useSelector((estado) => estado.usuario.usuario);
    const dispatch = useDispatch();
    const [esScrolling, setIsScrolling] = useState(false);
    const [esFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const appBarHeight = document.getElementById('appBar').offsetHeight;
            
            setIsFixed(scrollTop > appBarHeight);
            setIsScrolling(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    const handleAbrirMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCerrarMenu = () => {
        setAnchorEl(null);
    }

    const handleCerrarSesion = () => {
        setAnchorEl(null);
        dispatch(cerrarSesion());
    }

    return (
        <>
            <AppBar
                id="appBar"
                position={esFixed ? 'fixed' : 'static'}
                sx={{
                    bgcolor: '#FFF',
                    transition: 'top 0.6s ease',
                    top: esFixed ? (esScrolling ? 0 : -50) : 0,
                    boxShadow: esFixed ? 3 : 1,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5
                }}
            >
                <Toolbar
                    sx={{
                        bgcolor: '#FFF',
                        color: '#FFA726',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', sm: 'row' }                    
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: { xs: '100%', sm: 'auto' },
                            justifyContent: { xs: 'center', sm: 'flex-start' }
                        }}
                        component={NavLink}
                        to="/"
                    >
                        <Typography
                            component="img"
                            src={logo}
                            sx={{ mt: 1, mb: 1, width: { xs: '80%', sm: 'auto' }, maxWidth: 200 }}
                            alt="Logo"
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, zIndex: 1000, overflowX: 'auto' }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{ width: 'max-content', minWidth: '100%' }}
                >
                    {enlacesNavbar(usuario, conectado, value, handleAbrirMenu).map(
                        ({ to, label, icon, condition, onClick, sx }) =>
                            condition && (
                                <BottomNavigationAction
                                    key={label}
                                    component={to ? Link : 'div'}
                                    to={to}
                                    label={label}
                                    icon={icon}
                                    value={to}
                                    onClick={onClick ? onClick : undefined}
                                    sx={sx || {
                                        color: value === to ? '#FFA726' : '#898989',
                                        '&.Mui-selected': {
                                            color: '#FFA726',
                                        }
                                    }}
                                />
                            )
                    )}
                </BottomNavigation>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCerrarMenu}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    {menuEnlaces(usuario, conectado, handleCerrarMenu, handleCerrarSesion).map(
                        ({ to, label, icon, onClick, condition }) =>
                            condition && (
                                <MenuItem
                                    key={label}
                                    component={to ? Link : 'div'}
                                    to={to}
                                    onClick={onClick || handleCerrarMenu}
                                >
                                    {icon} {label}
                                </MenuItem>
                            )
                    )}
                </Menu>
            </Box>
        </>
    );
}

export { NavbarCelular }