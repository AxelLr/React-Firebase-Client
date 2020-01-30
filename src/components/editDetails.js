import React,{ Fragment, useState, useEffect } from 'react';
//REDUX
import { connect } from 'react-redux'
import { editUserDetails } from '../redux/actions/userActions'
// MUI 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// Icons
import EditIcon from '@material-ui/icons/Edit';


function EditDetails(props) {

const initialState = {
        bio: '',
        location: ''
    }

const [values, setValues] = useState(initialState);
const [open, setOpen] = useState(false);

    useEffect(() => {
        const { credentials } = props.user;

        setValues({
            ...values,
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : ''
        })
    }, [])
    
const handleSubmit = (e) => {
    e.preventDefault();
 props.editUserDetails(values);
}

const handleOpen = () => {
    setOpen(true);
}

const handleClose = () => {
    setOpen(false);
    setValues(initialState);
}

const handleChange = (e) => {
    
    setValues( {
        ...values,
        [e.target.name]: e.target.value
    })
}

    return (
    <Fragment>
        <Tooltip title="Editar Perfil" placement="bottom">
            <IconButton onClick={handleOpen}> 
                <EditIcon color="primary" />
            </IconButton> 
        </Tooltip>  
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Editar Detalles </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                tpye="text"
                label="Bio"
                multiline
                rows="4"
                placeholder="Cuéntanos algo sobre ti"
                value={values.bio}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                style={{marginTop: 20}}
                name="location"
                tpye="text"
                label="Location"
                placeholder="De donde sos"
                value={values.location}
                onChange={handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Guardar cambios
            </Button>
          </DialogActions>
        </Dialog>
    </Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = { editUserDetails };

export default connect(mapStateToProps,mapActionsToProps)(EditDetails);