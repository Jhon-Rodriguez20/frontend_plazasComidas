import { useState, useEffect } from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Menu, MenuItem } from '@mui/material';
import { MenuOutlined, Home, Logout, Login, SupervisorAccount, People, AssignmentInd, Group, PersonAdd, Fastfood, Restaurant } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../connections/usuarioAcciones';

function NavbarCelular() {
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);
    const [anchorEl, setAnchorEl] = useState(null);
    const conectado = useSelector((estado) => estado.conectado);
    const usuario = useSelector((estado) => estado.usuario);
    const dispatch = useDispatch();

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
        const actions = [];

        actions.push(
            <BottomNavigationAction 
                component={Link} 
                to="/" 
                key="home" 
                label="Home" 
                icon={<Home />} 
                value="/" 
            />
        );
        
        if (usuario.rol === "1" && conectado) {
            actions.push(
                <BottomNavigationAction 
                    key="crear-gerente" 
                    label="Crear gerente" 
                    icon={<SupervisorAccount />} 
                    component={Link} 
                    to="/crear/gerente" 
                    value="/crear/gerente"
                />
            );
        }
        if (usuario.rol === "2" && conectado) {
            actions.push(
                <BottomNavigationAction 
                    key="crear-empleado" 
                    label="CrearEmpleado"
                    icon={<People />} 
                    component={Link} 
                    to="/crear/empleado" 
                    value="/crear/empleado"
                />
            );
        }
        if (usuario.rol === "3" && conectado) {
            actions.push(
                <BottomNavigationAction 
                    key="ver-pedidos" 
                    label="Ver pedidos" 
                    icon={<Fastfood />} 
                    component={Link} 
                    to="/pedidos/restaurante" 
                    value="/pedidos/restaurante"
                />
            );
        }        
        
        if (!conectado) {
            actions.push(
                <BottomNavigationAction 
                    component={Link} 
                    to="/usuario/loguearse" 
                    key="iniciar-sesion" 
                    label="Iniciar sesión" 
                    icon={<Login />} 
                    value="/usuario/loguearse"
                />
            );
            actions.push(
                <BottomNavigationAction 
                    component={Link} 
                    to="/usuario/registrarse" 
                    key="crear-cuenta" 
                    label="Registrarse" 
                    icon={<PersonAdd />} 
                    value="/usuario/registrarse"
                />
            );
        }
        if (conectado) {
            actions.push(
                <BottomNavigationAction
                    key="menu" 
                    label="Menú" 
                    icon={<MenuOutlined />} 
                    onClick={handleOpenMenu}
                />
            );
        }

        return actions;
    };

    return (
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
                {usuario.rol === "1" && conectado && (
                    <MenuItem component={Link} to="/misGerentes" onClick={handleCloseMenu}>
                        <AssignmentInd sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis gerentes
                    </MenuItem>
                )}
                {usuario.rol === "2" && conectado && (
                    <MenuItem component={Link} to="/misRestaurantes" onClick={handleCloseMenu}>
                        <Restaurant sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis restaurantes
                    </MenuItem>
                )}
                {usuario.rol === "2" && conectado && (
                    <MenuItem component={Link} to="/misEmpleados" onClick={handleCloseMenu}>
                        <Group sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis empleados
                    </MenuItem>
                )}
                {usuario.rol === "4" && conectado && (
                    <MenuItem component={Link} to="/verPedidos/hechos" onClick={handleCloseMenu}>
                        <Fastfood sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis pedidos
                    </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                    <Logout sx={{ color: '#c2c2c2', marginRight: 1 }} /> Cerrar sesión
                </MenuItem>
            </Menu>
        </Box>
    );
}

export { NavbarCelular }