import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { FileDrop } from 'react-file-drop';
import useAlertas from '../alertas/tipoAlertas';

function CargarImagenWebp({ imagenSeleccionada, mostrarCuadro }) {
    const { mostrarAlertaAdvertencia, mostrarAlertaError } = useAlertas();

    const convertirAWebp = (file) => {
        return new Promise((resolver, rechazar) => {
            const lectorImagenes = new FileReader();
            lectorImagenes.onload = (event) => {
                const imagen = new Image();
                imagen.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = imagen.width;
                    canvas.height = imagen.height;
                    ctx.drawImage(imagen, 0, 0);
                    canvas.toBlob(
                        (blob) => {
                            const webpFile = new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
                                type: 'image/webp',
                            });
                            resolver(webpFile);
                        },
                        'image/webp',
                        0.8
                    );
                };
                imagen.src = event.target.result;
            };
            lectorImagenes.onerror = rechazar;
            lectorImagenes.readAsDataURL(file);
        });
    };

    const handleArrastrarImagen = useCallback(async (files) => {
        const imagen = files[0];

        if (imagen) {
            const validarMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validarMimeTypes.includes(imagen.type)) {
                mostrarAlertaAdvertencia("Tipo de archivo no válido. Por favor, sube una imagen (jpeg, png o gif).");
                return;
            }

            try {
                const imagenWebp = await convertirAWebp(imagen);
                imagenSeleccionada(imagenWebp, URL.createObjectURL(imagenWebp));
            } catch (error) {
                mostrarAlertaError("Ocurrió un error al convertir la imagen.");
            }
        }
    }, [imagenSeleccionada, mostrarAlertaAdvertencia, mostrarAlertaError]);

    return (
        <Box sx={{ display: mostrarCuadro ? 'block' : 'none' }}>
            <FileDrop onDrop={handleArrastrarImagen} onTargetClick={() => document.getElementById("formImagen").click()}>
                <input id="formImagen" type="file" style={{ display: 'none' }} onChange={(e) => handleArrastrarImagen(e.target.files)} accept="image/jpeg, image/png, image/gif" />
                <Box sx={{ border: '2px dashed gray', padding: 5, textAlign: 'center', cursor: 'pointer' }}>
                    <Typography variant="body1" color="GrayText">Arrastra y suelta una imagen aquí, o haz clic para seleccionar una</Typography>
                </Box>
            </FileDrop>
        </Box>
    );
}

CargarImagenWebp.propTypes = {
    imagenSeleccionada: PropTypes.func.isRequired,
    mostrarCuadro: PropTypes.bool.isRequired
};

export { CargarImagenWebp }