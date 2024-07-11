import { useState, useEffect } from "react";
import { SkeletonCard } from "../../components/common/loading/Skeleton";
import { PlatoCard } from "./PlatoCard";
import { NoMeals } from "@mui/icons-material";
import { obtenerPlatosRestaurante, leerDetallePlato } from "../../services/plato/platoServicio";
import { Container, Grid, Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { PlatoDetalle } from "./PlatoDetalle";
import PropTypes from "prop-types";

function PlatoLista({ dispatchAccion, mostrarAcciones }) {
    const { id } = useParams();
    const [platos, setPlatos] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [detalleAbrir, setDetalleAbrir] = useState(false);
    const [detallePlato, setDetallePlato] = useState(null);

    useEffect(() => {
        const verPlatos = async () => {
            obtenerPlatosRestaurante(id)
                .then(data => setPlatos(data))
                .catch(() => {})
                .finally(() => setBuscando(false));
        }
        verPlatos();
        if (dispatchAccion) {
            dispatchAccion(id);
        }
    }, [id, dispatchAccion]);

    const abrirDetalle = (plato) => {
        leerDetallePlato(plato)
            .then(detalle => {
                setDetallePlato(detalle);
                setDetalleAbrir(true);
            })
            .catch(() => {});
    }

    return (
        <Container sx={{ mb: 8 }}>
            {buscando ? (
                <SkeletonCard contador={6} />
            ) : (
                platos.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <NoMeals sx={{ fontSize: 60 }} color="action" />
                        <Typography variant="h6">No se encontraron platos a este restaurante</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3} mb={5}>
                        {platos.map(plato => (
                            <Grid item xs={12} sm={6} md={6} lg={6} key={plato.idPlato}>
                                <PlatoCard
                                    platoEntidad={plato}
                                    mostrar={mostrarAcciones}
                                    mostrarAcciones={mostrarAcciones}
                                    click={() => abrirDetalle(plato)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )
            )}
            <PlatoDetalle abrir={detalleAbrir} cerrar={() => setDetalleAbrir(false)} platoEntidad={detallePlato} />
        </Container>
    )
}

PlatoLista.propTypes = {
    dispatchAccion: PropTypes.func,
    mostrarAcciones: PropTypes.bool.isRequired
};

export { PlatoLista }