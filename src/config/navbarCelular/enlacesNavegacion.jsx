import { Home, Login, SupervisorAccount, People, Fastfood, PersonAdd, MenuOutlined } from '@mui/icons-material';

const enlacesNavbar = (usuario, conectado, value, handleAbrirMenu) => [
    {to: "/", label: "Home", icon: <Home />, condition: true,
        sx: {
            color: value === "/" ? '#FFA726' : '#898989',
            '&.Mui-selected': {
                color: '#FFA726',
            }
        }
    },

    {to: "/crear/gerente", label: "Crear gerente", icon: <SupervisorAccount />, condition: usuario?.rol === "1" && conectado,
        sx: {
            color: value === "/crear/gerente" ? '#FFA726' : '#898989',
            '&.Mui-selected': {
                color: '#FFA726',
            }
        }
    },

    {to: "/crear/empleado", label: "CrearEmpleado", icon: <People />, condition: usuario?.rol === "2" && conectado,
        sx: {
            color: value === "/crear/empleado" ? '#FFA726' : '#898989',
            '&.Mui-selected': {
                color: '#FFA726',
            }
        }
    },

    {to: "/pedidos/restaurante", label: "Ver pedidos", icon: <Fastfood />, condition: usuario?.rol === "3" && conectado,
        sx: {
            color: value === "/pedidos/restaurante" ? '#FFA726' : '#898989',
            '&.Mui-selected': {
                color: '#FFA726',
            }
        }
    },

    {to: "/usuario/loguearse", label: "Iniciar sesión", icon: <Login />, condition: !conectado,
        sx: {
            color: value === "/usuario/loguearse" ? '#FFA726' : '#898989',
            '&.Mui-selected': {
                color: '#FFA726',
            }
        }
    },

    {to: "/usuario/registrarse", label: "Registrarse", icon: <PersonAdd />, condition: !conectado,
        sx: {
            color: value === "/usuario/registrarse" ? '#FFA726' : '#898989',
            '&.Mui-selected': {
                color: '#FFA726',
            }
        }
    },

    {label: "Menú", icon: <MenuOutlined />, condition: conectado, onClick: handleAbrirMenu,
        sx: {
            color: '#898989',
            '&.Mui-selected': {
                color: '#FFA726',
            }
        }
    },
];

export default enlacesNavbar;
