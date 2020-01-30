import React,{Fragment, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { addComment } from '../redux/actions/dataActions'

// MUi
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

function NewComment (props) {

    useEffect(() => {

        setErrors( {
          ...props.errors
        })
        
      }, [props.errors])
      
      useEffect(() => {
      
        if(!props.errors && !props.data.loadingComment) {
          handleClose();
        }
        
      }, [props.errors, props.data.loadingComment])
      
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
          props.addComment(props.postid,{content});
          setContent('');
      }
          return (
              <Fragment>
                      <ToolTip title="Agregar comentario" placement="bottom">
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
                <DialogTitle> Nuevo comentario </DialogTitle>
                <DialogContent>
      
                  <form>
                    <TextField
                      required
                      name="bio"
                      tpye="text"
                      label="Opina sobre el tema"
                      multiline
                      rows="4"
                      placeholder="¿Qué anda pasando?"
                      value={content}
                      onChange={handleChange}
                      fullWidth
                      error={errors.comment ? true : false}
                      helperText={errors.comment && errors.comment}
                    />
                  </form>
      
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancelar
                  </Button>
                  <Button type="submit" variant='contained' disabled={props.data.loadingComment} onClick={handleSubmit} color="secondary">
                    Comentar
                    {props.data.loadingComment && (
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
    loading: state.UI.loading,
    data: state.data
})

export default connect(mapStateToProps, { addComment })(NewComment) 