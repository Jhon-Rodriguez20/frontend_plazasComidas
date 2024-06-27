import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function ConfirmarEliminarAlerta({ mensaje, onConfirmar, trigger }) {
    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        onConfirmar();
        setOpen(false);
    };

    const TriggerElement = React.cloneElement(trigger, { onClick: handleOpen });

    return (
        <>
            {TriggerElement}
            <Dialog
                open={open}
                onClose={handleClose}
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
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
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
    trigger: PropTypes.element.isRequired,
};

export { ConfirmarEliminarAlerta }