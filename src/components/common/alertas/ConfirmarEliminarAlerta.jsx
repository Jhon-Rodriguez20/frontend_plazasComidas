import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function ConfirmarEliminarAlerta({ mensaje, onConfirmar, onCancelar, trigger }) {
    const [abrir, setAbrir] = useState(false);

    const handleAbrir = (e) => {
        e.stopPropagation();
        setAbrir(true);
    }

    const handleCerrar = () => {
        setAbrir(false);
        if (onCancelar) {
            onCancelar();
        }
    }

    const handleConfirmar = () => {
        onConfirmar();
        setAbrir(false);
    }

    const TriggerElemento = React.cloneElement(trigger, { onClick: handleAbrir });

    return (
        <>
            {TriggerElemento}
            <Dialog
                open={abrir}
                onClose={handleCerrar}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {mensaje}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCerrar} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmar} color="warning"variant="contained">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

ConfirmarEliminarAlerta.propTypes = {
    mensaje: PropTypes.string.isRequired,
    onConfirmar: PropTypes.func.isRequired,
    onCancelar: PropTypes.func,
    trigger: PropTypes.element.isRequired,
};

export { ConfirmarEliminarAlerta };