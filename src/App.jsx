import './css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RestaurantePage } from "./pages/restaurante/RestaurantePage";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RestaurantePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App