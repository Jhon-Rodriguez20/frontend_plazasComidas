import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    conectado: false,
    usuario: {},
    mostrarProgreso: false,
};

const sliceReducers = createSlice({
    name: 'frontend_plazasComidas',
    initialState,
    reducers: {
        usuario: (estado, accion) => {
            estado.conectado = accion.payload.conectado;
            estado.usuario = accion.payload.usuario;
        }
    },
});

export const { usuario } = sliceReducers.actions;
export default sliceReducers.reducer;