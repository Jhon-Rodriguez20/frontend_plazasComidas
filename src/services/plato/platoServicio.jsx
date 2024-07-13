import axios from "axios";
import { API_URL, PLATOS_RESTAURANTE_GET_ENDPOINT, PLATO_DETALLE_GET_ENDPOINT } from "../../connections/helpers/endpoints";

export const obtenerPlatosRestaurante = async (id, page, pageSize) => {

    try {
        const respuesta = await axios.get(`${PLATOS_RESTAURANTE_GET_ENDPOINT}/${id}`, {
            params: { page, pageSize }
        });
        const { platoEntity, total } = respuesta.data;

        await Promise.all(
            platoEntity.map(plato =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `${API_URL}${plato.imgPlato}`;
                    img.onload = resolve;
                    img.onerror = reject;
                })
            )
        );
        return { platos: platoEntity, total};

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
        console.error("Error: ", error);
        throw error;
    }
}