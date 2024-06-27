import axios from "axios";
import { API_URL, PEDIDOSRESTAURANTE_GET_ENDPOINT, PEDIDO_DETALLE_GET_ENDPOINT } from "../../connections/helpers/endpoints";

export const obtenerPedidosRestaurante = async (id) => {

    try {
        const respuesta = await axios.get(`${PEDIDOSRESTAURANTE_GET_ENDPOINT}/${id}`);
        return respuesta.data.pedidoEntity;

    } catch (error) {
        console.error("");
        throw error;
    }
}

export const verPedidoDetalle = async (idPedido) => {
    
    try {
        const respuesta = await axios.get(`${PEDIDO_DETALLE_GET_ENDPOINT}/${idPedido}`);
        const pedidoDetalle = respuesta.data.pedidoEntity;

        pedidoDetalle.detalles.forEach(detalle => {
            detalle.imgPlato = `${API_URL}${detalle.imgPlato}`;
        });

        return pedidoDetalle;
    } catch (error) {
        console.error("Error al cargar el detalle del pedido:", error);
        throw error;
    }
}