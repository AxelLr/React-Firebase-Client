import React,{Fragment, useState} from 'react'
import { deletePost } from '../redux/actions/dataActions'
import { connect } from 'react-redux'

//UI
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeleteButton (props) {

const [open, setOpen] = useState(false);

const handleOpen = () => {
    setOpen(true);
}

const handleClose = () => {
    setOpen(false);
}

const deleteThisPost = (e) => {
 e.preventDefault();
 props.deletePost(props.postid);

 handleClose();
}

    return (
        <Fragment>
            <Tooltip title="Borrar Post" placement="bottom">
                <IconButton onClick={handleOpen}> 
                    <DeleteIcon color="secondary" />
                </IconButton> 
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle> Estás seguro de que quieres borrar este post ?  </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancelar
                    </Button>
                    <Button onClick={deleteThisPost} color="primary">
                     Borrar
                    </Button>
                </DialogActions>

            </Dialog>
        
        </Fragment>
    )
}

export default connect(null, { deletePost })(DeleteButton);