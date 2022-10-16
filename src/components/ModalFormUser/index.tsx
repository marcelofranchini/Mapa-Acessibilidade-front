import { Box, Button, FormControl, Modal, TextField} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createUserAction } from '../../utils/redux/newUserSlice';
import { AppDispatch } from '../../utils/redux/store';
import CloseIcon from '@mui/icons-material/Close';

interface IModalFormUser {
    open: boolean;
    handleClose: () => void;
    handleCloseFormUser: () => void;

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
    borderRadius: 5 
};

const ModalFormUser = (props: IModalFormUser) => {
    const dispatch = useDispatch<AppDispatch>();
    const auth: any = useSelector((state : any) => state.newUser)
    const [user, setUser] = useState({
        email: '',
        password: '',
        cpf: '',
	    name:''
    })

    const handleSubmit = async (e: any) =>{
        const result = await dispatch(createUserAction(user));
        if(result.type === "newUser/fulfilled"){
          props.handleCloseFormUser();
          return toast.success('Usuário cadastrado com sucesso', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
    
                });
                    
        }
        return toast.error(result.payload || 'Erro ao criar usuário, tentar novamente', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    
    }
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="Modal Form"
                aria-describedby="Modal Form"
            >
                <Box sx={style}>
                <CloseIcon onClick={props.handleClose}/>

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
                            <TextField 
                                fullWidth 
                                label="Nome" 
                                id="name" 
                                margin={'dense'} 
                                onChange={(e)=> setUser({...user, name: e.target.value})}

                                />
                            <TextField 
                                fullWidth 
                                label="E-mail" 
                                id="e-mail" 
                                margin={'dense'} 
                                onChange={(e)=> setUser({...user, email: e.target.value})}

                                />
                            <TextField 
                                fullWidth 
                                label="Senha" 
                                id="password" 
                                margin={'dense'} 
                                onChange={(e)=> setUser({...user, password: e.target.value})}
                                />
                            <TextField 
                                fullWidth 
                                label="CPF" 
                                id="cpf" 
                                margin={'dense'} 
                                onChange={(e)=> setUser({...user, cpf: e.target.value})}
                                inputProps={{
                                    maxLength: 11,
                                  }}
                            />

                                <Button fullWidth 
                                onClick={handleSubmit}
                                style={{ marginTop: 20 }} 
                                variant="contained">
                                    Cadastrar
                                </Button>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </div>
    );

}

export default ModalFormUser