import { useEffect, useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IniciarSesionForm } from "../../components/auth/IniciarSesionForm";
import { autenticacion } from "../../connections/usuarioAcciones";
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";
import MenuBookIconWithGradient from "../../assets/MenuBookSvg";

function IniciarSesion() {
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);
    const conectado = useSelector(estado => estado.conectado);
    const navegar = useNavigate();
    const envuiarAccion = useDispatch();
    
    useEffect(() => {
        if(conectado) navegar("/")
    }, [conectado, navegar]);

    const iniciarSesion = ({ email, password }) => {
        const error = {};
        setErrores(error);
        setLoading(true);

        envuiarAccion(autenticacion({ email, password }))
            .then(() => {
                setLoading(false);
                navegar("/")
            })
            .catch(() => {
                setLoading(false);
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
                minHeight: '80vh'
            }}
        >
            <BackDropProgreso abrir={loading}/>
            <Box 
                sx={{
                    width: '75%',
                    maxWidth: '80%',
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
                    ¡Descubre un festín de sabores que hará bailar tus papilas gustativas en cada bocado!
                </Typography>
                <IniciarSesionForm errores={errores} callback={iniciarSesion} />
                <Box mt={9}>
                    <Typography variant="subtitle2" color="text.secondary" textAlign="center">
                        ¿No tienes una cuenta? 
                        <Button 
                            variant="contained" 
                            size="small" 
                            color="primary" 
                            sx={{ padding: 1.5, marginLeft: 1 }} 
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