import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, IconButton, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { ChangeEvent , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPoints } from '../../utils/redux/pointsSlice';
import { AppDispatch } from '../../utils/redux/store';
import CloseIcon from '@mui/icons-material/Close';
import imageCompression from 'browser-image-compression';
import { editPoints } from '../../utils/redux/pointsEditSlice';



interface IModalInf {
    open: boolean;
    handleClose: () => void;
    pointId: any
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

const ModalEditForm = (props: IModalInf) => {
    const [ loading, setLoading] = useState(false)
    const [point, setPoint] = useState<any>();
    const dispatch = useDispatch<AppDispatch>();
    const user: any = useSelector((state : any) => state?.auth?.user)
    
    async function handleImageUpload(file: any) {
        const options = {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 380,
          useWebWorker: true
        }
        try {
          const compressedFile = await imageCompression(file, options);
          await getBase64(compressedFile); 
        } catch (error) {
          console.log(error);
        }
      }
    const onLoad = (fileString: any) => {
      const base64code = fileString
      setPoint({...point, image: base64code});

    };
    const getBase64 = (file: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          onLoad(reader.result);
        };
      };
    
    const handleSubmit = async (value: any) => {
        setLoading(true)
        const data = {token: user.token, pointId: props?.pointId , point }
        const result = await dispatch(editPoints(data))
        if(result.type === "editPoints/fulfilled"){
          await dispatch(getPoints());
          setPoint({});
          props.handleClose();
          setLoading(false)
          return toast.success('Ponto editado com sucesso', {
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
        return toast.error(result.payload || 'Erro ao editar ponto, tentar novamente', {
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
                           Editar Registro
                        </h3>
                        <FormControl>
                            <FormLabel id="radio-group-label">Tipo</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="radio-group-type"
                                name="radio-group-type"
                                onChange={(e)=> setPoint({...point, type: e.target.value})}
                            >
                                <FormControlLabel value="acessivel" control={<Radio />} label="Local com Acessibilidade"/>
                                <FormControlLabel value="nao_acessivel" control={<Radio />} label="Local sem Acessibilidade" />
        

                            </RadioGroup>
                            <TextField 
                                fullWidth 
                                label="Título" 
                                id="titulo" 
                                margin={'dense'} 
                                onChange={(e)=> setPoint({...point, title: e.target.value})}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Descrição"
                                fullWidth
                                multiline
                                rows={6}
                                margin={'dense'}
                                onChange={(e)=> setPoint({...point, description: e.target.value})}
                            />
                            <IconButton color="primary" aria-label="upload picture" component="label" >
                                <input hidden accept="image/*" type="file" 
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        if (!event.target.files) return
                                        handleImageUpload(event.target.files[0]? event.target.files[0] : null )

                                    }}
                                />
                                 {point?.image ? 'Ok' : 'Buscar Imagem'}
                                <PhotoCamera style={{marginLeft: 20}}/>
                            </IconButton>
                            <Button variant="contained" onClick={handleSubmit}>Editar</Button>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </div>
    );

}

export default ModalEditForm