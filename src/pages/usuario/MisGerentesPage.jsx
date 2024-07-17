import { obtenerMisGerentes } from "../../services/usuario/usuarioServicio";
import { UsuarioLista } from "../../components/usuario/UsuarioLista";
import { IconoNoEncontrado } from "../../components/static/icon/IconoNoEncontrado";

function MisGerentesPage() {
    return (
        <UsuarioLista 
            obtenerUsuarios={obtenerMisGerentes}
            icono={<IconoNoEncontrado ancho={100} alto={100} />}
            mensaje="No se encontraron gerentes"
        />
    );
}

export { MisGerentesPage }