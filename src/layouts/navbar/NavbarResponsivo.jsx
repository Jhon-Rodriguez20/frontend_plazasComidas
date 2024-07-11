import { useMediaQuery, useTheme } from '@mui/material';
import { NavbarWeb } from '../navbar/pc/NavbarPc';
import { NavbarCelular } from '../navbar/celular/NavbarCelular';

const NavbarResponsivo = () => {
    const theme = useTheme();
    const pantallaPequena = useMediaQuery(theme.breakpoints.down('sm'));

    return pantallaPequena ? <NavbarCelular /> : <NavbarWeb />
}

export { NavbarResponsivo }