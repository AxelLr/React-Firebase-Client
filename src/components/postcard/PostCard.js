import React from 'react';
import DeleteButton from '../DeleteButton'
import SinglePost from '../SinglePost'
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';

//REDUX
import { likeAPost, dislikeAPost } from '../../redux/actions/dataActions'
import { connect } from 'react-redux'

function PostCard(props) {

const postAlreadyLiked = () =>  {
   if(props.user.likes && props.user.likes.find((like) => like.postId === props.postId)) 
     return true;
     else return false;
 }

dayjs.extend(relativeTime);

const { authenticated } = props;

const likePost = () => {
  props.likeAPost(props.postId);
}

const dislikePost = () => {
  props.dislikeAPost(props.postId);
}

  return (
    <div className="card-container"> 

        <div className="card-image-container">

          <img src={props.profileImage} width='100%' height='100%' alt="profile-pic"/>

        </div>
        
        <div className="card-header-container">
          
            <MuiLink
              component={Link}
              to={`/users/${props.userHandle}`}
              color="secondary"
              variant="h5"
            >
             @{props.userHandle}
            </MuiLink>

           <p> {dayjs(props.createdAt).fromNow()} </p>
           
        </div>

        <div className="card-content-container"> 
          
          <p> {props.content} </p>

        </div>

        <div className="card-base-container"> 

          <div className="like-comment-container">
            <span> {props.likeCount} likes </span> 
            <span> {props.commentCount} comentarios </span> 
          </div>

          <hr style={{border: 'none'}} />

         { !authenticated ? (
                <Link to="/login">
                  <Button tip="Like">
                    <FavoriteBorder color="secondary" />
                  </Button>
                </Link>
            ) : postAlreadyLiked() ? (
                    <Button tip="Undo like" onClick={dislikePost}>
                      <FavoriteIcon color="secondary" />
                    </Button>
            ) : (
              <Button tip="Like" onClick={likePost}>
                <FavoriteBorder color="secondary" />
              </Button>
            ) }
  
  {authenticated &&  props.userHandle === props.user.credentials.handle && < DeleteButton  postid={props.postId} />}
  <SinglePost postid={props.postId} userHandle={props.userHandle} />
        </div>
        
    </div>

  );
}

const mapStatetoProps = (state) =>  ({
authenticated: state.user.authenticated,
user: state.user
})

const mapActionsToProps = { likeAPost, dislikeAPost }

export default connect(mapStatetoProps, mapActionsToProps)(PostCard);





