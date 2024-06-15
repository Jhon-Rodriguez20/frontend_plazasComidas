import { useState } from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Menu, MenuItem } from '@mui/material';
import { MenuOutlined, Home, Logout, Login, SupervisorAccount, People, AssignmentInd, Group, PersonAdd, Fastfood, Restaurant } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../connections/usuarioAcciones';

function NavbarCelular() {
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const conectado = useSelector((estado) => estado.conectado);
    const usuario = useSelector((estado) => estado.usuario);
    const dispatch = useDispatch();

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(cerrarSesion());
    };

    const getNavigationActions = () => {
        const actions = [];
        
        if (usuario.rol === "1" && conectado) {
            actions.push(<BottomNavigationAction key="crear-gerente" label="Crear gerente" icon={<SupervisorAccount />} />);
        }
        if (usuario.rol === "2" && conectado) {
            actions.push(<BottomNavigationAction key="crear-empleado" label="Crear empleado" icon={<People />} />);
        }
        if (usuario.rol === "3" && conectado) {
            actions.push(<BottomNavigationAction key="ver-pedidos" label="Ver pedidos" icon={<Fastfood />} />);
        }
        actions.push(<BottomNavigationAction component={Link} to="/" key="home" label="Home" icon={<Home />} />);
        
        if (!conectado) {
            actions.push(<BottomNavigationAction component={Link} to="/usuario/loguearse" key="iniciar-sesion" label="Iniciar sesión" icon={<Login />} />);
            actions.push(<BottomNavigationAction key="crear cuenta" label="Crear una cuenta" icon={<PersonAdd />} />);
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
                    <MenuItem component={Link} to="/" onClick={handleCloseMenu}>
                        <AssignmentInd sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis gerentes
                    </MenuItem>
                )}
                {usuario.rol === "2" && conectado && (
                    <>
                        <MenuItem component={Link} to="/" onClick={handleCloseMenu}><Restaurant sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis restaurantes</MenuItem>
                        <MenuItem component={Link} to="/" onClick={handleCloseMenu}><Group sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis empleados</MenuItem>
                    </>
                )}
                {usuario.rol === "4" && conectado && (
                    <MenuItem component={Link} to="/" onClick={handleCloseMenu}><Fastfood sx={{ color: '#c2c2c2', marginRight: 1 }} /> Mis pedidos</MenuItem>
                )}
                <MenuItem component={Link} to="/" onClick={handleLogout}>
                    <Logout sx={{ color: '#c2c2c2', marginRight: 1 }} /> Cerrar sesión
                </MenuItem>
            </Menu>
        </Box>
    );
}

export { NavbarCelular }