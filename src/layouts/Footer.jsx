import { Container, Grid, Box, Typography, IconButton, Link } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, GitHub, Home, Email, Phone, Print } from '@mui/icons-material';
import logo from "../assets/img/PlazaDelicias.webp";

function Footer() {
    return (
        <Box sx={{ borderTop: 1, borderTopColor: '#FFA726', backgroundColor: '#fff', color: 'text.secondary', mt: 5, mb: 7 }}>
            <Box sx={{ borderBottom: 1, borderColor: '#FFA726', py: 2 }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" mt={1} sx={{ display: { xs: 'none', lg: 'block' } }}>
                        Contáctanos por nuestras Redes Sociales:
                    </Typography>
                    <Box>
                        <IconButton href="#" color="inherit">
                            <Facebook sx={{ color: '#C56B22'}} />
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <Twitter sx={{ color: '#C56B22'}}/>
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <Google sx={{ color: '#C56B22'}}/>
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <Instagram sx={{ color: '#C56B22'}}/>
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <LinkedIn sx={{ color: '#C56B22'}}/>
                        </IconButton>
                        <IconButton href="#" color="inherit">
                            <GitHub sx={{ color: '#C56B22'}}/>
                        </IconButton>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 5 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3} lg={4}>
                        <Typography 
                            component="img" 
                            src={logo} 
                            sx={{ mt: 1, mb: 1, width: { xs: '80%', sm: 'auto' }, maxWidth: 350 }}
                            alt="Logo"
                        />
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                        <Typography variant="h6" gutterBottom sx={{color: '#C56B22'}}>Tecnologías</Typography>
                        <Typography variant="body2">
                            <Link href="https://nodejs.org/en/learn/getting-started/introduction-to-nodejs" color="inherit" underline="none" className='link-footer'>Node.js</Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link href="https://vitejs.dev/" color="inherit" underline="none" className='link-footer'>React + Vite</Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link href="https://www.mysql.com/" color="inherit" underline="none" className='link-footer'>MySQL</Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link href="https://jwt.io/" color="inherit" underline="none" className='link-footer'>JsonWebTokens</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} lg={2}>
                        <Typography variant="h6" gutterBottom sx={{color: '#C56B22'}}>Sección de links</Typography>
                        <Typography variant="body2">
                            <Link href="#" color="inherit" underline="none">Precios</Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link href="#" color="inherit" underline="none">Configuración</Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link href="#" color="inherit" underline="none">Orden</Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link href="#" color="inherit" underline="none">Ayuda</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Typography variant="h6" gutterBottom sx={{color: '#C56B22'}}>Contacto</Typography>
                        <Typography variant="body2">
                            <Home sx={{ verticalAlign: 'middle', mr: 1 }} />
                            Localización aquí
                        </Typography>
                        <Typography variant="body2">
                            <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
                            correoElectrónico@gmail.com
                        </Typography>
                        <Typography variant="body2">
                            <Phone sx={{ verticalAlign: 'middle', mr: 1 }} />
                            + 01 99 999 99
                        </Typography>
                        <Typography variant="body2">
                            <Print sx={{ verticalAlign: 'middle', mr: 1 }} />
                            + 01 888 888 888
                        </Typography>
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

export {Footer}