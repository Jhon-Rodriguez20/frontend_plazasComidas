import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { vaciarPedido } from "../../../store/pedidoStore";
import { ConfirmarEliminarAlerta } from "./ConfirmarEliminarAlerta";
import { useBlockNavigation } from "./bloquearNavegacion";

const AlertaSalida = () => {
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [nextLocation, setNextLocation] = useState(null);
    const [confirmarSalida, setConfirmarSalida] = useState(false);
    const platosSeleccionados = useSelector(state => state.pedido.platos);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleConfirmarSalida = () => {
        setConfirmarSalida(true);
        setMostrarAlerta(false);
        dispatch(vaciarPedido());
        navigate(nextLocation.pathname);
    };

    const handleCancelarSalida = () => {
        setConfirmarSalida(false);
        setMostrarAlerta(false);
    };

    useBlockNavigation((tx) => {
        if (platosSeleccionados.length > 0 && !confirmarSalida) {
            setMostrarAlerta(true);
            setNextLocation(tx.location);
        } else {
            tx.retry();
        }
    });

    return (
        <>
            {mostrarAlerta && (
                <ConfirmarEliminarAlerta
                    mensaje="Si te sales, se eliminarán los datos del pedido. ¿Estás seguro de que deseas salir?"
                    onConfirmar={handleConfirmarSalida}
                    onCancel={handleCancelarSalida}
                    trigger={<div />}
                />
            )}
        </>
    );
};

export { AlertaSalida };