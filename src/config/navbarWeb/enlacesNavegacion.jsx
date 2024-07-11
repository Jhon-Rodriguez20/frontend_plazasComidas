import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { SupervisorAccount, People, Fastfood, Login, PersonAdd } from '@mui/icons-material';
import { ValidarUsuarioConectado } from '../../middleware/ValidarUsuarioConectado';
import { ValidarUsuarioRol } from '../../middleware/ValidarUsuarioRol';

const enlacesConectado = [
    { rol: "1", to: "/crear/gerente", icon: <SupervisorAccount sx={{ marginRight: 1 }} />, label: "Crear gerente" },
    { rol: "2", to: "/crear/empleado", icon: <People sx={{ marginRight: 1 }} />, label: "Crear empleado" },
    { rol: "3", to: "/pedidos/restaurante", icon: <Fastfood sx={{ marginRight: 1 }} />, label: "Ver pedidos" }
];

const enlacesDesconectado = [
    { to: "/usuario/loguearse", icon: <Login sx={{ marginRight: 1 }} />, label: "Iniciar sesión" },
    { to: "/usuario/registrarse", icon: <PersonAdd sx={{ marginRight: 1 }} />, label: "Registrarse" }
];

const generarEnlaces = (enlaces, conectado) => (
    <ValidarUsuarioConectado conectado={conectado}>
        {enlaces.map((enlace, index) => (
            enlace.rol ? (
                <ValidarUsuarioRol key={index} rolesPermitidos={[enlace.rol]}>
                    <Button color="inherit" component={Link} to={enlace.to}>
                        {enlace.icon} {enlace.label}
                    </Button>
                </ValidarUsuarioRol>
            ) : (
                <Button key={index} color="inherit" component={Link} to={enlace.to}>
                    {enlace.icon} {enlace.label}
                </Button>
            )
        ))}
    </ValidarUsuarioConectado>
);

const MenuBotonesConectado = () => generarEnlaces(enlacesConectado, true);
const MenuBotonesDesconectado = () => generarEnlaces(enlacesDesconectado, false);

export { MenuBotonesConectado, MenuBotonesDesconectado }