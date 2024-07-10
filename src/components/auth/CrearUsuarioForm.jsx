import { useState, useCallback, useEffect } from "react";
import { Box, TextField, Button, Grid, Paper, Typography, Avatar } from "@mui/material";
import useAlertas from "../common/alertas/tipoAlertas";
import PropTypes from "prop-types";
import { OcupacionDescripcion } from "../usuario/OcupacionDescripcion";

function CrearUsuarioForm({ errores, callback, mostrarChips, defaultOcupacion, defaultDescTrabajo="",
    defaultIdRol, editar, imagenPrevia, uCelular="", uImagenPerfil="" }) {

    const [nombre, setNombre] = useState("");
    const [celular, setCelular] = useState(uCelular);
    const [email, setEmail] = useState("");
    const [ocupacion, setOcupacion] = useState(defaultOcupacion);
    const [descripcionTrabajo, setDescripcionTrabajo] = useState(defaultDescTrabajo);
    const [password, setPassword] = useState("");
    const [idRol, setIdRol] = useState(defaultIdRol);
    const [imagenPerfil, setImagenPerfil] = useState(uImagenPerfil);
    const [mostrarImagenPerfil, setMostrarImagenPerfil] = useState(imagenPrevia);
    const { mostrarAlertaAdvertencia } = useAlertas();

    useEffect(() => {
        if (uImagenPerfil) {
            setImagenPerfil(uImagenPerfil);
            setMostrarImagenPerfil(uImagenPerfil);
        }
    }, [uImagenPerfil]);

    const enviarFormulario = (event) => {
        event.preventDefault();
        if (mostrarChips && !ocupacion) {
            mostrarAlertaAdvertencia("Por favor, seleccione una ocupación.");
            return;
        }
        (!editar) ? callback({ nombre, celular, email, ocupacion, descripcionTrabajo, password, idRol }) : callback({ celular, imagenPerfil });
    };

    const cargarImagen = useCallback((imagen) => {
        const imagenCargar = imagen[0];
        if (imagenCargar) {
            const validarMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validarMimeTypes.includes(imagenCargar.type)) {
                mostrarAlertaAdvertencia("Tipo de archivo no válido. Por favor, sube una imagen (jpeg, png, gif).");
                return;
            }
            setImagenPerfil(imagenCargar);
            setMostrarImagenPerfil(URL.createObjectURL(imagenCargar));
        }
    }, [mostrarAlertaAdvertencia]);

    return (
        <Box component="form" onSubmit={enviarFormulario} mb={6}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={mostrarChips ? 6 : 12}>
                    <Grid container spacing={2}>
                        {!editar && (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    label="Nombre y apellido"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    error={!!errores.nombre}
                                    helperText={errores.nombre}
                                    required
                                />
                            </Grid>
                        )}
                        {editar && (
                            <Grid item xs={12} display="flex" justifyContent="center">
                                <Avatar 
                                    alt="Imagen de perfil" 
                                    src={mostrarImagenPerfil}
                                    sx={{ width: 150, height: 150, cursor: 'pointer', mb: 2 }}
                                    onClick={() => document.getElementById("formImagen").click()}
                                />
                                <input
                                    id="formImagen"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => cargarImagen(e.target.files)}
                                    accept="image/jpeg, image/png, image/gif"
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="number"
                                label="Número celular"
                                value={celular}
                                onChange={(e) => setCelular(e.target.value)}
                                error={!!errores.celular}
                                helperText={errores.celular}
                                required
                            />
                        </Grid>                        
                        {!editar && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Correo electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={!!errores.email}
                                        helperText={errores.email}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        label="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        error={!!errores.password}
                                        helperText={errores.password}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} className="form-ocultar">
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        label="Rol"
                                        value={idRol}
                                        onChange={(e) => setIdRol(e.target.value)}
                                        error={!!errores.idRol}
                                        helperText={errores.idRol}
                                        disabled
                                        required
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
                {mostrarChips && (
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Ocupación
                            </Typography>
                            <OcupacionDescripcion
                                setOcupacion={setOcupacion}
                                descripcionTrabajo={descripcionTrabajo}
                                setDescripcionTrabajo={setDescripcionTrabajo}
                            />
                        </Paper>
                    </Grid>
                )}
                <Grid item xs={12} mt={3}>
                    <Box display="flex" justifyContent="center">
                        <Button
                            type="submit"
                            sx={{border: '1px solid', borderColor: '#FEA93C', color: '#FEA93C', textTransform: 'uppercase', fontWeight: 'bold'}}
                            size="large"
                            className="estilo-button"
                            fullWidth
                        >
                            {!editar ? "Crear usuario" : "Editar información"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

CrearUsuarioForm.propTypes = {
    errores: PropTypes.shape({
        nombre: PropTypes.string,
        celular: PropTypes.string,
        email: PropTypes.string,
        ocupacion: PropTypes.string,
        descripcionTrabajo: PropTypes.string,
        password: PropTypes.string,
        idRol: PropTypes.string,
    }).isRequired,
    callback: PropTypes.func.isRequired,
    defaultIdRol: PropTypes.string,
    defaultOcupacion: PropTypes.string,
    defaultDescTrabajo: PropTypes.string,
    uCelular: PropTypes.string,
    uImagenPerfil: PropTypes.string,
    mostrarChips: PropTypes.bool.isRequired,
    imagenPrevia: PropTypes.string,
    editar: PropTypes.bool.isRequired
};

export { CrearUsuarioForm };
