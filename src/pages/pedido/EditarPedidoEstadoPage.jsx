import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Box, Chip } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { EstadoCirculo } from '../../components/pedido/PedidoEstado';
import { EDITARPEDIDO_ESTADO_PUT_ENDPOINT } from "../../connections/helpers/endpoints";
import { verPedidoDetalle } from "../../services/pedido/pedidoServicio";
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";
import useAlertas from '../../components/common/alertas/tipoAlertas';
import { CheckCircle } from "@mui/icons-material";

const estadoIds = {
    "Pendiente": "1",
    "Preparando": "2",
    "Listo": "3",
    "Entregado": "4"
};

function EditarPedidoEstadoPage() {
    const { idPedido } = useParams();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();
    const [estado, setEstado] = useState("");
    const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
    const cargaInicial = useRef(true);

    useEffect(() => {
        const obtenerEstadoActual = async (id) => {
            try {
                const pedidoDetalle = await verPedidoDetalle(id);
                const estadoActual = pedidoDetalle.estado;
                if (cargaInicial.current) {
                    setEstado(estadoActual);
                    setEstadoSeleccionado(estadoActual);
                    cargaInicial.current = false;
                }

            } catch (error) {
                const mensajeError = error.response?.data?.error || "Ocurrió un error al obtener el estado actual del pedido.";
                mostrarAlertaError(mensajeError);
            }
        };

        obtenerEstadoActual(idPedido);
    }, [idPedido, mostrarAlertaError]);

    const handleCambiarEstado = (nuevoEstado) => {
        const estadoIndex = Object.keys(estadoIds).indexOf(estado);
        const nuevoEstadoIndex = Object.keys(estadoIds).indexOf(nuevoEstado);
        if (nuevoEstadoIndex === estadoIndex + 1) {
            setEstadoSeleccionado(nuevoEstado);
        }
    };

    const handleConfirmarEstado = () => {
        const idEstado = estadoIds[estadoSeleccionado];
        setCargando(true);

        axios.put(`${EDITARPEDIDO_ESTADO_PUT_ENDPOINT}/${idPedido}`, { idEstado })
            .then(() => {
                setCargando(false);
                navigate(`/pedido/informacion/${idPedido}`);
                mostrarAlertaExito(`Estado de pedido actualizado a ${estadoSeleccionado}.`);
            })
            .catch(error => {
                setCargando(false);
                const mensajeError = error.response?.data?.error || "Ocurrió un error al editar el estado.";
                mostrarAlertaError(mensajeError);
            });
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
            <BackDropProgreso abrir={cargando} />
            <Typography variant="h4" fontWeight="bold" display="flex" alignItems="center" mt={5} mb={3}>
                Seleccionar nuevo estado del pedido
            </Typography>
            <EstadoCirculo estado={estadoSeleccionado} cambiarEstado={handleCambiarEstado} editable={true} />
            <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mt: 1 }}>
                Estado seleccionado: {estadoSeleccionado}
            </Typography>
            {estado === "Entregado" ? (
                <Chip
                    label={"El pedido ya se ha entregado."}
                    icon={<CheckCircle sx={{color: '#fff !important'}} />}
                    sx={{
                        mt: 3,
                        fontWeight: 'semibold',
                        backgroundColor: '#FFA726',
                        color: '#FFF'
                    }}
                />
            ) : (
                <Button
                    className="estilo-button"
                    size="large"
                    onClick={handleConfirmarEstado}
                    disabled={!estadoSeleccionado || estadoSeleccionado === estado}
                    sx={{ mt: 2, border: '1px solid', borderColor: '#FEA93C', color: '#FEA93C', textTransform: 'uppercase', fontWeight: 'bold', width: 200 }}
                    >
                Cambiar estado
            </Button>
            )}
        </Box>
    );
}

export { EditarPedidoEstadoPage }