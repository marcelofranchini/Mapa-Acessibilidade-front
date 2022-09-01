import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Modal, Typography } from '@mui/material';
import React from 'react';
import Img from './images.jpeg'

interface IModalInf {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
 
};

const ModalInfo = (props: IModalInf) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="Modal Form"
        aria-describedby="Modal Form"
      >
        <Box sx={style}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image= {Img}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Calcada na rua x
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Reclamacão
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Calcada na rua X sem condições de locomoção. Consideracoes
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