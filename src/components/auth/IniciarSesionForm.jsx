import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import PropTypes from 'prop-types';

function IniciarSesionForm({ errores, callback }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const enviarFormulario = (event) => {
        event.preventDefault();
        callback({ email, password });
    }

    return (
        <Box component="form" onSubmit={enviarFormulario}>
            <TextField
                fullWidth
                className="estilo-form"
                sx={{ marginBottom: 2 }}
                variant="outlined"
                type="email"
                label="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errores.email}
                helperText={errores.email}
                required
            />
            <TextField
                fullWidth
                className="estilo-form"
                sx={{ marginBottom: 5 }}
                variant="outlined"
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errores.password}
                helperText={errores.password}
                required
            />
            <Box display='flex' justifyContent='center'>
                <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    className="estilo-button"
                >
                    Iniciar sesión
                </Button>
            </Box>
        </Box>
    )
}

IniciarSesionForm.propTypes = {
    errores: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    callback: PropTypes.func.isRequired
}

export { IniciarSesionForm }
