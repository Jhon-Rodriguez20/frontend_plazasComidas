import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { UsuarioPerfilCard } from "../../components/usuario/UsuarioCard";
import { obtenerMisEmpleados } from "../../services/usuario/usuarioServicio";

function MisEmpleadosPage() {
    const [empleados, setEmpleados] = useState([]);
    const [buscando, setBuscando] = useState(true);

    useEffect(() => {
        const verEmpleados = async () => {
            obtenerMisEmpleados()
                .then(data => setEmpleados(data))
                .catch(error => console.error("Error al obtener los empleados: ", error))
                .finally(() => setBuscando(false));
        };
        verEmpleados();
    }, []);

    return (
        <Container>
            {buscando ? (
                <SkeletonCard contador={6} />
            ) : (
                empleados.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <VerifiedUser sx={{ fontSize: 60 }} color="action" />
                        <Typography variant="h6" mt={2}>No se encontraron empleados</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3} mb={5}>
                        {empleados.map(empleado => (
                            <Grid item xs={12} sm={6} md={4} lg={4} key={empleado.idUsuario}>
                                <UsuarioPerfilCard 
                                    usuarioEntity={empleado} 
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
        </Container>
    )
}

export {MisEmpleadosPage}