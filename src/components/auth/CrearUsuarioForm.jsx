import { useState } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import PropTypes from 'prop-types';

function CrearUsuarioForm({ errores, callback, defaultIdRol }) {
    const [nombre, setNombre] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [ocupacion, setOcupacion] = useState("");
    const [descripcionTrabajo, setDescripcionTrabajo] = useState("");
    const [password, setPassword] = useState("");
    const [idRol, setIdRol] = useState(defaultIdRol);

    const enviarFormulario = (event) => {
        event.preventDefault();
        callback({ nombre, celular, email, ocupacion, descripcionTrabajo, password, idRol });
    }

    return (
        <Box component="form" onSubmit={enviarFormulario}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Nombre y apellido"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        error={!!errores.nombre}
                        helperText={errores.nombre}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        variant="standard"
                        type="number"
                        label="Número celular"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                        error={!!errores.celular}
                        helperText={errores.celular}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errores.email}
                        helperText={errores.email}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Ocupación"
                        value={ocupacion}
                        onChange={(e) => setOcupacion(e.target.value)}
                        error={!!errores.ocupacion}
                        helperText={errores.ocupacion}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Descripción de trabajo"
                        value={descripcionTrabajo}
                        onChange={(e) => setDescripcionTrabajo(e.target.value)}
                        error={!!errores.descripcionTrabajo}
                        helperText={errores.descripcionTrabajo}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        variant="standard"
                        type="password"
                        label="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errores.password}
                        helperText={errores.password}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} className="form-ocultar">
                    <TextField
                        fullWidth
                        variant="standard"
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
                <Grid item xs={12} mt={3}>
                    <Box display='flex' justifyContent='center'>
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
        idRol: PropTypes.string
    }).isRequired,
    callback: PropTypes.func.isRequired,
    defaultIdRol: PropTypes.string.isRequired
}

export { CrearUsuarioForm }