import { createSlice } from '@reduxjs/toolkit';

const guardarPedidoEnLocalStorage = (state) => {
    const serializarEstado = JSON.stringify(state);
    localStorage.setItem('pedido', serializarEstado);
}

const cargarDesdeLocalStorage = () => {
    const serializarEstado = localStorage.getItem('pedido');
    if (serializarEstado === null) return { platos: [], idRestaurante: null };
    return JSON.parse(serializarEstado);
}

const initialState = cargarDesdeLocalStorage();

const pedidoSlice = createSlice({
    name: 'pedido',
    initialState,
    reducers: {
        agregarPlato: (state, action) => {
            const platoExistente = state.platos.find(plato => plato.idPlato === action.payload.idPlato);
            if (!platoExistente) {
                state.platos.push({ ...action.payload, cantidad: 1 });
            } else {
                platoExistente.cantidad += 1;
            }
            guardarPedidoEnLocalStorage(state);
        },
        eliminarPlato: (state, action) => {
            state.platos = state.platos.filter(plato => plato.idPlato !== action.payload);
            guardarPedidoEnLocalStorage(state);
        },
        actualizarCantidad: (state, action) => {
            const { idPlato, cantidad } = action.payload;
            const plato = state.platos.find(plato => plato.idPlato === idPlato);
            if (plato) {
                plato.cantidad = cantidad;
            }
            guardarPedidoEnLocalStorage(state);
        },
        vaciarPedido: (state) => {
            state.platos = [];
            state.idRestaurante = null;
            guardarPedidoEnLocalStorage(state);
        },
        establecerIdRestaurante: (state, action) => {
            state.idRestaurante = action.payload;
            guardarPedidoEnLocalStorage(state);
        }
    }
})

export const { agregarPlato, eliminarPlato, actualizarCantidad, vaciarPedido, establecerIdRestaurante } = pedidoSlice.actions;
export default pedidoSlice.reducer;