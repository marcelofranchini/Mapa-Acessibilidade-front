import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React from 'react';

interface IModalInf {
    open: boolean;
    handleClose: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    boxShadow: 24,
    p: 4,
};

const ModalForm = (props: IModalInf) => {
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="Modal Form"
                aria-describedby="Modal Form"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <h3>
                            Registro
                        </h3>
                        <FormControl>
                            <FormLabel id="radio-group-label">Tipo</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="radio-group-type"
                                name="radio-group-type"
                            >
                                <FormControlLabel value="Calçada" control={<Radio />} label="Calçada" />
                                <FormControlLabel value="Via" control={<Radio />} label="Via" />
                                <FormControlLabel value="" control={<Radio />} label="Outro" />
                                <FormControlLabel value="Outro" control={<Radio />} label="Outro" />

                            </RadioGroup>
                            <TextField fullWidth label="Título" id="titulo" margin={'dense'} />
                            <TextField
                                id="outlined-multiline-static"
                                label="Descrição"
                                fullWidth
                                multiline
                                rows={6}
                                margin={'dense'}
                            />
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" />
                                <PhotoCamera />
                            </IconButton>
                            <Button variant="contained">Enviar</Button>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </div>
    );

}

export default ModalForm