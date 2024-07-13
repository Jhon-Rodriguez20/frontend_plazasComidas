import { obtenerMisGerentes } from "../../services/usuario/usuarioServicio";
import { UsuarioLista } from "../../components/usuario/UsuarioLista";
import { VerifiedUser } from "@mui/icons-material";

function MisGerentesPage() {
    return (
        <UsuarioLista 
            obtenerUsuarios={obtenerMisGerentes}
            icono={<VerifiedUser sx={{ fontSize: 60 }} color="action" />}
            mensaje="No se encontraron gerentes"
        />
    );
}

export { MisGerentesPage }