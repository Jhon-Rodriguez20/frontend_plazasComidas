import { RestauranteLista } from "../../components/restaurante/RestauranteLista";
import { obtenerRestaurantes } from "../../services/restaurante/restauranteServicio"

function PedidosRestaurantePage() {
    return (
        <>
            <RestauranteLista
                obtenerRestaurantes={obtenerRestaurantes}
                mostrarPropiedad={true}
                extraBottomSpacing={8}
                mensaje="No se encontraron los pedidos de los restaurantes"
            />
        </>
    );
}

export { PedidosRestaurantePage }