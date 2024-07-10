import { Card, CardContent, Avatar, Typography, Box, Button, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { API_URL } from "../../connections/helpers/endpoints";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import {Phone, Email} from '@mui/icons-material';

const ProfileAvatar = styled(Avatar)({
    width: 130,
    height: 130,
    border: '5px solid white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: -9
});

function UsuarioPerfilCard({ usuarioEntity }) {
    const conectado = useSelector((estado) => estado.usuario.conectado);
    const usuario = useSelector((estado) => estado.usuario.usuario);
    const imagenUrl = `${API_URL}${usuarioEntity.imgPerfil}`;

    const colorAleatorio = useMemo(() => {
        const colores = ['#FFA726', '#C56B22', '#674426'];
        const indiceAleatorio = Math.floor(Math.random() * colores.length);
        return colores[indiceAleatorio];
    }, []);

    return (
        <Card
            className="tarjeta-estilo"
            sx={{
                minHeight: 280,
                borderRadius: 5,
                boxShadow: 2,
                marginTop: 3,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <CardMedia
                component="div"
                height="170"
                sx={{ backgroundColor: colorAleatorio, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100%', m: 6 }}>
                    <ProfileAvatar src={imagenUrl} alt={usuarioEntity.nombre} />
                </Box>
            </CardMedia>
            <CardContent>
                <Typography variant="h5" fontWeight='bold' sx={{ textAlign: 'center' }}>
                    {usuarioEntity.nombre}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {usuarioEntity.ocupacion}
                </Typography>
                <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                    <Phone sx={{ mr: 1, color: '#c2c2c2' }} />
                    <Typography variant="body1" color="text.secondary">
                        {usuarioEntity.celular}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                    <Email sx={{ mr: 1, color: '#c2c2c2' }} />
                    <Typography variant="body1" color="text.secondary">
                        {usuarioEntity.email}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', mt: 3 }}>
                    {usuarioEntity.descripcionTrabajo}
                </Typography>
                {conectado && usuario.rol === "1" ? (
                    <Box mt={3} display="flex" justifyContent="center">
                        <Button
                            className="estilo-button"
                            sx={{border: '1px solid', borderColor: '#FEA93C', color: '#FEA93C', textTransform: 'uppercase', fontWeight: 'bold'}}
                            size='medium'
                            component={Link}
                            to={`/crear/restaurante/${usuarioEntity.idUsuario}`}
                        >
                            Crear un restaurante
                        </Button>
                    </Box>
                ) : ""}                
            </CardContent>
        </Card>
    );
}

UsuarioPerfilCard.propTypes = {
    usuarioEntity: PropTypes.shape({
        nombre: PropTypes.string,
        ocupacion: PropTypes.string,
        celular: PropTypes.string,
        email: PropTypes.string,
        descripcionTrabajo: PropTypes.string,
        imgPerfil: PropTypes.string,
        idUsuario: PropTypes.string
    }).isRequired,
}

export { UsuarioPerfilCard }
