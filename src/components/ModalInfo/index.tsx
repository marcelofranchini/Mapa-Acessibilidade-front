import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Modal, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';
import acessibilidade from '../../utils/images/acessibilidade.jpeg'



interface IModalInf {
  open: boolean;
  handleClose: () => void;
  infos: any
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
 
};


const ModalInfo = (props: IModalInf) => {
  const info = props.infos
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="Modal Form"
        aria-describedby="Modal Form"
      >
        <Box sx={style}>
          <Card sx={{ minWidth: 400, minHeight: '100%', borderRadius: 5 }}>
            <CardActionArea>
              <CloseIcon onClick={props.handleClose}
               style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
            }}
              />
              <CardMedia
                component="img"
                height="180"
                image= {info?.image || acessibilidade }
                alt="imagem descricao"
                

              />
              <CardContent style={{ maxWidth: 400}}>
                <Typography gutterBottom variant="h5" component="div" marginTop={2} style={{ wordWrap: "break-word" }}  >
                  {`${info?.title}` || 'erro'}
                </Typography>
                <Divider/>

                <Typography gutterBottom variant="h6" component="div" marginTop={2} >
                {`${info?.type === 'acessivel' ? 'Local Acessível': 'Local Não Acessível'}` || 'erro'}
                </Typography>
                <Divider/>

                <Typography variant="body2" color="text.secondary" marginTop={2} marginBottom={4}
                  style={{ wordWrap: "break-word" }}>
                {`${info?.description}` || 'erro'}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Modal>
    </div>
  );

}

export default ModalInfo