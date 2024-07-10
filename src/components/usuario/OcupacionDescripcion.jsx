import { useState } from "react";
import { Box, Chip, TextField } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import PropTypes from "prop-types";

const ocupaciones = [
    { label: "Cocinero", descripcion: "Preparar y cocinar los alimentos." },
    { label: "Mesero", descripcion: "Atender clientes." },
    { label: "Lava platos", descripcion: "Lavar platos y utensilios." },
    { label: "Bartender", descripcion: "Preparar y servir bebidas." }
];

function OcupacionDescripcion({ setOcupacion, descripcionTrabajo, setDescripcionTrabajo }) {
    const [ocupacionSeleccionada, setOcupacionSeleccionada] = useState("");

    const handleChipClick = (ocupacionSeleccionada) => {
        const ocupacionData = ocupaciones.find(o => o.label === ocupacionSeleccionada);
        setOcupacion(ocupacionSeleccionada);
        setDescripcionTrabajo(ocupacionData.descripcion);
        setOcupacionSeleccionada(ocupacionSeleccionada);
    };

    return (
        <Box>
            <Box display="flex" flexWrap="wrap" mb={2}>
                {ocupaciones.map((ocupacion) => (
                    <Chip
                        className="chip"
                        key={ocupacion.label}
                        label={ocupacion.label}
                        onClick={() => handleChipClick(ocupacion.label)}
                        icon={ocupacionSeleccionada === ocupacion.label ? <CheckCircle sx={{color: '#fff !important'}} /> : null}
                        sx={{
                            margin: 0.5,
                            backgroundColor: ocupacionSeleccionada === ocupacion.label ? '#FFA726' : 'default',
                            color: ocupacionSeleccionada === ocupacion.label ? '#FFF' : 'default'
                        }}
                    />
                ))}
            </Box>
            <TextField
                fullWidth
                variant="outlined"
                label="Descripción de trabajo"
                value={descripcionTrabajo}
                onChange={(e) => setDescripcionTrabajo(e.target.value)}
                multiline
                rows={4}
            />
        </Box>
    );
}

OcupacionDescripcion.propTypes = {
    setOcupacion: PropTypes.func.isRequired,
    descripcionTrabajo: PropTypes.string.isRequired,
    setDescripcionTrabajo: PropTypes.func.isRequired,
};

export { OcupacionDescripcion }