import React, {Fragment, useState, useEffect } from 'react'

// MATERIAL UI
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton'
import ToolTip from '@material-ui/core/Tooltip'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// REDUX
import { connect } from 'react-redux'
import { newPost } from '../redux/actions/dataActions'

function AddPost (props) {

useEffect(() => {

  setErrors( {
    ...props.errors
  })
  
}, [props.errors])

useEffect(() => {

  if(!props.errors && !props.loading) {
    handleClose();
  }
  
}, [props.errors, props.loading])

const [open, setOpen] = useState(false);
const [content, setContent] = useState('');
const [errors, setErrors] = useState({});

const handleChange = (e) => {
  setContent(e.target.value);
}

const handleOpen = () => {
    setOpen(true);
}

const handleClose = () => {
    setOpen(false);
    setErrors({});
}

const handleSubmit = (e) => {
    e.preventDefault();
    props.newPost({content});
    setContent('');
}
    return (
        <Fragment>
                <ToolTip title="Agregar Post" placement="bottom">
                        <IconButton onClick={handleOpen} > 
                            <AddCircleSharpIcon color="secondary"/>
                        </IconButton> 
                </ToolTip> 

                <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle> Nuevo post </DialogTitle>
          <DialogContent>

            <form>
              <TextField
                name="bio"
                tpye="text"
                label="que pasa?"
                multiline
                rows="4"
                placeholder="¿Qué anda pasando?"
                value={content}
                onChange={handleChange}
                fullWidth
                error={errors.general ? true : false}
                helperText={errors.general && errors.general}
              />
            </form>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" variant='contained' disabled={props.loading} onClick={handleSubmit} color="secondary">
              Postear
              {props.loading && (
                <CircularProgress style={{marginLeft: 5}} size={30} />
              )}
            </Button>
            
          </DialogActions>
        </Dialog>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
  errors: state.UI.errors,
  loading: state.UI.loading
})

export default connect(mapStateToProps, { newPost })(AddPost);