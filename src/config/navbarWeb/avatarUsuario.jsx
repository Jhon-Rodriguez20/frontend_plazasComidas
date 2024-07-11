import { Avatar } from '@mui/material';
import { UsuarioIniciales } from '../../middleware/ValidarUsuarioConectado';

const AvatarUsuario = () => (
    <Avatar sx={{ bgcolor: '#FFA726', color: '#FFF' }}>
        <UsuarioIniciales />
    </Avatar>
);

export default AvatarUsuario;