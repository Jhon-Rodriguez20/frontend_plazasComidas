import { RestauranteLista } from "../../components/restaurante/RestauranteLista";
import { Footer } from "../../layouts/footer/Footer";

function PedidosRestaurantePage() {
    return (
        <>
            <RestauranteLista mostrarPropiedad={true} extraBottomSpacing={8} />
            <Footer />
        </>
    );
}

export { PedidosRestaurantePage }