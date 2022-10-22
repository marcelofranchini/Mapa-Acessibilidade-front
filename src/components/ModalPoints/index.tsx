import { Avatar, Box, Card, CardActionArea, CardContent, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from '@mui/material';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { AppDispatch } from '../../utils/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePoints } from '../../utils/redux/pointsDeleteSlice';
import { getPoints } from '../../utils/redux/pointsSlice';

interface IModalPoints {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: 400,
  overflowY: 'scroll',
  borderRadius: 5
};

const ModalPoints = (props: IModalPoints) => {
    const dispatch = useDispatch<AppDispatch>();
    const points: any = useSelector((state : any) => state.points.list)
    const user: any = useSelector((state : any) => state.auth.user)

    const pointsUser = points.filter((point: any) => point.idUser === user?._id)

    const handleDelete = async (id: string) => {
        const value = {token: user.token, pointId: id }
        await dispatch(deletePoints(value))
        await dispatch(getPoints())

    }
    
    React.useEffect(()=>{

    }, [dispatch])
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
              <CardContent style={{ maxWidth: 400}}>
                {pointsUser.map((point: any)=>{
                    return(
                     <List dense={true}>
                     <ListItem
                       secondaryAction={
                         <>
                            <IconButton edge="end" type='submit' aria-label="delete" onClick={()=> handleDelete(point._id)}>
                                <DeleteIcon />
                            </IconButton>
                         </>
                       }
                     >
                       <ListItemAvatar>
                         <Avatar>
                           <FolderIcon />
                         </Avatar>
                       </ListItemAvatar>
                       <ListItemText
                         primary={point.title}
                         secondary={point.description}
                       />
                     </ListItem>,
                 </List> 
                    )

                })}
                {pointsUser.length < 1 ? <h1>Nenhum Registro </h1>: null}
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Modal>
    </div>
  );

}

export default ModalPoints;