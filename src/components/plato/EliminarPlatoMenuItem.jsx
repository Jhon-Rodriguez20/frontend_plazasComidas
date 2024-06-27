import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ELIMINARPLATO_RESTAURANTE_DELETE_ENDPOINT } from "../../connections/helpers/endpoints";
import useAlertas from "../common/alertas/tipoAlertas";
import { BackDropProgreso } from "../common/loading/BackDropProgreso";
import PropTypes from "prop-types";
import { ConfirmarEliminarAlerta } from "../common/alertas/ConfirmarEliminarAlerta";
import { MenuItem } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

function EliminarPlatoMenuItem({ id, nombrePlato, nombreRestaurante }) {
    const { mostrarAlertaExito, mostrarAlertaError } = useAlertas();
    const navegar = useNavigate();
    const [cargando, setCargando] = useState(false);

    const eliminarPlato = async () => {
        setCargando(true);
        try {
            await axios.delete(`${ELIMINARPLATO_RESTAURANTE_DELETE_ENDPOINT}/${id}`);
            mostrarAlertaExito(`El plato "${nombrePlato}" fue eliminado exitosamente.`);
            navegar("/misRestaurantes");
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
                mensaje={`¿Estás seguro de que deseas eliminar el plato ${nombrePlato} del restaurante ${nombreRestaurante}?`}
                onConfirmar={eliminarPlato}
                trigger={
                    <MenuItem>
                        <DeleteForever sx={{ color: 'red', marginRight: 1 }} />
                            Eliminar
                    </MenuItem>
                }
            />
            <BackDropProgreso abrir={cargando} />
        </>
    );
}

EliminarPlatoMenuItem.propTypes = {
    id: PropTypes.string.isRequired,
    nombrePlato: PropTypes.string.isRequired,
    nombreRestaurante: PropTypes.string.isRequired,
};

export { EliminarPlatoMenuItem };
