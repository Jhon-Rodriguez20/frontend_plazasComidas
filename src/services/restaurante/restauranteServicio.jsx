import axios from "axios";
import { API_URL, RESTAURANTES_GET_ENDPOINT, RESTAURANTE_DETALLE_GET_ENDPOINT } from "../../connections/helpers/endpoints";

export const obtenerRestaurantes = async () => {

    try {
        const respuesta = await axios.get(RESTAURANTES_GET_ENDPOINT);
        const restaurantes = respuesta.data.restauranteEntity;

        await Promise.all(
            restaurantes.map(restaurante =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `${API_URL}${restaurante.imgRestaurante}`;
                    img.onload = resolve;
                    img.onerror = reject;
                })
            )
        )
        return restaurantes;

    } catch (error) {
        // console.error("Error: ", error);
        // throw error;
    }
}

export const leerDetalleRestaurante = async (restauranteEntity) => {

    try {
        const respuesta = await axios.get(`${RESTAURANTE_DETALLE_GET_ENDPOINT}/${restauranteEntity.idRestaurante}`);
        return respuesta.data.restauranteEntity;

    } catch (error) {
        // console.error("Error: ", error);
        // throw error;
    }
}