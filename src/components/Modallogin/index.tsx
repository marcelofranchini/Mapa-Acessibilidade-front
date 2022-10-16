import { Box, Button, Card, CardActionArea, FormControl, Modal, TextField  } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../utils/redux/authSlice';
import { AppDispatch } from '../../utils/redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';


interface IModalInf {
    open: boolean;
    handleClose: () => void;
    handleCloseAuth: () => void;

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
const dispatch = useDispatch<AppDispatch>();
const auth: any = useSelector((state : any) => state.auth)

const [user, setUser] = useState({
    email: '',
    password: ''
})


const handleSubmit = async (e: any) =>{
    const result = await dispatch(authAction(user));
    if(result.type === "auth/fulfilled"){
      props.handleCloseAuth();
      return toast.success('Usuário logado com sucesso', {
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
    return toast.error('Usuário ou senha incorretos!', {
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
            <ToastContainer />
            <Modal
                open={props.open}
                onClose={props.handleCloseAuth}
                aria-labelledby="Modal Form"
                aria-describedby="Modal Form"
            >
                <Box sx={style}>
                    <Card sx={{ minWidth: 345 ,borderRadius: 5 }}>
                        <CardActionArea>
                            <CloseIcon onClick={props.handleCloseAuth} 
                             style={{
                                paddingLeft: 20,
                                paddingTop: 20, 
                                display: 'flex',
                                flexDirection: 'column',
                                
                            }}/>
                            <FormControl 
                            style={{
                                minWidth: 345, paddingLeft: 20, paddingBottom: 20, paddingRight: 20,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            >
                                <form action=""></form>
                                <h3> Login</h3>
                                <TextField
                                    id="standard-user-input"
                                    label="Usuário"
                                    type="user"
                                    autoComplete="current-user"
                                    variant="standard"
                                    margin={'dense'}
                                    fullWidth
                                    onChange={(e)=> setUser({...user, email: e.target.value})}

                                />
                                <TextField
                                    id="standard-password-input"
                                    label="Senha"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="standard"
                                    margin={'dense'}
                                    fullWidth
                                    onChange={(e)=> setUser({...user, password: e.target.value})}
                                />

                                <Button 
                                variant="contained"
                                onClick={handleSubmit}
                                type="submit"
                                fullWidth 
                                style={{ marginTop: 20 }}>
                                    Entrar
                                </Button>

                                <Button 
                                onClick={props.handleClose}
                                variant="contained"
                                fullWidth 
                                style={{ marginTop: 32 }}>
                                    Cadastre-se
                                </Button>
                            </FormControl>
                        </CardActionArea>
                    </Card>
                </Box>

            </Modal>
        </div >
    );

}

export default ModalLogin