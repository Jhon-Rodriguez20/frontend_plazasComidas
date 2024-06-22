import { useState } from "react";
import { Container, Box, Typography, Grid, Alert } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";
import { CrearPlatoForm } from "../../components/plato/CrearPlatoForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CREARPLATO_RESTAURANTE_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";
import useAlertas from "../../components/common/alertas/tipoAlertas";

function CrearPlatoPage() {
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const [imagenPrevia, setImagenPrevia] = useState("");
    const navegar = useNavigate();
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();

    const crearPlato = async ({nombrePlato, precio, descripcion, imagenPlato, restauranteId}) => {
        const errores = {};
        setErrores(errores);
        setCargando(true);

        axios.post(CREARPLATO_RESTAURANTE_POST_ENDPOINT, {nombrePlato, precio, descripcion, imagenPlato, restauranteId},
            {headers: {'Content-Type': 'multipart/form-data'}}
        ).then(()=> {
            setCargando(false);
            navegar("/");
            mostrarAlertaExito("Plato creado exitosamente.");
        }).catch((err)=> {
            setCargando(false);
            const mensajeError = err.response?.data?.error || "Ocurrió un error al crear el plato.";
            mostrarAlertaError(mensajeError);
        })
    }

    return (
        <Container className="d-flex justify-content-center mt-4">
            <BackDropProgreso abrir={cargando} />
            <Box display="flex" justifyContent="center" alignItems="center" sx={{minHeight: '78vh'}}>
                <Grid container alignItems='center' padding={2} sx={{border: '1px solid #ccc', borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="h5" textAlign="center" fontWeight={"bold"} mt={4} mb={4}>Crear plato</Typography>
                            {errores.new && <Alert variant="danger">{errores.new}</Alert>}
                            <CrearPlatoForm errores={errores} callback={crearPlato} editable={false} imagenPrevia={setImagenPrevia}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            display="flex"
                            padding={2}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: '100%', height: '450px', marginBottom: '2%', overflow: 'hidden' }}
                        >
                            {imagenPrevia ? (
                                <Box
                                    component="img"
                                    src={imagenPrevia}
                                    alt="Previsualización de la imagen"
                                    sx={{ width: '90%', height: '100%', objectFit: 'contain' }}
                                />
                            ) : (
                                <ImageNotSupported sx={{ fontSize: 150, color: '#ccc' }} />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export {CrearPlatoPage}