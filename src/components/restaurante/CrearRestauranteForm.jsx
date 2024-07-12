import { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { CargarImagenWebp } from "../common/cargarImagen/CargarImagenWebp";

function CrearRestauranteForm({ errores, callback, imagenSeleccionada }) {
    const { id } = useParams();
    const [razonSocial, setRazonSocial] = useState("");
    const [nit, setNit] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [imagenRestaurante, setImgRestaurante] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [erroresLocal, setErroresLocal] = useState({});

    useEffect(() => {
        setIdUsuario(id);
    }, [id]);

    const handleSeleccionarImagen = (file, previewURL) => {
        setImgRestaurante(file);
        imagenSeleccionada(file, previewURL);
    };

    const enviarFormulario = (event) => {
        event.preventDefault();

        setErroresLocal({});
        callback({ razonSocial, nit, direccion, telefono, imagenRestaurante, idUsuario });
    };

    return (
        <Box component="form" onSubmit={enviarFormulario} encType="multipart/form-data">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6} mb={3}>
                    <TextField
                        fullWidth
                        className="estilo-form"
                        variant="outlined"
                        type="text"
                        label="Razón social"
                        value={razonSocial}
                        onChange={(e) => setRazonSocial(e.target.value)}
                        error={!!erroresLocal.razonSocial || !!errores.razonSocial}
                        helperText={erroresLocal.razonSocial || errores.razonSocial}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} mb={3}>
                    <TextField
                        fullWidth
                        className="estilo-form"
                        variant="outlined"
                        type="text"
                        label="NIT"
                        value={nit}
                        onChange={(e) => setNit(e.target.value)}
                        error={!!erroresLocal.nit || !!errores.nit}
                        helperText={erroresLocal.nit || errores.nit}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} mb={3}>
                    <TextField
                        fullWidth
                        className="estilo-form"
                        variant="outlined"
                        type="text"
                        label="Dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        error={!!erroresLocal.direccion || !!errores.direccion}
                        helperText={erroresLocal.direccion || errores.direccion}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} mb={3}>
                    <TextField
                        fullWidth
                        className="estilo-form"
                        variant="outlined"
                        type="number"
                        label="Teléfono o celular"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        error={!!erroresLocal.telefono || !!errores.telefono}
                        helperText={erroresLocal.telefono || errores.telefono}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} mb={1}>
                    <CargarImagenWebp imagenSeleccionada={handleSeleccionarImagen} mostrarCuadro={true} />
                    {erroresLocal.imagenRestaurante && (
                        <Typography color="error" variant="body2">
                            {erroresLocal.imagenRestaurante}
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className="form-ocultar">
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="text"
                        label="IdUsuario"
                        value={idUsuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                        error={!!erroresLocal.idUsuario || !!errores.idUsuario}
                        helperText={erroresLocal.idUsuario || errores.idUsuario}
                        disabled
                        required
                    />
                </Grid>
                <Grid item xs={12} mt={2}>
                    <Box display='flex' justifyContent='center'>
                        <Button
                            type="submit"
                            className="estilo-button"
                            sx={{border: '1px solid', borderColor: '#FEA93C', color: '#FEA93C', textTransform: 'uppercase', fontWeight: 'bold', width: 200}}
                            size="large"                            
                        >
                            Crear restaurante
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

CrearRestauranteForm.propTypes = {
    errores: PropTypes.shape({
        razonSocial: PropTypes.string,
        nit: PropTypes.string,
        direccion: PropTypes.string,
        telefono: PropTypes.string,
        imagenRestaurante: PropTypes.string,
        idUsuario: PropTypes.string
    }).isRequired,
    callback: PropTypes.func.isRequired,
    imagenSeleccionada: PropTypes.func
};

export { CrearRestauranteForm }