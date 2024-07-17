import { obtenerMisEmpleados } from "../../services/usuario/usuarioServicio";
import { UsuarioLista } from "../../components/usuario/UsuarioLista";
import { IconoNoEncontrado } from "../../components/static/icon/IconoNoEncontrado";

function MisEmpleadosPage() {
    return (
        <UsuarioLista 
            obtenerUsuarios={obtenerMisEmpleados}
            icono={<IconoNoEncontrado ancho={100} alto={100} />}
            mensaje="No se encontraron empleados"
        />
    );
}

export { MisEmpleadosPage }