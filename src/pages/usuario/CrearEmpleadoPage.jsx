import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CrearUsuarioForm } from '../../components/auth/CrearUsuarioForm';
import { CREAREMPLEADO_POST_ENDPOINT } from '../../connections/helpers/endpoints';
import { Box, Container, Typography } from '@mui/material';
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";
import MenuBookIconWithGradient from "../../assets/MenuBookSvg";
import useAlertas from "../../components/common/alertas/tipoAlertas";

function CrearEmpleadoPage() {
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const navegar = useNavigate();
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();

    const registro = async ({ nombre, celular, email, ocupacion, descripcionTrabajo, password, idRol }) => {
        const error = {};
        setErrores(error);
        setCargando(true);

        try {
            await axios.post(CREAREMPLEADO_POST_ENDPOINT, {
                nombre, celular, email, ocupacion, descripcionTrabajo, password, idRol
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setCargando(false);
            navegar("/misEmpleados");
            mostrarAlertaExito("Empleado creado exitosamente.");

        } catch (err) {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al crear el empleado.";
            mostrarAlertaError(mensajeError);
        }
    }

    return (
        <Container 
            maxWidth="md" 
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
                    width: '90%',
                    maxWidth: '95%',
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper'
                }}
            >
                <Box display="flex" justifyContent="center" mb={3}>
                    <MenuBookIconWithGradient width={100} height={100} />
                </Box>                
                <Typography variant="subtitle1" color="text.secondary" mb={3} align="center" gutterBottom>
                    ¡Crea un empleado capaz de realizar su labor correspondiente!
                </Typography>
                <CrearUsuarioForm errores={errores} callback={registro} defaultIdRol="3" mostrarChips={true} editar={false} />
            </Box>
        </Container>
    )
}

export { CrearEmpleadoPage }