import { RestauranteLista } from "../../components/restaurante/RestauranteLista";
import { Footer } from "../../layouts/footer/Footer";

function RestaurantePage() {
    return (
        <>
            <RestauranteLista mostrarPropiedad={false} extraBottomSpacing={8} />
            <Footer />
        </>
    );
}

export { RestaurantePage }