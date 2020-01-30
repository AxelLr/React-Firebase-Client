import React,{useState, Fragment} from 'react'
import dayjs from 'dayjs'
import NewComment from './addComent'
import Comments from './Comments';
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import ToolTip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
import { getPost } from '../redux/actions/dataActions'
import OpenWithIcon from '@material-ui/icons/OpenWith';
import CancelIcon from '@material-ui/icons/Cancel';

function SinglePost(props) {

const [open, setOpen] = useState(false)

const handleOpen = () => {
    props.getPost(props.postid);
    setOpen(true);
}

const handleClose = () => {
    setOpen(false);
}

return (
    <Fragment>
       
        <ToolTip title="Abrir Post" placement="bottom">
                <IconButton onClick={handleOpen} > 
                    <OpenWithIcon color="secondary"/>
                </IconButton> 
        </ToolTip> 
   
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            >
              { props.UI.loading ?  <CircularProgress style={{marignLeft: 200}} size={30} /> 
              
              :

              <div className='singlepost-image-container'>   
                <div className='singlepost-container'>
                <img src={props.post.userImage} alt="profile-pic"/>
                
                <div className='singlepost-data-container'>   

                    <div className='singlepost-data-top'> 
                        <DialogTitle> @{props.post.userHandle} </DialogTitle>
                        <p> {dayjs(props.post.createdAt).format('h: mm a, MMMM DD YYYY')} </p>
                    </div>  

                    <div className='singlepost-data-bottom'> 
                        <p> {props.post.content} </p>
                        <span> {props.post.likeCount} likes </span>

                        <div className='singlepost-button-container'>

                            < NewComment postid={props.post.postId} />

                            <DialogActions>
                                <IconButton onClick={handleClose} > 
                                    <CancelIcon color="secondary"/>
                                </IconButton> 
                            </DialogActions>  
                        </div>
                    </div>

                </div>  

             </div>
            <Comments comments={props.post.comments}/>
          
            </div>
            }  
        </Dialog>
    </Fragment>
    )
}

const mapStateToprops = (state) => ({
 post: state.data.post,
 UI: state.UI,
 authenticated: state.user.authenticated
})

export default connect(mapStateToprops, { getPost })(SinglePost);