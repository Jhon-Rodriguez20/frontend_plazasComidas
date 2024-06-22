import axios from "axios";
import { API_URL, USUARIO_MISGERENTES_GET_ENDPOINT, USUARIO_MISEMPLEADOS_GET_ENDPOINT, USUARIO_MISRESTAURANTES_GET_ENDPOINT } from "../../connections/helpers/endpoints";

export const obtenerMisGerentes = async ()=> {

    try {
        const respuesta = await axios.get(USUARIO_MISGERENTES_GET_ENDPOINT);
        const usuariosGerentes = respuesta.data.usuarioEntity;

        await Promise.all(
            usuariosGerentes.map(gerente =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `${API_URL}${gerente.imgPerfil}`;
                    img.onload = resolve;
                    img.onerror = reject;
                })
            )
        )
        return usuariosGerentes;

    } catch (error) {
        // console.error("Error: ", error);
        // throw error;
    }
}

export const obtenerMisEmpleados = async ()=> {

    try {
        const respuesta = await axios.get(USUARIO_MISEMPLEADOS_GET_ENDPOINT);
        const usuariosEmpleados = respuesta.data.usuarioEntity;

        await Promise.all(
            usuariosEmpleados.map(empleado =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `${API_URL}${empleado.imgPerfil}`;
                    img.onload = resolve;
                    img.onerror = reject;
                })
            )
        )
        return usuariosEmpleados;

    } catch (error) {
        // console.error("Error: ", error);
        // throw error;
    }
}

export const obtenerMisRestaurantes = async ()=> {

    try {
        const respuesta = await axios.get(USUARIO_MISRESTAURANTES_GET_ENDPOINT);
        const misRestaurantes = respuesta.data.restauranteEntity;

        await Promise.all(
            misRestaurantes.map(restaurante =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `${API_URL}${restaurante.imgRestaurante}`;
                    img.onload = resolve;
                    img.onerror = reject;
                })
            )
        )
        return misRestaurantes;

    } catch (error) {
        // console.error("Error: ", error);
        // throw error;
    }
}