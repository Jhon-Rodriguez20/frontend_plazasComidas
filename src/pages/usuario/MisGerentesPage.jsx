import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { UsuarioPerfilCard } from "../../components/usuario/UsuarioCard";
import { obtenerMisGerentes } from "../../services/usuario/usuarioServicio";

function MisGerentesPage() {
    const [gerentes, setGerentes] = useState([]);
    const [buscando, setBuscando] = useState(true);

    useEffect(() => {
        const verGerentes = async () => {
            obtenerMisGerentes()
                .then(data => setGerentes(data))
                .catch(error => console.error("Error al obtener los gerentes: ", error))
                .finally(() => setBuscando(false));
        };
        verGerentes();
    }, []);

    return (
        <Container>
            {buscando ? (
                <SkeletonCard contador={6} />
            ) : (
                gerentes.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <VerifiedUser sx={{ fontSize: 60 }} color="action" />
                        <Typography variant="h6" mt={2}>No se encontraron gerentes</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3} mb={5}>
                        {gerentes.map(gerente => (
                            <Grid item xs={12} sm={6} md={4} lg={4} key={gerente.idUsuario}>
                                <UsuarioPerfilCard 
                                    usuarioEntity={gerente} 
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
        </Container>
    )
}

export {MisGerentesPage}