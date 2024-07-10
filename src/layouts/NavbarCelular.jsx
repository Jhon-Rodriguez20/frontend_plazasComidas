import { useState, useEffect } from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Menu, MenuItem, AppBar, Toolbar, Typography } from '@mui/material';
import { MenuOutlined, Home, Logout, Login, SupervisorAccount, People, AssignmentInd, Group, PersonAdd, Fastfood, Restaurant, Settings } from '@mui/icons-material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../connections/usuarioAcciones';
import logo from "../assets/img/PlazaDelicias.webp";

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
            
            if (scrollTop > appBarHeight && !esFixed) {
                setIsFixed(true);
            } else if (scrollTop <= appBarHeight && esFixed) {
                setIsFixed(false);
            }

            if (scrollTop > 0) {
                setIsScrolling(true);
            } else {
                setIsScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [esFixed]);

    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(cerrarSesion());
    }

    const getNavigationActions = () => {
        const acciones = [];

        acciones.push(
            <BottomNavigationAction 
                component={Link} 
                to="/" 
                key="home" 
                label="Home" 
                icon={<Home />} 
                value="/" 
                sx={{
                    color: value === "/" ? '#FFA726' : '#898989',
                    '&.Mui-selected': {
                        color: '#FFA726',
                    }
                }}
            />
        );
        
        if (usuario && usuario.rol === "1" && conectado) {
            acciones.push(
                <BottomNavigationAction 
                    key="crear-gerente" 
                    label="Crear gerente" 
                    icon={<SupervisorAccount />} 
                    component={Link} 
                    to="/crear/gerente" 
                    value="/crear/gerente"
                    sx={{
                        color: value === "/crear/gerente" ? '#FFA726' : '#898989',
                        '&.Mui-selected': {
                            color: '#FFA726',
                        }
                    }}
                />
            );
        }
        if (usuario && usuario.rol === "2" && conectado) {
            acciones.push(
                <BottomNavigationAction 
                    key="crear-empleado" 
                    label="CrearEmpleado"
                    icon={<People />} 
                    component={Link} 
                    to="/crear/empleado" 
                    value="/crear/empleado"
                    sx={{
                        color: value === "/crear/empleado" ? '#FFA726' : '#898989',
                        '&.Mui-selected': {
                            color: '#FFA726',
                        }
                    }}
                />
            );
        }
        if (usuario && usuario.rol === "3" && conectado) {
            acciones.push(
                <BottomNavigationAction 
                    key="ver-pedidos" 
                    label="Ver pedidos" 
                    icon={<Fastfood />} 
                    component={Link} 
                    to="/pedidos/restaurante" 
                    value="/pedidos/restaurante"
                    sx={{
                        color: value === "/pedidos/restaurante" ? '#FFA726' : '#898989',
                        '&.Mui-selected': {
                            color: '#FFA726',
                        }
                    }}
                />
            );
        }        
        
        if (!conectado) {
            acciones.push(
                <BottomNavigationAction 
                    component={Link} 
                    to="/usuario/loguearse" 
                    key="iniciar-sesion" 
                    label="Iniciar sesión" 
                    icon={<Login />} 
                    value="/usuario/loguearse"
                    sx={{
                        color: value === "/usuario/loguearse" ? '#FFA726' : '#898989',
                        '&.Mui-selected': {
                            color: '#FFA726',
                        }
                    }}
                />
            );
            acciones.push(
                <BottomNavigationAction 
                    component={Link} 
                    to="/usuario/registrarse" 
                    key="crear-cuenta" 
                    label="Registrarse" 
                    icon={<PersonAdd />} 
                    value="/usuario/registrarse"
                    sx={{
                        color: value === "/usuario/registrarse" ? '#FFA726' : '#898989',
                        '&.Mui-selected': {
                            color: '#FFA726',
                        }
                    }}
                />
            );
        }
        if (conectado) {
            acciones.push(
                <BottomNavigationAction
                    key="menu" 
                    label="Menú" 
                    icon={<MenuOutlined />}
                    onClick={handleOpenMenu}
                    sx={{
                        color: '#898989',
                        '&.Mui-selected': {
                            color: '#FFA726',
                        }
                    }}
                />
            );
        }

        return acciones;
    };

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
                {getNavigationActions()}
            </BottomNavigation>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                {usuario && usuario.rol === "1" && conectado && (
                    <MenuItem component={Link} to="/misGerentes" onClick={handleCloseMenu}>
                        <AssignmentInd sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis gerentes
                    </MenuItem>
                )}
                {usuario && usuario.rol === "2" && conectado && (
                    <MenuItem component={Link} to="/misRestaurantes" onClick={handleCloseMenu}>
                        <Restaurant sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis restaurantes
                    </MenuItem>
                )}
                {usuario && usuario.rol === "2" && conectado && (
                    <MenuItem component={Link} to="/misEmpleados" onClick={handleCloseMenu}>
                        <Group sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis empleados
                    </MenuItem>
                )}
                {usuario && usuario.rol === "4" && conectado && (
                    <MenuItem component={Link} to="/verPedidos/hechos" onClick={handleCloseMenu}>
                        <Fastfood sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis pedidos
                    </MenuItem>
                )}
                <MenuItem component={Link} to={`/perfil/${usuario.sub}`} onClick={handleCloseMenu}>
                    <Settings sx={{ color: '#c2c2c2', marginRight: 1 }} /> Configuración
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Logout sx={{ color: '#c2c2c2', marginRight: 1 }} /> Cerrar sesión
                </MenuItem>
            </Menu>
        </Box>
        </>
    );
}

export { NavbarCelular }