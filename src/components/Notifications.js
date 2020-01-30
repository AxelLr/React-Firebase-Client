import React,{useState, Fragment} from 'react'
import { Link } from 'react-router-dom';

 // MUI
import IconButton from '@material-ui/core/IconButton'
import ToolTip from '@material-ui/core/Tooltip'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

import { connect } from 'react-redux'
import { markNotificationsAsReaded } from '../redux/actions/userActions'

function Notifications (props) {
    
const [anchorEl, setAnchorEl] = useState(null)
const { notifications } = props;

const handleOpen = (event) => {
  setAnchorEl(event.target);
};
const handleClose = () => {
    setAnchorEl(null);
};
const onMenuOpened = () => {
  let unreadNotificationsIds = notifications.filter((not) => !not.read).map((not) => not.notificationId);
  props.markNotificationsAsReaded(unreadNotificationsIds);
};

let notificationIcon;

if(notifications && notifications.length > 0) {
    notifications.filter(not => not.read === false).length > 0 ?
    (notificationIcon = (
        <Badge badgeContent={ notifications.filter(not => not.read === false).length}
            color='secondary' > <NotificationsActiveIcon color='secondary'/> </Badge>
    )) : notificationIcon = <NotificationsActiveIcon color='secondary' />  
} else {
    notificationIcon = <NotificationsActiveIcon color='secondary' />  
}

let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === 'like' ? 'le dio me gusta a' : 'comentó';
          const iconColor = not.read ? 'primary' : 'secondary';
          const icon =
            not.type === 'like' ? (
              <FavoriteIcon color={iconColor} />
            ) : (
              <ChatIcon color={iconColor} />
            );
            return (
                <MenuItem key={not.createdAt} onClick={handleClose}>
                  {icon}
                  <Typography
                    component={Link}
                    color="default"
                    variant="body1"
                    to={`/users/${not.recipient}/scream/${not.screamId}`}
                  >
                    {not.sender} {verb} tu post 
                  </Typography>
                </MenuItem>
              );
            })
          ) : (
            <MenuItem onClick={handleClose}>
              No tienes notificaciones
            </MenuItem>
          );
            
    return (
        <Fragment>
        <ToolTip placement="bottom" title="Notificaciones">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </ToolTip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onEntered={onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>

    )
}
const mapStatetoProps = (state) => ({
notifications: state.user.notifications
})

export default connect(mapStatetoProps, { markNotificationsAsReaded })(Notifications);