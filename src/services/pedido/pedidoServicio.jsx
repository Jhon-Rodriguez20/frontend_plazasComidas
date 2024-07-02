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

export const obtenerTotalPedidosRestaurante = async (id) => {
    try {
        const respuesta = await axios.get(`${PEDIDOSRESTAURANTE_GET_ENDPOINT}/${id}`);
        const pedidos = respuesta.data.pedidoEntity || [];
        const pedidosNuevos = pedidos.filter(pedido => pedido.idEstado === "1").length;
        return pedidosNuevos;
    } catch (error) {
        console.error("Error al cargar el número de pedidos del restaurante:", error);
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