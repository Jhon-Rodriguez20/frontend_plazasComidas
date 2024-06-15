import './css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RestaurantePage } from "./pages/restaurante/RestaurantePage";
import { PlatoPage } from './pages/plato/PlatoPage';
import { NavbarWeb } from './layouts/NavbarWeb';
import { store } from './states/store';
import { getAutenticacionToken } from './connections/helpers/token';
import { NavbarCelular } from './layouts/NavbarCelular';
import { useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { IniciarSesion } from './pages/auth/IniciarSesionPage';

getAutenticacionToken();

function App() {
    const theme = createTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    {isSmallScreen ? <NavbarCelular /> : <NavbarWeb />}
                    <Routes>
                        <Route path='/' element={<RestaurantePage />} />
                        <Route path='/platos/restaurante/:id' element={<PlatoPage />} />
                        <Route path='/usuario/loguearse' element={<IniciarSesion />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;