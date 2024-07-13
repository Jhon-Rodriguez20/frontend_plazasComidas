import { Pagination } from "@mui/material";
import PropTypes from "prop-types";

const Paginacion = ({ page, totalPages, onPageChange }) => {
    const handlePageChange = (event, value) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        onPageChange(value);
    };

    return (
        <Pagination
            size="large"
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="warning"
            variant="outlined"
            sx={{ mt: 3 }}
        />
    );
}

Paginacion.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export { Paginacion }