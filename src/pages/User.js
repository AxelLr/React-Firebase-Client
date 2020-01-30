import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { getUserProfile } from '../redux/actions/dataActions'
import PostCard from '../components/postcard/PostCard';
import DinamicProfile from '../components/DinamicProfile';

//MUI
import CircularProgress from '@material-ui/core/CircularProgress';

function UserPage(props) {

useEffect(() => {
const handle = props.match.params.handle;
props.getUserProfile(handle);

}, [])

    return ( 

    <div className="dinamic-profile-container">
        <div > 
            {props.data.loading ? <CircularProgress style={{margin: 'auto'}} size={30} /> : props.data.posts.map((post, idx) => 
            <PostCard 
                        key = {idx}
                        postId ={post.postId}
                        content={post.content}
                        profileImage={post.userImage}
                        userHandle={post.userHandle}
                        createdAt={post.createdAt}
                        likeCount={post.likeCount}
                        commentCount= {post.commentCount} 
            />)}
        </div>

        {!props.data.loading && 
           <DinamicProfile  
           postId ={props.data.userData.postId}
           content={props.data.userData.content}
           profileImage={props.data.userData.imageUrl}
           userHandle={props.match.params.handle}
           createdAt={props.data.userData.createdAt}
           likeCount={props.data.userData.likeCount}
           commentCount={props.data.userData.commentCount}
           location={props.data.userData.location}
           bio={props.data.userData.bio}  />
        }
    </div>
)
}

const mapStateToProps = (state) => ({
data: state.data
})

export default connect(mapStateToProps,{ getUserProfile })(UserPage);