import React,{useEffect} from 'react';
import PostCard  from '../components/postcard/PostCard';
import Profile from '../components/Profile';
import CircularProgress from '@material-ui/core/CircularProgress'

// REDUX
import { connect } from 'react-redux'
import { getAllPosts } from '../redux/actions/dataActions'

function Home(props) {

console.log(props.data.posts)

const { loading } = props.data;

useEffect(() => {

props.getAllPosts();

}, [])

    return (
      <div className="page-container" >

        <div className="home-container">

              <div className="profile">
                  < Profile />
              </div>

              <div className="posts-container">
                {loading  ? <CircularProgress style={{marginLeft: 5}} size={300} /> : props.data.posts.map((post, idx) =>
                    < PostCard
                        key = {idx}
                        postId ={post.postId}
                        content={post.content}
                        profileImage={post.userImage}
                        userHandle={post.userHandle}
                        createdAt={post.createdAt}
                        likeCount={post.likeCount}
                        commentCount= {post.commentCount}
                    />) }
                    {
                     }
              </div>
          </div>
      </div>
    );
  }

  const mapStateToProps = (state) => ({
    data: state.data
  })

  const mapActionsToProps = { getAllPosts }

  export default connect(mapStateToProps, mapActionsToProps)(Home);