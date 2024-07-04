import { configureStore } from '@reduxjs/toolkit';
import usuarioReducer from './sliceReducers';
import pedidoReducer from '../store/pedidoStore';

const store = configureStore({
    reducer: {
        usuario: usuarioReducer,
        pedido: pedidoReducer
    }
});

export { store }