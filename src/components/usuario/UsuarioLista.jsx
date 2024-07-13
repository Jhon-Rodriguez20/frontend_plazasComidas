import { useState, useEffect } from "react";
import { Container, Grid, Box, Typography, Stack } from "@mui/material";
import { SkeletonCard } from "../common/loading/Skeleton";
import { UsuarioPerfilCard } from "./UsuarioCard";
import PropTypes from "prop-types";
import { Paginacion } from "../common/paginacion/Paginacion";

function UsuarioLista({ obtenerUsuarios, icono, mensaje }) {
    const [usuarios, setUsuarios] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(8);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const verUsuarios = async () => {
            try {
                const { usuarios, total } = await obtenerUsuarios(page, pageSize);
                setUsuarios(usuarios);
                setTotal(total);
            } catch (error) {
                console.error(error);
            } finally {
                setBuscando(false);
            }
        };
        verUsuarios();
    }, [obtenerUsuarios, page, pageSize]);

    const handleCambiarPagina = (value) => {
        setPage(value);
    }

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
                    <>
                        <Grid container spacing={3} mb={5}>
                            {usuarios.map(usuario => (
                                <Grid item xs={12} sm={6} md={4} lg={4} key={usuario.idUsuario}>
                                    <UsuarioPerfilCard 
                                        usuarioEntity={usuario} 
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Stack spacing={2} alignItems="center" mt={4}>
                            <Paginacion 
                                page={page} 
                                totalPages={Math.ceil(total / pageSize)}
                                onPageChange={handleCambiarPagina}
                            />
                        </Stack>
                    </>
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