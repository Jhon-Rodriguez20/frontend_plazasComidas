import axios from 'axios';
import { SIGNIN_POST_ENDPOINT } from './helpers/endpoints';
import { setAutenticacionToken } from './helpers/token';
import { jwtDecode } from 'jwt-decode';
import { usuario } from '../states/sliceReducers';

export const autenticacion = (datos) => dispatch=> {

    return new Promise((resolver, rechazar) => {

        axios.post(SIGNIN_POST_ENDPOINT, datos,
            {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(respuesta=> {

            const {authorization} = respuesta.headers;

            localStorage.setItem('token', authorization);

            setAutenticacionToken(authorization);

            const tokenDecodificado = jwtDecode(authorization);

            dispatch(usuario({ conectado: true, usuario:tokenDecodificado }))

            resolver(respuesta);

        }).catch(err => {
            rechazar("Error al autenticarse: ", err)
        })
    })
}

export const cerrarSesion = () => dispatch => {

    localStorage.removeItem('token');

    setAutenticacionToken(false);

    dispatch(usuario({ usuario:{}, conectado: false }));
}