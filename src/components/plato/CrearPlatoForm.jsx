import { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, Typography, Switch, FormControlLabel } from "@mui/material";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import useAlertas from "../common/alertas/tipoAlertas";
import { CargarImagenWebp } from "../common/cargarImagen/CargarImagenWebp";

function CrearPlatoForm({ errores, callback, editable, imagenSeleccionada, pNombrePlato = "", pPrecio = '', pDescripcion = "", pImagenPlato = "", pRestauranteId = "", pMostrado = "" }) {
    const { id } = useParams();
    const [nombrePlato, setNombrePlato] = useState(pNombrePlato);
    const [precio, setPrecio] = useState(pPrecio);
    const [descripcion, setDescripcion] = useState(pDescripcion);
    const [imagenPlato, setImagenPlato] = useState(pImagenPlato);
    const [restauranteId, setRestauranteId] = useState(pRestauranteId);
    const [mostrado, setMostrado] = useState(pMostrado === "1");
    const { mostrarAlertaAdvertencia } = useAlertas();

    useEffect(() => {
        setRestauranteId(id);
    }, [id]);

    const handleSeleccionarImagen = (file, previewURL) => {
        setImagenPlato(file);
        imagenSeleccionada(file, previewURL);
    };

    const enviarFormulario = (event) => {
        event.preventDefault();
        if (!imagenPlato && !editable) {
            mostrarAlertaAdvertencia("Por favor, cargue una imagen del plato.");
            return;
        }
        (!editable) ? callback({ nombrePlato, precio, descripcion, imagenPlato, restauranteId }) :
            callback({ precio, descripcion, mostrado: mostrado ? "1" : "0" });
    };

    return (
        <Box component="form" onSubmit={enviarFormulario} encType="multipart/form-data">
            <Grid container spacing={2}>
                {!editable && (
                <Grid item xs={12} sm={6} md={6} lg={6} mb={3}>
                    <TextField
                        fullWidth
                        className="estilo-form"
                        variant="outlined"
                        type="text"
                        label="Nombre del plato"
                        value={nombrePlato}
                        onChange={(e) => setNombrePlato(e.target.value)}
                        error={!!errores.nombrePlato}
                        helperText={errores.nombrePlato}
                        required
                    />
                </Grid>
                )}
                {editable && (
                    <Grid item xs={12} sm={6} md={6} lg={6} mb={2}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={mostrado}
                                    onChange={(e) => setMostrado(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Mostrar en el menú"
                        />
                    </Grid>
                )}
                <Grid item xs={12} sm={6} md={6} lg={6} mb={3}>
                    <TextField
                        fullWidth
                        className="estilo-form"
                        variant="outlined"
                        type="number"
                        label="Precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        error={!!errores.precio}
                        helperText={errores.precio}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} mb={3}>
                    <TextField
                        fullWidth
                        className="estilo-form"
                        variant="outlined"
                        type="text"
                        label="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        error={!!errores.descripcion}
                        helperText={errores.descripcion}
                        multiline
                        rows={3}
                        required
                    />
                </Grid>
                {!editable && (
                    <Grid item xs={12} sm={6} md={6} lg={6} className="form-ocultar">
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="id rest"
                            value={restauranteId}
                            onChange={(e) => setRestauranteId(e.target.value)}
                            error={!!errores.restauranteId}
                            helperText={errores.restauranteId}
                            disabled
                            required
                        />
                    </Grid>
                )}
                {!editable && (
                    <Grid item xs={12} sm={12} md={12} lg={12} mb={1}>
                        <CargarImagenWebp imagenSeleccionada={handleSeleccionarImagen} mostrarCuadro={true} />
                        {errores.imagenPlato && (
                            <Typography color="error" variant="body2">
                                {errores.imagenPlato}
                            </Typography>
                        )}
                    </Grid>
                )}
                <Grid item xs={12} mt={2}>
                    <Box display='flex' justifyContent='center'>
                        <Button
                            type="submit"
                            className="estilo-button"
                            sx={{ border: '1px solid', borderColor: '#FEA93C', color: '#FEA93C', textTransform: 'uppercase', fontWeight: 'bold', width: 200 }}
                            size="large"
                        >
                            {editable ? "Actualizar plato" : "Crear plato"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

CrearPlatoForm.propTypes = {
    errores: PropTypes.shape({
        nombrePlato: PropTypes.string,
        precio: PropTypes.number,
        descripcion: PropTypes.string,
        imagenPlato: PropTypes.string,
        restauranteId: PropTypes.string,
        mostrado: PropTypes.string
    }).isRequired,
    callback: PropTypes.func.isRequired,
    pNombrePlato: PropTypes.string,
    pPrecio: PropTypes.number,
    pDescripcion: PropTypes.string,
    pImagenPlato: PropTypes.string,
    pRestauranteId: PropTypes.string,
    pMostrado: PropTypes.string,
    editable: PropTypes.bool,
    imagenSeleccionada: PropTypes.func
};

export { CrearPlatoForm }