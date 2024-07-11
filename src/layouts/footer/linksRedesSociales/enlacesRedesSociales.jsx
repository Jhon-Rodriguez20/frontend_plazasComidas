import { IconButton } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, GitHub } from '@mui/icons-material';

const enlacesRedesSociales = [
    { href: "#", icono: <Facebook sx={{ color: '#C56B22' }} /> },
    { href: "#", icono: <Twitter sx={{ color: '#C56B22' }} /> },
    { href: "#", icono: <Google sx={{ color: '#C56B22' }} /> },
    { href: "#", icono: <Instagram sx={{ color: '#C56B22' }} /> },
    { href: "#", icono: <LinkedIn sx={{ color: '#C56B22' }} /> },
    { href: "#", icono: <GitHub sx={{ color: '#C56B22' }} /> },
];

const IconosRedesSociales = () => (
    <>
        {enlacesRedesSociales.map((link, index) => (
            <IconButton key={index} href={link.href} color="inherit">
                {link.icono}
            </IconButton>
        ))}
    </>
);

export default IconosRedesSociales;