import axios from "axios";
import { API_URL, USUARIO_MISGERENTES_GET_ENDPOINT, USUARIO_MISEMPLEADOS_GET_ENDPOINT, USUARIO_MISRESTAURANTES_GET_ENDPOINT, USUARIO_MISPEDIDOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";

export const obtenerMisGerentes = async (page, pageSize) => {
    try {
        const respuesta = await axios.get(USUARIO_MISGERENTES_GET_ENDPOINT, {
            params: { page, pageSize }
        });
        const { usuarioEntity, total } = respuesta.data;

        await Promise.all(
            usuarioEntity.map(gerente =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `${API_URL}${gerente.imgPerfil}`;
                    img.onload = resolve;
                    img.onerror = reject;
                })
            )
        );
        return { usuarios: usuarioEntity, total };

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const obtenerMisEmpleados = async (page, pageSize) => {
    try {
        const respuesta = await axios.get(USUARIO_MISEMPLEADOS_GET_ENDPOINT, {
            params: { page, pageSize }
        });
        const { usuarioEntity, total } = respuesta.data;

        await Promise.all(
            usuarioEntity.map(empleado =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `${API_URL}${empleado.imgPerfil}`;
                    img.onload = resolve;
                    img.onerror = reject;
                })
            )
        );
        return { usuarios: usuarioEntity, total };

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const obtenerMisRestaurantes = async (page, pageSize) => {

    try {
        const respuesta = await axios.get(USUARIO_MISRESTAURANTES_GET_ENDPOINT, {
            params: { page, pageSize }
        });
        const { restauranteEntity, total } = respuesta.data;

        await Promise.all(
            restauranteEntity.map(restaurante =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `${API_URL}${restaurante.imgRestaurante}`;
                    img.onload = resolve;
                    img.onerror = reject;
                })
            )
        )
        return {restaurantes: restauranteEntity, total};

    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}

export const obtenerMisPedidos = async (page, pageSize) => {

    try {
        const respuesta = await axios.get(USUARIO_MISPEDIDOS_GET_ENDPOINT, {
            params: { page, pageSize }
        });
        const { pedidoEntity, total } = respuesta.data;
        return { pedidos: pedidoEntity, total };

    } catch (error) {
        console.error("");
        throw error;
    }
}