import { CrearUsuarioForm } from "../../components/auth/CrearUsuarioForm";
import { Container, Box, Typography } from "@mui/material";
import { BackDropProgreso } from "../../components/common/loading/BackDropProgreso";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, EDITARDESCRIPCION_PUT_ENDPOINT, USUARIO_INFORMACION_PERFIL_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import axios from "axios";
import useAlertas from "../../components/common/alertas/tipoAlertas";

function EditarInformacionPerfilPage() {
    const { id } = useParams();
    const navegar = useNavigate();
    const [errores, setErrores] = useState({});
    const [usuarioInfoPerfil, setUsuarioInfoPerfil] = useState(null);
    const [imagenPrevia, setImagenPrevia] = useState("");
    const [cargando, setCargando] = useState(false);
    const { mostrarAlertaError, mostrarAlertaExito } = useAlertas();

    useEffect(() => {
        axios.get(`${USUARIO_INFORMACION_PERFIL_GET_ENDPOINT}/${id}`)
            .then(respuesta => {
                const usuario = respuesta.data.usuarioEntity;
                setUsuarioInfoPerfil(usuario);
                setImagenPrevia(`${API_URL}${usuario.imgPerfil}`);
            })
            .catch(() => {});
    }, [id, mostrarAlertaError]);

    const editarPerfilUsuario = async ({ celular, imagenPerfil }) => {
        const error = {};
        setErrores(error);
        setCargando(true);

        const campos = new FormData();
        campos.append('celular', celular);
        if (imagenPerfil && imagenPerfil instanceof File) {
            campos.append('imagenPerfil', imagenPerfil);
        }

        axios.put(`${EDITARDESCRIPCION_PUT_ENDPOINT}/${usuarioInfoPerfil.idUsuario}`, campos, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                setCargando(false);
                navegar("/");
                mostrarAlertaExito("Información de perfil actualizada exitosamente.");
            })
            .catch((error) => {
                setCargando(false);
                const mensajeError = error.response?.data?.error || "Ocurrió un error al editar la información del perfil.";
                mostrarAlertaError(mensajeError);
            });
    };

    return (
        <Container 
            maxWidth="sm"
            sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '70vh',
                mb: 8
            }}
        >
            <BackDropProgreso abrir={cargando} />
            <Box 
                sx={{
                    width: '95%',
                    maxWidth: '100%',
                    padding: 3
                }}
            >
                {usuarioInfoPerfil && (
                    <>
                        <Typography variant="h4" color="text.secondary" mb={3} align="center" gutterBottom>
                            {usuarioInfoPerfil.nombre}
                        </Typography>
                        <CrearUsuarioForm
                            errores={errores}
                            uCelular={usuarioInfoPerfil.celular}
                            uImagenPerfil={usuarioInfoPerfil.imgPerfil ? `${API_URL}${usuarioInfoPerfil.imgPerfil}` : ""}
                            callback={editarPerfilUsuario}
                            mostrarChips={false}
                            editar={true}
                            imagenPrevia={imagenPrevia}
                        />
                    </>
                )}
            </Box>
        </Container>
    );
}

export { EditarInformacionPerfilPage };