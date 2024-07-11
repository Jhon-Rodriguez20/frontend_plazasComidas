import { AssignmentInd, Group, Fastfood, Restaurant, Settings, Logout } from '@mui/icons-material';

const estilosIcono = {
    color: '#c2c2c2',
    mr: 1
}
const menuEnlaces = (usuario, conectado, handleCerrarMenu, handleCerrarSesion) => [
    { to: "/misGerentes", label: "Mis gerentes", icon: <AssignmentInd sx={estilosIcono} />, condition: usuario?.rol === "1" && conectado },
    { to: "/misRestaurantes", label: "Mis restaurantes", icon: <Restaurant sx={estilosIcono} />, condition: usuario?.rol === "2" && conectado },
    { to: "/misEmpleados", label: "Mis empleados", icon: <Group sx={estilosIcono} />, condition: usuario?.rol === "2" && conectado },
    { to: "/verPedidos/hechos", label: "Mis pedidos", icon: <Fastfood sx={estilosIcono} />, condition: usuario?.rol === "4" && conectado },
    { to: `/perfil/${usuario?.sub}`, label: "Configuración", icon: <Settings sx={estilosIcono} />, condition: conectado },
    { label: "Cerrar sesión", icon: <Logout sx={estilosIcono} />, onClick: handleCerrarSesion, condition: conectado },
]

export default menuEnlaces;