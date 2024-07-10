export const API_URL = "http://localhost:8080";

// ENDPOINTS DE USUARIO
export const SIGNIN_POST_ENDPOINT = API_URL + "/usuario/login";
export const SIGNUP_POST_ENDPOINT = API_URL + "/usuario/crearUsuario/externo";
export const CREARGERENTE_POST_ENDPOINT = API_URL + "/usuario/crearUsuario/gerente";
export const CREAREMPLEADO_POST_ENDPOINT = API_URL + "/usuario/crearUsuario/empleado";
export const EDITARDESCRIPCION_PUT_ENDPOINT = API_URL + "/usuario/descripcion";
export const USUARIO_INFORMACION_PERFIL_GET_ENDPOINT = API_URL + "/usuario/informacion/perfil";
export const USUARIO_MISGERENTES_GET_ENDPOINT = API_URL + "/usuario/gerentes";
export const USUARIO_MISEMPLEADOS_GET_ENDPOINT = API_URL + "/usuario/empleados";
export const USUARIO_MISRESTAURANTES_GET_ENDPOINT = API_URL + "/usuario/restaurantes/pertenecientes";
export const USUARIO_MISPEDIDOS_GET_ENDPOINT = API_URL + "/usuario/pedidos/hechos";


// ENDPOINTS DE RESTAURANTE
export const CREARRESTAURANTE_POST_ENDPOINT = API_URL + "/restaurante/crear";
export const RESTAURANTES_GET_ENDPOINT = API_URL + "/restaurantes";
export const RESTAURANTE_DETALLE_GET_ENDPOINT = API_URL + "/restaurante";

// ENDPOINTS DE PLATOS
export const CREARPLATO_RESTAURANTE_POST_ENDPOINT = API_URL + "/plato";
export const EDITARPLATO_RESTAURANTE_PUT_ENDPOINT = API_URL + "/plato";
export const ELIMINARPLATO_RESTAURANTE_DELETE_ENDPOINT = API_URL + "/plato";
export const PLATOS_RESTAURANTE_GET_ENDPOINT = API_URL + "/plato/restaurante";
export const PLATO_DETALLE_GET_ENDPOINT = API_URL + "/plato";

// ENDPOINTS DE PEDIDO
export const PEDIDOSRESTAURANTE_GET_ENDPOINT = API_URL + "/pedido/restaurante/mostrar";
export const PEDIDO_DETALLE_GET_ENDPOINT = API_URL + "/pedido";
export const CREARPEDIDO_POST_ENDPOINT = API_URL + "/pedido/realizar";
export const EDITARPEDIDO_ESTADO_PUT_ENDPOINT = API_URL + "/pedido";
export const ELIMINARPEDIDO_DELETE_ENDPOINT = API_URL + "/pedido";