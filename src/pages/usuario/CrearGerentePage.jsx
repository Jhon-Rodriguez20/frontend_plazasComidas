import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CrearUsuarioForm } from '../../components/auth/CrearUsuarioForm';
import { CREARGERENTE_POST_ENDPOINT } from '../../connections/helpers/endpoints';
import { Box, Container, Typography } from '@mui/material';
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";
import useAlertas from "../../components/common/alertas/tipoAlertas";
import { FastfoodOutlined } from "@mui/icons-material";

function CrearGerentePage() {
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const navegar = useNavigate();
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();

    const registro = async ({ nombre, celular, email, ocupacion, descripcionTrabajo, password, idRol }) => {
        const error = {};
        setErrores(error);
        setCargando(true);

        try {
            await axios.post(CREARGERENTE_POST_ENDPOINT, {
                nombre, celular, email, ocupacion, descripcionTrabajo, password, idRol
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setCargando(false);
            navegar("/misGerentes");
            mostrarAlertaExito("Gerente creado exitosamente.");

        } catch (err) {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al crear el gerente.";
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
                mb: 8
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
                    ¡Crea un gerente para adminstrar bien tu restaurante!
                </Typography>
                <CrearUsuarioForm errores={errores} callback={registro} defaultOcupacion="Gerente"
                defaultDescTrabajo="Administrar restaurante asignado" defaultIdRol="2" mostrarChips={false} editar={false} />
            </Box>
        </Container>
    )
}

export { CrearGerentePage }