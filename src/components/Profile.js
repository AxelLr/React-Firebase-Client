import React from 'react'
import { Link } from 'react-router-dom'
import EditDetails from './editDetails'
// MUI
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
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
import CircularProgress from '@material-ui/core/CircularProgress'

// REDUX
import { connect } from 'react-redux';

function Profile(props) {

    const { handle, createdAt, imageUrl, bio, location } = props.user.credentials;
    const { loading, authenticated } = props.user;
  
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
        {
         !loading ? (
            authenticated ? (
              <Paper >
                  <div className="profile-image-container">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                    <input type='file' id='image-input' hidden="hidden" onChange={onImageChange} />
                    <div className="change-image-container">
                      <ToolTip title="Editar foto de perfil" placement="right">
                        <IconButton onClick={handleEditPicture}> 
                          <EditIcon color="secondary"/>
                        </IconButton> 
                      </ToolTip>
                    </div>
                  </div>

                  <hr />

                  <div className="profile-details">
                    <MuiLink
                      component={Link}
                      to={`/users/${handle}`}
                      color="secondary"
                      variant="h5"
                    >
                    @{handle} 
                    </MuiLink>

                    <p> {bio} </p>   

                    {location && < LocationOn color="primary" /> } <span> {location}</span>

                    <hr style={{border: 'none'}} />

                    <CalendarToday color="primary" /> <span> Se unío en {dayjs(createdAt).format('MMM YYYY')}</span>
                  </div>
                  <div className="profile-bottom"> 
                    <ToolTip title="Desconectarse" placement="bottom">
                        <IconButton size="small" onClick={handleLogOut}> 
                            <Undo color="primary" />
                        </IconButton> 
                    </ToolTip> 

                    < EditDetails/>
                  </div>     
              </Paper>
            ) : (
              <Paper >
                <Typography variant="body1" align="center">
                  Debes conectarte para ver tu perfil!
                </Typography>
                <div className="profile-button-container">
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/login"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/signup"
                  >
                    Registrarse
                  </Button>
                </div>
              </Paper>
            )
          ) : (
            <CircularProgress style={{marginLeft: 5}} size={250} />
          )
        }
        </div>
    )
 }

 const mapStateToProps = (state) => ({
 user: state.user
 })

 const mapActionsToProps = {uploadImage, logOutUser}

 export default connect(mapStateToProps, mapActionsToProps)(Profile);