import { useState } from "react";
import { Container, Box, Typography, Grid, Alert } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";
import { CrearRestauranteForm } from "../../components/restaurante/CrearRestauranteForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CREARRESTAURANTE_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";

function CrearRestaurantePage() {
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const [imagenPrevia, setImagenPrevia] = useState("");
    const navegar = useNavigate();

    const crearRestaurante = async ({razonSocial, nit, direccion, telefono, imagenRestaurante, idUsuario}) => {
        const errores = {};
        setErrores(errores);
        setCargando(true);

        axios.post(CREARRESTAURANTE_POST_ENDPOINT, {razonSocial, nit, direccion, telefono, imagenRestaurante, idUsuario},
            {headers: {'Content-Type': 'multipart/form-data'}}
        ).then(()=> {
            setCargando(false);
            navegar("/");
        }).catch((err)=> {
            setCargando(false);
            console.error(err);
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
                            <Typography variant="h5" textAlign="center" fontWeight={"bold"} mt={4} mb={4}>Crear restaurante</Typography>
                            {errores.new && <Alert variant="danger">{errores.new}</Alert>}
                            <CrearRestauranteForm errores={errores} callback={crearRestaurante} imagenPrevia={setImagenPrevia}/>
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

export {CrearRestaurantePage}