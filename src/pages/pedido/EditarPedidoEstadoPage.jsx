import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { EstadoCirculo } from '../../components/pedido/PedidoEstado';
import { EDITARPEDIDO_ESTADO_PUT_ENDPOINT } from "../../connections/helpers/endpoints";
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";
import useAlertas from '../../components/common/alertas/tipoAlertas';

const estadoIds = {
    "Pendiente": "1",
    "Preparando": "2",
    "Listo": "3",
    "Entregado": "4"
};

const EditarPedidoEstadoPage = () => {
    const { idPedido } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();
    const nuevoEstado = state?.nuevoEstado || "";
    const [estadoSeleccionado, setEstadoSeleccionado] = useState(nuevoEstado);
    const handleEstadoChange = (nuevoEstado) => setEstadoSeleccionado(nuevoEstado);

    useEffect(() => {
    }, [nuevoEstado, navigate, idPedido]);

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
                Confirmar nuevo estado del pedido
            </Typography>
            <EstadoCirculo estado={estadoSeleccionado} onEstadoChange={handleEstadoChange} />
            <Typography variant="h6" color="text.secondary" gutterBottom sx={{mt: 1}}>
                Estado seleccionado: {estadoSeleccionado}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleConfirmarEstado}
             disabled={!estadoSeleccionado} sx={{mt: 2}}>
                Confirmar
            </Button>
        </Box>
    );
}

export {EditarPedidoEstadoPage}