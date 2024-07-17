import { useEffect, useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IniciarSesionForm } from "../../components/auth/IniciarSesionForm";
import { autenticacion } from "../../connections/usuarioAcciones";
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";
import useAlertas from "../../components/common/alertas/tipoAlertas";
import { FastfoodOutlined } from "@mui/icons-material";

function IniciarSesion() {
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);
    const conectado = useSelector(estado => estado.conectado);
    const navegar = useNavigate();
    const enviarAccion = useDispatch();
    const { mostrarAlertaError } = useAlertas();

    
    useEffect(() => {
        if(conectado) navegar("/")
    }, [conectado, navegar]);

    const iniciarSesion = ({ email, password }) => {
        const mensaje = {};
        setErrores(mensaje);
        setLoading(true);

        enviarAccion(autenticacion({ email, password }))
            .then(() => {
                setLoading(false);
                navegar("/");
            })
            .catch((err) => {
                setLoading(false);
                const mensajeError = err.response?.data?.mensaje || "Ocurrió un error al iniciar sesión.";
                mostrarAlertaError(mensajeError);
            })
    }

    return (
        <Container 
            maxWidth="xs" 
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
            <BackDropProgreso abrir={loading}/>
            <Box 
                sx={{
                    width: '85%',
                    maxWidth: '90%',
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
                    ¡Bienvenido de nuevo!
                </Typography>
                <IniciarSesionForm errores={errores} callback={iniciarSesion} />
                <Box mt={9}>
                    <Typography variant="subtitle2" color="text.secondary" textAlign="center">
                        ¿No tienes una cuenta? 
                        <Button 
                            size="small" 
                            className="estilo-botones-autenticacion"
                            sx={{padding: 1.2, ml: 1, fontWeight: 'bold', color: '#fff'}}
                            component={Link} 
                            to={'/usuario/registrarse'}
                        >
                            Regístrate aquí
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export { IniciarSesion }