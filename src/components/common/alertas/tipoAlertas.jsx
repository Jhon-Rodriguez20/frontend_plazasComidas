import { toast } from 'react-toastify';

const useAlertas = () => {
    const mostrarAlertaExito = (message) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 3500,
        });
    };

    const mostrarAlertaError = (message) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 3500,
        });
    };

    const mostrarAlertaAdvertencia = (message) => {
        toast.warn(message, {
            position: "bottom-right",
            autoClose: 3500,
        });
    };

    return {
        mostrarAlertaExito,
        mostrarAlertaError,
        mostrarAlertaAdvertencia
    };
};

export default useAlertas;