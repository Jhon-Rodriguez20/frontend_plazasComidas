import { obtenerMisEmpleados } from "../../services/usuario/usuarioServicio";
import { UsuarioLista } from "../../config/usuario/UsuarioLista";
import { VerifiedUser } from "@mui/icons-material";

function MisEmpleadosPage() {
    return (
        <UsuarioLista 
            obtenerUsuarios={obtenerMisEmpleados}
            icono={<VerifiedUser sx={{ fontSize: 60 }} color="action" />}
            mensaje="No se encontraron empleados"
        />
    );
}

export { MisEmpleadosPage }