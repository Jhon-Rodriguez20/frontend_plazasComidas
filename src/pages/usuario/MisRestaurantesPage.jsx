import { RestauranteLista } from "../../components/restaurante/RestauranteLista";
import { obtenerMisRestaurantes } from "../../services/usuario/usuarioServicio";

function MisRestaurantesPage() {
    return (
        <>
            <RestauranteLista
                obtenerRestaurantes={obtenerMisRestaurantes}
                mostrarPropiedad={true}
                extraBottomSpacing={8}
                mensaje="No tienes restaurantes"
            />
        </>
    );
}

export { MisRestaurantesPage }