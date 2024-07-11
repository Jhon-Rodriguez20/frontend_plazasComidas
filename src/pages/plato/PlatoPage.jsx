import { useDispatch } from "react-redux";
import { PlatoLista } from "../../components/plato/PlatoLista";
import { establecerIdRestaurante } from "../../store/pedidoStore";

function PlatoPage() {
    const dispatch = useDispatch();
    const dispatchAccion = (id) => dispatch(establecerIdRestaurante(id));

    return <PlatoLista dispatchAccion={dispatchAccion} mostrarAcciones={false} />
}

export { PlatoPage }