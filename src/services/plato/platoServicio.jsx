import axios from "axios";
import { API_URL, PLATOS_RESTAURANTE_GET_ENDPOINT, PLATO_DETALLE_GET_ENDPOINT } from "../../connections/helpers/endpoints";

export const obtenerPlatosRestaurante = async (id) => {

    try {        
        const respuesta = await axios.get(`${PLATOS_RESTAURANTE_GET_ENDPOINT}/${id}`);
        const platos = respuesta.data.platoEntity;

        await Promise.all(
            platos.map(plato =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `${API_URL}${plato.imgPlato}`;
                    img.onload = resolve;
                    img.onerror = reject;
                })
            )
        );
        return platos;

    } catch (error) {
        console.error("");
        throw error;
    }
}

export const leerDetallePlato = async (plato) => {

    try {
        const respuesta = await axios.get(`${PLATO_DETALLE_GET_ENDPOINT}/${plato.idPlato}`)
        return respuesta.data.platoEntity;
        
    } catch (error) {
        // console.error("Error: ", error);
        // throw error;
    }
}