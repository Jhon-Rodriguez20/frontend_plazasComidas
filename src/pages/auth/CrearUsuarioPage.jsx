import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CrearUsuarioForm } from '../../components/auth/CrearUsuarioForm';
import { SIGNUP_POST_ENDPOINT } from '../../connections/helpers/endpoints';
import { Box, Container, Typography, Button } from '@mui/material';
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";
import useAlertas from "../../components/common/alertas/tipoAlertas";
import { FastfoodOutlined } from "@mui/icons-material";

function CrearUsuarioPage() {
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const navegar = useNavigate();
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();

    const registro = async ({ nombre, celular, email, ocupacion, descripcionTrabajo, password, idRol }) => {
        const error = {};
        setErrores(error);
        setCargando(true);

        try {
            await axios.post(SIGNUP_POST_ENDPOINT, {
                nombre, celular, email, ocupacion, descripcionTrabajo, password, idRol
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setCargando(false);
            navegar("/usuario/loguearse");
            mostrarAlertaExito("Usuario creado exitosamente.");

        } catch (err) {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al registrarse.";
            mostrarAlertaError(mensajeError);
        }
    }

    return (
        <Container 
            maxWidth="sm"
            sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                mb: 7.5
            }}
        >
            <BackDropProgreso abrir={cargando} />
            <Box 
                sx={{
                    width: '95%',
                    maxWidth: '100%',
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper'
                }}
            >
                <Box display="flex" justifyContent="center" mb={3}>
                    <FastfoodOutlined sx={{ color: '#FFA726', fontSize: 70 }} />
                </Box>
                <Typography variant="subtitle1" color="text.secondary" mb={3} align="center" gutterBottom>
                    ¡Descubre un festín de sabores que hará bailar tus papilas gustativas en cada bocado!
                </Typography>
                <CrearUsuarioForm errores={errores} callback={registro} defaultOcupacion="Cliente"
                    defaultDescTrabajo="Hacer pedidos" defaultIdRol="4" mostrarChips={false} editar={false} />
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" textAlign="center">
                        ¿Ya tienes una cuenta?
                        <Button 
                            size="small" 
                            className="estilo-botones-autenticacion"
                            sx={{padding: 1.2, ml: 1, fontWeight: 'bold', color: '#fff'}}
                            component={Link} 
                            to={'/usuario/loguearse'}
                        >
                            Iniciar sesión
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export { CrearUsuarioPage }