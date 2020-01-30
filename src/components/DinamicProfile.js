import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'
import EditDetails from './editDetails'
// MUI
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import dayjs from 'dayjs'
import IconButton from '@material-ui/core/IconButton'
import ToolTip from '@material-ui/core/Tooltip'
import Undo from '@material-ui/icons/Undo'
// MUI ICONS
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import { logOutUser, uploadImage } from '../redux/actions/userActions'
import LocationOn from '@material-ui/icons/LocationOn'

// import CalendarToday from '@material-ui/icons/CalendarToday';

// REDUX
import { connect } from 'react-redux';


function DinamicProfile(props) {

    const onImageChange = (e) => {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append('Image', image, image.name);
      props.uploadImage(formData);
      console.log(formData);
    
    }

    const handleEditPicture = () => {
      const newImage = document.getElementById('image-input');
      newImage.click();
    }

    const handleLogOut = () => {
      props.logOutUser();
    }

    return (
        <div className="profile-card-container"> 
     
              <Paper style={{marginRight: 20, width: 350}}>
                  <div className="profile-image-container">
                    <img src={props.profileImage} alt="profile" width='50%' height='100%' className="profile-image" />  

                 {props.user.authenticated && (props.user.credentials.handle === props.userHandle &&
                   <Fragment>
                   <input type='file' id='image-input' hidden="hidden" onChange={onImageChange} />
                    <ToolTip title="Editar foto de perfil" placement="right">
                    <IconButton onClick={handleEditPicture}> 
                     <EditIcon color="primary"/>
                    </IconButton> 
                  </ToolTip>
                  </Fragment>
                  ) }

                  </div>
                  <hr />
                  <div className="profile-details">
                 
                      @{props.userHandle}                 
                    <p> {props.bio}</p>                    
                    < LocationOn color="primary" />
                    <span> {props.location}</span>
                    <hr style={{border: 'none'}} />
                    <CalendarToday color="primary" />
                    <span> Se unío en {dayjs(props.createdAt).format('MMM YYYY')}</span>
                  </div>
                 
                {props.user.authenticated && <ToolTip title="Desconectarse" placement="bottom">
                        <IconButton onClick={handleLogOut}> 
                        <Undo color="primary" />
                        </IconButton> 
                    </ToolTip>  }  

                {props.user.authenticated && (props.user.credentials.handle === props.userHandle && < EditDetails/>) }
                  
              </Paper>
          
              <Paper >
           
              </Paper>
  
        </div>
    )
 }

 const mapStateToProps = (state) => ({
 user: state.user
 })

 const mapActionsToProps = {uploadImage, logOutUser}

 export default connect(mapStateToProps, mapActionsToProps)(DinamicProfile);