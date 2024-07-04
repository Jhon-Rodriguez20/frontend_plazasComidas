import PropTypes from 'prop-types';
import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PedidoMetodoPago = ({ idMetodoPago }) => {
    const [metodo, setMetodo] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setMetodo(value);
        idMetodoPago(value);
    };

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Seleccionar Método de Pago</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <RadioGroup row value={metodo} onChange={handleChange}>
                    <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Efectivo"
                    />
                    <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Nequi"
                    />
                    <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="Bancolombia a la mano"
                    />
                </RadioGroup>
            </AccordionDetails>
        </Accordion>
    );
};

PedidoMetodoPago.propTypes = {
    idMetodoPago: PropTypes.func.isRequired
};

export { PedidoMetodoPago }