import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, IconButton, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { ChangeEvent , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { newPointAction } from '../../utils/redux/newPointSlice';
import { getPoints } from '../../utils/redux/pointsSlice';
import { AppDispatch } from '../../utils/redux/store';
import CloseIcon from '@mui/icons-material/Close';


interface IModalInf {
    open: boolean;
    handleClose: () => void;
    coord: {
        lng: string,
        lat: string

    }
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
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

const ModalForm = (props: IModalInf) => {

    const [newPoint, setNewPoint] = useState({
        title: '',
        description: '',
        image: '',
        idUser: '',
        type: ''
    })


    const [ loading, setLoading] = useState(false)

    const dispatch = useDispatch<AppDispatch>();
    const auth: any = useSelector((state : any) => state.auth)
   
    const onLoad = (fileString: any) => {
      const base64code = fileString
      setNewPoint({...newPoint, image: base64code});

    };
    const getBase64 = (file: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          onLoad(reader.result);
        };
      };
    
    const handleSubmit = async (e: any) => {

        setLoading(true)
        if(!newPoint.description || !newPoint.title || !newPoint.title || !newPoint.type || !newPoint.image){
            setLoading(false)

            return toast.error('Todos os campos devem ser preenchidos', {
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
        const point = { 
            ...newPoint, 
            token: auth.user.token,
            coord: props.coord,
            idUser: auth.user._id
        }
        const result = await dispatch(newPointAction(point));
        if(result.type === "newPoint/fulfilled"){
          dispatch(getPoints());
          setNewPoint({
            title: '',
            description: '',
            image: '',
            idUser: '',
            type: ''
        });
          props.handleClose();
          setLoading(false)
          return toast.success('Ponto registrado com sucesso', {
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

        setLoading(false)
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
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5 

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
                                onChange={(e)=> setNewPoint({...newPoint, type: e.target.value})}
                            >
                                <FormControlLabel value="acessivel" control={<Radio />} label="Local com Acessibilidade"/>
                                <FormControlLabel value="nao_acessivel" control={<Radio />} label="Local sem Acessibilidade" />
        

                            </RadioGroup>
                            <TextField 
                                fullWidth 
                                label="Título" 
                                id="titulo" 
                                margin={'dense'} 
                                onChange={(e)=> setNewPoint({...newPoint, title: e.target.value})}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Descrição"
                                fullWidth
                                multiline
                                rows={6}
                                margin={'dense'}
                                onChange={(e)=> setNewPoint({...newPoint, description: e.target.value})}
                            />
                            <IconButton color="primary" aria-label="upload picture" component="label" >
                                <input hidden accept="image/*" type="file" 
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        if (!event.target.files) return
                                        getBase64(event.target.files[0])

                                    }}
                                />
                                 {newPoint.image ? 'Ok' : 'Buscar Imagem'}
                                <PhotoCamera style={{marginLeft: 20}}/>
                            </IconButton>
                            <Button variant="contained" onClick={handleSubmit}>Enviar</Button>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </div>
    );

}

export default ModalForm