import './css/App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'moment/locale/es';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RestaurantePage } from "./pages/restaurante/RestaurantePage";
import { PlatoPage } from './pages/plato/PlatoPage';
import { getAutenticacionToken } from './connections/helpers/token';
import { NavbarResponsivo } from './layouts/navbar/NavbarResponsivo';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { RutaPrivadaConRol } from "./routes/RutaPrivada";
import { IniciarSesion } from './pages/auth/IniciarSesionPage';
import { CrearUsuarioPage } from './pages/auth/CrearUsuarioPage';
import { MisGerentesPage } from './pages/usuario/MisGerentesPage';
import { MisEmpleadosPage } from './pages/usuario/MisEmpleadosPage';
import { CrearRestaurantePage } from './pages/restaurante/CrearRestaurantePage';
import { CrearPlatoPage } from './pages/plato/CrearPlatoPage';
import { MisRestaurantesPage } from './pages/usuario/MisRestaurantesPage';
import { VerPlatosPage } from './pages/plato/VerPlatosPage';
import { EditarPlatoPage } from './pages/plato/EditarPlatoPage';
import { ToastContainer } from 'react-toastify';
import { CrearGerentePage } from './pages/usuario/CrearGerentePage';
import { CrearEmpleadoPage } from './pages/usuario/CrearEmpleadoPage';
import { PedidosRestaurantePage } from './pages/pedido/PedidosRestaurantePage';
import { VerPedidosRestaurantePage } from './pages/pedido/VerPedidosRestaurante';
import { PedidoDetallePage } from './pages/pedido/PedidoDetallePage';
import { MisPedidosPage } from './pages/usuario/MisPedidosPage';
import { EditarPedidoEstadoPage } from './pages/pedido/EditarPedidoEstadoPage';
import { CrearPedido } from './components/pedido/CrearPedido';
import { store } from './states/store';
import { EditarInformacionPerfilPage } from './pages/usuario/EditarInformacionPerfilPage';

getAutenticacionToken();

function App() {
    const theme = createTheme();

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <NavbarResponsivo />
                    <Routes>
                        <Route path='/' element={<RestaurantePage />} />
                        <Route path='/platos/restaurante/:id' element={<PlatoPage />} />
                        <Route path='/usuario/loguearse' element={<IniciarSesion />} />
                        <Route path='/usuario/registrarse' element={<CrearUsuarioPage />} />

                        <Route element={<RutaPrivadaConRol rolesPermitidos={["1"]} />}>
                            <Route path='/crear/gerente' element={<CrearGerentePage />} />
                            <Route path='/misGerentes' element={<MisGerentesPage />} />
                            <Route path='/crear/restaurante/:id' element={<CrearRestaurantePage />} />
                        </Route>
                        <Route element={<RutaPrivadaConRol rolesPermitidos={["2"]} />}>
                            <Route path='/misEmpleados' element={<MisEmpleadosPage />} />
                            <Route path='/crear/plato/:id' element={<CrearPlatoPage />} />
                            <Route path='/misRestaurantes' element={<MisRestaurantesPage />} />
                            <Route path='/verPlatos/:id' element={<VerPlatosPage />} />
                            <Route path='/editar/plato/:id' element={<EditarPlatoPage />} />
                            <Route path='/crear/empleado' element={<CrearEmpleadoPage />} />
                        </Route>
                        <Route element={<RutaPrivadaConRol rolesPermitidos={["3"]} />}>
                            <Route path='/pedido/editar-estado/:idPedido' element={<EditarPedidoEstadoPage />} />
                            <Route path='/pedidos/restaurante' element={<PedidosRestaurantePage />} />
                            <Route path='/verPedidos/restaurante/:id' element={<VerPedidosRestaurantePage />} />
                        </Route>
                        <Route element={<RutaPrivadaConRol rolesPermitidos={["3", "4"]} />}>
                            <Route path='/pedido/informacion/:id' element={<PedidoDetallePage />} />
                        </Route>
                        <Route element={<RutaPrivadaConRol rolesPermitidos={["4"]} />}>
                            <Route path='/verPedidos/hechos/' element={<MisPedidosPage />} />
                        </Route>
                        <Route element={<RutaPrivadaConRol rolesPermitidos={["1", "2", "3", "4"]} />}>
                            <Route path='/perfil/:id' element={<EditarInformacionPerfilPage />} />
                        </Route>
                    </Routes>
                    <ToastContainer/>
                    <CrearPedido/>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;