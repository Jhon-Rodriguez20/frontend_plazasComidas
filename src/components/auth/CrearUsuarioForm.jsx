import { useState } from "react";
import { Box, TextField, Button, Grid, Paper, Typography } from "@mui/material";
import useAlertas from "../common/alertas/tipoAlertas";
import PropTypes from "prop-types";
import { OcupacionDescripcion } from "../static/OcupacionDescripcion";

function CrearUsuarioForm({ errores, callback, mostrarChips, defaultOcupacion, defaultDescTrabajo, defaultIdRol }) {
    const [nombre, setNombre] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [ocupacion, setOcupacion] = useState(defaultOcupacion || "");
    const [descripcionTrabajo, setDescripcionTrabajo] = useState(defaultDescTrabajo || "");
    const [password, setPassword] = useState("");
    const [idRol, setIdRol] = useState(defaultIdRol);
    const { mostrarAlertaAdvertencia } = useAlertas();

    const enviarFormulario = (event) => {
        event.preventDefault();
        if (mostrarChips && !ocupacion) {
            mostrarAlertaAdvertencia("Por favor, seleccione una ocupación.");
            return;
        }
        callback({ nombre, celular, email, ocupacion, descripcionTrabajo, password, idRol });
    };

    return (
        <Box component="form" onSubmit={enviarFormulario}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={mostrarChips ? 6 : 12}>
                    <Grid container spacing={2}>
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
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                        >
                            Crear usuario
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
    defaultIdRol: PropTypes.string.isRequired,
    defaultOcupacion: PropTypes.string,
    defaultDescTrabajo: PropTypes.string,
    mostrarChips: PropTypes.bool.isRequired,
};

export { CrearUsuarioForm }