import './css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RestaurantePage } from "./pages/restaurante/RestaurantePage";
import { PlatoPage } from './pages/plato/PlatoPage';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RestaurantePage/>}/>
                <Route path='/platos/restaurante/:id' element={<PlatoPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App