import { useEffect, useState } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { CrearPlatoForm } from "../../components/plato/CrearPlatoForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PLATO_DETALLE_GET_ENDPOINT, EDITARPLATO_RESTAURANTE_PUT_ENDPOINT } from "../../connections/helpers/endpoints";
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";
import useAlertas from '../../components/common/alertas/tipoAlertas';

function EditarPlatoPage() {
    const { id } = useParams();
    const [errores, setErrores] = useState({});
    const [plato, setPlato] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navegar = useNavigate();
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();

    useEffect(() => {
        axios.get(`${PLATO_DETALLE_GET_ENDPOINT}/${id}`)
            .then(respuesta => {
                setPlato(respuesta.data.platoEntity);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    const editarPlato = async ({ precio, descripcion, mostrado }) => {
        const error = {};
        setErrores(error);
        setCargando(true);

        axios.put(`${EDITARPLATO_RESTAURANTE_PUT_ENDPOINT}/${plato.idPlato}`, { precio, descripcion, mostrado })
            .then(() => {
                setCargando(false);
                navegar(`/verPlatos/${plato.restauranteId}`);
                mostrarAlertaExito("Plato editado exitosamente.");
            })
            .catch((error) => {
                setCargando(false);
                const mensajeError = error.response?.data?.error || "Ocurrió un error al editar el plato.";
                mostrarAlertaError(mensajeError);
            });
    };

    return (
        <Container maxWidth="sm">
            <BackDropProgreso abrir={cargando} />
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '70vh', width: '100%' }}>
                <Grid container alignItems='center' padding={3} sx={{
                    border: '1px solid #ccc', borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    width: '100%'
                }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" textAlign="center" fontWeight={"bold"} mt={3} mb={4}>Editar plato</Typography>
                        {plato && (
                            <CrearPlatoForm
                                errores={errores}
                                callback={editarPlato}
                                pPrecio={plato.precio}
                                pDescripcion={plato.descPlato}
                                pMostrado={plato.mostrado}
                                editable={true}
                            />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export { EditarPlatoPage }
