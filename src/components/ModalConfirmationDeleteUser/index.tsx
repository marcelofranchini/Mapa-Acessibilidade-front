import { Box, Button, CircularProgress, FormControl, Modal, TextField} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../utils/redux/store';
import CloseIcon from '@mui/icons-material/Close';
import { userDelete } from '../../utils/redux/userDeleteSlice';
import { authAction } from '../../utils/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../utils/redux/logoutSlice';
import storage from 'redux-persist/es/storage';

interface IModalDeleteUser {
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
    borderRadius: 5 
};

const styleLoad = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 99999,
};

const ModalDeleteUser = (props: IModalDeleteUser) => {
    const [ loading, setLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const user: any = useSelector((state : any) => state?.auth?.user)
    const navigate = useNavigate();

    const sair = async ()=>{
        storage.removeItem('persist:root')
        navigate(0)
        await dispatch(logoutAction());

    }

    const handleSubmit = async (e: any) =>{
        setLoading(true)
        const value = {token: user.token, userId: user._id }
        const result = await dispatch(userDelete(value));
        if(result.type === "userDelete/fulfilled"){
          toast.success('Usuário Deletado com sucesso', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
    
                });
            return setTimeout(async ()=>{
                setLoading(false)

                    await sair()
                }, 2000)
               

                    
        }
        setLoading(false)

        return toast.error(result.payload || 'Erro ao deletar usuário, tentar novamente', {
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
            {loading ? <CircularProgress style={styleLoad}  />  : null}

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
                            Deseja Realmente excluir sua conta?
                        </h3>
                        <Button fullWidth 
                                onClick={handleSubmit}
                                style={{ marginTop: 20 }} 
                                variant="contained">
                                   Sim
                                </Button>

                                <Button fullWidth 
                                onClick={props.handleClose}
                                style={{ marginTop: 20 }} 
                                variant="contained">
                                   Não
                                </Button>
                       
                    </Box>
                </Box>
            </Modal>
        </div>
    );

}

export default ModalDeleteUser