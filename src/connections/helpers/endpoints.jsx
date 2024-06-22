export const API_URL = "http://localhost:8080";

// ENDPOINTS DE RESTAURANTE
export const CREARRESTAURANTE_POST_ENDPOINT = API_URL + "/restaurante/crear";
export const RESTAURANTES_GET_ENDPOINT = API_URL + "/restaurantes";
export const RESTAURANTE_DETALLE_GET_ENDPOINT = API_URL + "/restaurante";

// ENDPOINTS DE PLATOS
export const CREARPLATO_RESTAURANTE_POST_ENDPOINT = API_URL + "/plato";
export const EDITARPLATO_RESTAURANTE_PUT_ENDPOINT = API_URL + "/plato";
export const PLATOS_RESTAURANTE_GET_ENDPOINT = API_URL + "/plato/restaurante";
export const PLATO_DETALLE_GET_ENDPOINT = API_URL + "/plato";

// ENDPOINTS DE USUARIO
export const SIGNIN_POST_ENDPOINT = API_URL + "/usuario/login";
export const SIGNUP_POST_ENDPOINT = API_URL + "/usuario/crearUsuario/externo";
export const USUARIO_MISGERENTES_GET_ENDPOINT = API_URL + "/usuario/gerentes";
export const USUARIO_MISEMPLEADOS_GET_ENDPOINT = API_URL + "/usuario/empleados";
export const USUARIO_MISRESTAURANTES_GET_ENDPOINT = API_URL + "/usuario/restaurantes/pertenecientes";