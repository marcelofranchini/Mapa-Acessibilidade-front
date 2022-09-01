import { Box, Button, FormControl, Modal, TextField} from '@mui/material';
import React from 'react';

interface IModalFormUser {
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

const ModalFormUser = (props: IModalFormUser) => {
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
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <h3>
                            Cadastre-se
                        </h3>
                        <FormControl style={{
                            minWidth: 345, padding: 20, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TextField fullWidth label="Nome" id="name" margin={'dense'} />
                            <TextField fullWidth label="E-mail" id="e-mail" margin={'dense'} />
                            <TextField fullWidth label="Senha" id="password" margin={'dense'} />
                            <Button fullWidth  style={{ marginTop: 20 }} variant="contained">Cadastrar</Button>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </div>
    );

}

export default ModalFormUser