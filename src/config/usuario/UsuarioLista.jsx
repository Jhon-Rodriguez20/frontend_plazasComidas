import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { UsuarioPerfilCard } from "../../components/usuario/UsuarioCard";
import PropTypes from "prop-types";

function UsuarioLista({ obtenerUsuarios, icono, mensaje }) {
    const [usuarios, setUsuarios] = useState([]);
    const [buscando, setBuscando] = useState(true);

    useEffect(() => {
        const verUsuarios = async () => {
            obtenerUsuarios()
                .then(data => setUsuarios(data))
                .catch(() => {})
                .finally(() => setBuscando(false));
        };
        verUsuarios();
    }, [obtenerUsuarios]);

    return (
        <Container sx={{ mb: 8 }}>
            {buscando ? (
                <SkeletonCard contador={6} />
            ) : (
                usuarios.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        {icono}
                        <Typography variant="h6" mt={2}>{mensaje}</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3} mb={5}>
                        {usuarios.map(usuario => (
                            <Grid item xs={12} sm={6} md={4} lg={4} key={usuario.idUsuario}>
                                <UsuarioPerfilCard 
                                    usuarioEntity={usuario} 
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
        </Container>
    )
}

UsuarioLista.propTypes = {
    obtenerUsuarios: PropTypes.func.isRequired,
    icono: PropTypes.element.isRequired,
    mensaje: PropTypes.string.isRequired
}

export { UsuarioLista }