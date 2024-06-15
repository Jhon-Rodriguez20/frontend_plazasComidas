export const API_URL = "http://localhost:8080";

// ENDPOINTS DE RESTAURANTE
export const RESTAURANTES_GET_ENDPOINT = API_URL + "/restaurantes";
export const RESTAURANTE_DETALLE_GET_ENDPOINT = API_URL + "/restaurante";

// ENDPOINTS DE PLATOS
export const PLATOS_RESTAURANTE_GET_ENDPOINT = API_URL + "/plato/restaurante";
export const PLATO_DETALLE_GET_ENDPOINT = API_URL + "/plato";

// ENDPOINTS DE USUARIO
export const SIGNIN_POST_ENDPOINT = API_URL + "/usuario/login";
export const SIGNUP_POST_ENDPOINT = API_URL + "/usuario/crearUsuario";