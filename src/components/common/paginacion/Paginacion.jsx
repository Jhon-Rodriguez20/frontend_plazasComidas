import { Pagination } from "@mui/material";
import PropTypes from "prop-types";

const Paginacion = ({ page, totalPages, onPageChange }) => {
    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => onPageChange(value)}
            color="warning"
            variant="outlined"
            sx={{ mt: 3 }}
        />
    );
};

Paginacion.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export { Paginacion }