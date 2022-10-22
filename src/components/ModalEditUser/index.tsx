import { Box, Button, FormControl, Modal, TextField} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../utils/redux/store';
import CloseIcon from '@mui/icons-material/Close';
import ModalDeleteUser from '../ModalConfirmationDeleteUser';
import { userEdit } from '../../utils/redux/userEditSlice';
import { getUser } from '../../utils/redux/userByIdSlice';
import { toast } from 'react-toastify';



interface IModalEditUser {
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

const ModalEditUser = (props: IModalEditUser) => {
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const userAuth: any = useSelector((state : any) => state?.auth?.user)
    const userRedux: any = useSelector((state : any) => state?.getUser.user)
    const [user, setUser] = useState({})

    const handleSubmit = async (e: any) =>{
        const data = {token: userAuth?.token, userId: userAuth?._id , user }
        console.log(data, 'dfsdfsdfds')
        const result = await dispatch(userEdit(data));
        await dispatch(getUser(data));
        if(result.type === "userEdit/fulfilled"){
          props.handleCloseFormUser();
          setUser({})
          return toast.success('Usuário editado com sucesso', {
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
            <ModalDeleteUser open={openModal} handleClose={()=> setOpenModal(false)} />
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
                            Editar Dados
                        </h3>
                        <FormControl style={{
                            minWidth: 345, padding: 20, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TextField 
                                fullWidth 
                                label={userRedux?.name}
                                id="name" 
                                margin={'dense'} 
                                onChange={(e)=> setUser({...user, name: e.target.value})}

                                />
                            <TextField 
                                fullWidth 
                                label={userRedux?.email}
                                id="e-mail" 
                                margin={'dense'} 
                                onChange={(e)=> setUser({...user, email: e.target.value})}

                                />
                        
                            <TextField 
                                fullWidth 
                                label={userRedux?.cpf}
                                id="cpf" 
                                margin={'dense'} 
                                onChange={(e)=> setUser({...user, cpf: e.target.value})}
                                inputProps={{
                                    maxLength: 11,
                                  }}
                            />
                            <TextField 
                                fullWidth 
                                label="Senha: *****" 
                                id="password" 
                                margin={'dense'} 
                                onChange={(e)=> setUser({...user, password: e.target.value})}
                            />
                                <Button fullWidth 
                                onClick={handleSubmit}
                                style={{ marginTop: 20 }} 
                                variant="contained">
                                   Alterar
                                </Button>

                                <Button fullWidth 
                                onClick={()=> setOpenModal(true)}
                                style={{ marginTop: 20 }} 
                                variant="contained">
                                   Excluir Conta
                                </Button>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </div>
    );

}

export default ModalEditUser

