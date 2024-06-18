import { Card, CardContent, CardMedia, Avatar, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { API_URL } from "../../connections/helpers/endpoints";
import PropTypes from "prop-types";
import avatar2 from "../../assets/img/avatar1.jpg";
import { Link } from 'react-router-dom';

const ProfileAvatar = styled(Avatar)({
    width: 100,
    height: 100,
    border: '5px solid white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '-50px'
});

function UsuarioPerfilCard({ usuarioEntity }) {

    const imagenUrl = `${API_URL}${usuarioEntity.imgPerfil}`;

    return (
        <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3, marginTop: 3 }}>
            <CardMedia
                component="img"
                height="170"
                image={avatar2}
                alt="Usuario fondo"
            />
            <Box display="flex" justifyContent="center">
                <ProfileAvatar src={imagenUrl} alt={usuarioEntity.nombre} />
            </Box>
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5" fontWeight='bold'>
                    {usuarioEntity.nombre}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {usuarioEntity.ocupacion}
                </Typography>
                <Box mt={3} display="flex" justifyContent="center">
                    <Button variant='contained' size='medium' component={Link} to="/">
                        Crear un restaurante
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

UsuarioPerfilCard.propTypes = {
    usuarioEntity: PropTypes.shape({
        nombre: PropTypes.string,
        ocupacion: PropTypes.string,
        imgPerfil: PropTypes.string,
    }).isRequired,
}

export {UsuarioPerfilCard}