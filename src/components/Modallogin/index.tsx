import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, FormControl, FormControlLabel, FormLabel, IconButton, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
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
    width: 800,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
};

const ModalLogin = (props: IModalInf) => {
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="Modal Form"
                aria-describedby="Modal Form"
            >
                <Box sx={style}>
                    <Card sx={{ minWidth: 345 }}>
                        <CardActionArea>
                            <FormControl style={{
                                minWidth: 345, padding: 20, display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <h3> Login</h3>
                                <TextField
                                    id="standard-user-input"
                                    label="Usuário"
                                    type="user"
                                    autoComplete="current-user"
                                    variant="standard"
                                    margin={'dense'}
                                    fullWidth
                                />
                                <TextField
                                    id="standard-password-input"
                                    label="Senha"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="standard"
                                    margin={'dense'}
                                    fullWidth
                                />

                                <Button variant="contained" fullWidth style={{ marginTop: 20 }}>Entrar</Button>
                            </FormControl>
                        </CardActionArea>
                    </Card>
                </Box>
            </Modal>
        </div >
    );

}

export default ModalLogin