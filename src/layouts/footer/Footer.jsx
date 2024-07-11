import { Container, Grid, Box, Typography, Link } from '@mui/material';
import logo from "../../assets/img/PlazaDelicias.webp";
import IconosRedesSociales from './linksRedesSociales/enlacesRedesSociales';
import SeccionEnlaces from './seccionEnlaces/seccionEnlaces';
import InformacionContacto from './seccionEnlaces/seccionContacto';

const tecnologiasEnlaces = [
    { href: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", texto: "Node.js" },
    { href: "https://vitejs.dev/", texto: "React + Vite" },
    { href: "https://www.mysql.com/", texto: "MySQL" },
    { href: "https://jwt.io/", texto: "JsonWebTokens" }
];

const seccionEnlaces = [
    { href: "#", texto: "Precios" },
    { href: "#", texto: "Configuración" },
    { href: "#", texto: "Orden" },
    { href: "#", texto: "Ayuda" }
];

function Footer() {
    return (
        <Box sx={{ borderTop: 1, borderTopColor: '#FFA726', backgroundColor: '#fff', color: 'text.secondary', mt: 5, mb: 7 }}>
            <Box sx={{ borderBottom: 1, borderColor: '#FFA726', py: 2 }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" mt={1} sx={{ display: { xs: 'none', lg: 'block' } }}>
                        Contáctanos por nuestras Redes Sociales:
                    </Typography>
                    <Box>
                        <IconosRedesSociales />
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={10} md={3} lg={4}>
                        <Typography 
                            component="img" 
                            src={logo} 
                            sx={{ mt: 1, mb: 1, width: { xs: '80%', sm: 'auto' }, maxWidth: 350 }}
                            alt="Logo"
                        />
                    </Grid>
                    <Grid item xs={6} sm={8} md={2} lg={2}>
                        <SeccionEnlaces titulo="Tecnologías" enlace={tecnologiasEnlaces} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3} lg={2}>
                        <SeccionEnlaces titulo="Sección de links" enlace={seccionEnlaces} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <InformacionContacto />
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ textAlign: 'center', py: 2, mt: 2, backgroundColor: '#FFA726' }}>
                <Typography variant="body2" color="white">
                    © 2024 Copyright: 
                    <Link href="#" color="white" underline="none" sx={{ fontWeight: 'bold' }}>
                        Todos los derechos
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}

export { Footer }