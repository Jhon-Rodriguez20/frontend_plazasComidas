import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ELIMINARPEDIDO_DELETE_ENDPOINT } from "../../connections/helpers/endpoints";
import useAlertas from "../common/alertas/tipoAlertas";
import { BackDropProgreso } from "../common/loading/BackDropProgreso";
import PropTypes from "prop-types";
import { ConfirmarEliminarAlerta } from "../common/alertas/ConfirmarEliminarAlerta";
import { IconButton, Tooltip } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

function EliminarPedidoBoton({ id }) {
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();
    const navegar = useNavigate();
    const [cargando, setCargando] = useState(false);

    const eliminarPedido = async () => {
        setCargando(true);
        try {
            await axios.delete(`${ELIMINARPEDIDO_DELETE_ENDPOINT}/${id}`);
            mostrarAlertaExito("Su pedido ha sido eliminado exitosamente.");
            navegar("/");

        } catch (error) {
            const mensajeError = error.response?.data?.error || "Ocurrió un error al eliminar el plato.";
            mostrarAlertaError(mensajeError);

        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <ConfirmarEliminarAlerta
                mensaje="¿Estás seguro de que deseas eliminar su pedido de forma permanente?"
                onConfirmar={eliminarPedido}
                trigger={
                    <Tooltip title="Eliminar Pedido">
                        <IconButton
                            aria-label="delete"
                            className="eliminar-boton"
                        >
                            <DeleteForever sx={{ color: 'red' }} />
                        </IconButton>
                    </Tooltip>
                }
            />
            <BackDropProgreso abrir={cargando} />
        </>
    );
}

EliminarPedidoBoton.propTypes = {
    id: PropTypes.string.isRequired,
};

export { EliminarPedidoBoton }