import { useCallback, useState, useEffect } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { FileDrop } from "react-file-drop";
import { useParams } from "react-router-dom";
import useAlertas from "../common/alertas/tipoAlertas";

function CrearRestauranteForm({ errores, callback, imagenPrevia }) {
    const {id} = useParams();
    const [razonSocial, setRazonSocial] = useState("");
    const [nit, setNit] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [imagenRestaurante, setImgRestaurante] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const {mostrarAlertaAdvertencia} = useAlertas();

    useEffect(()=> {
        setIdUsuario(id);
    }, [id]);

    const enviarFormulario = (event) => {
        event.preventDefault();
        if (!imagenRestaurante) {
            mostrarAlertaAdvertencia("Por favor, cargue una imagen del restaurante.");
            return;
        }
        callback({ razonSocial, nit, direccion, telefono, imagenRestaurante, idUsuario });
    }

    const cargarImagen = useCallback((imagen) => {
        const imagenCargar = imagen[0];
        if(imagenCargar) {
            const validarMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if(!validarMimeTypes.includes(imagenCargar.type)) {
                alert("Tipo de archivo no válido. Por favor, sube una imagen (jpeg, png, gif).");
                return;
            }
        }
        setImgRestaurante(imagenCargar);
        imagenPrevia(URL.createObjectURL(imagenCargar));

    }, [imagenPrevia])

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
                        error={!!errores.razonSocial}
                        helperText={errores.razonSocial}
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
                        error={!!errores.nit}
                        helperText={errores.nit}
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
                        error={!!errores.direccion}
                        helperText={errores.direccion}
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
                        error={!!errores.telefono}
                        helperText={errores.telefono}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} mb={1}>
                    <FileDrop onDrop={cargarImagen} onTargetClick={()=> document.getElementById("formImagen").click()}>
                        <input id="formImagen" type="file" style={{ display: 'none'}}
                            onChange={(e)=> cargarImagen(e.target.files)} accept="image/jpeg, image/png, image/gif"
                        />
                        <Box sx={{ border: '2px dashed gray', padding: 5, textAlign: 'center', cursor: 'pointer'}}>
                            <Typography variant="body1" color="GrayText">
                                Arrastra y suelta una imagen aquí, o haz clic para seleccionar una
                            </Typography>
                        </Box>
                    </FileDrop>
                    {errores.imagenRestaurante && (
                        <Typography color="error" variant="body2">
                            {errores.imagenRestaurante}
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
                        error={!!errores.idUsuario}
                        helperText={errores.idUsuario}
                        disabled
                        required                        
                    />
                </Grid>
                <Grid item xs={12} mt={2}>
                    <Box display='flex' justifyContent='center'>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="medium"
                            className="estilo-button"
                            fullWidth
                        >
                            Crear restaurante
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
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
    imagenPrevia: PropTypes.func
}

export {CrearRestauranteForm}