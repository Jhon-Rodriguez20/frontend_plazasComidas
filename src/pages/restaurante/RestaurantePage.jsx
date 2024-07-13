import { RestauranteLista } from "../../components/restaurante/RestauranteLista";
import { Footer } from "../../layouts/footer/Footer";
import { obtenerRestaurantes } from "../../services/restaurante/restauranteServicio";

function RestaurantePage() {
    return (
        <>
            <RestauranteLista
                obtenerRestaurantes={obtenerRestaurantes}
                mostrarPropiedad={false}
                extraBottomSpacing={8}
                mensaje="No se encontraron restaurantes"
            />
            <Footer />
        </>
    );
}

export { RestaurantePage }