import {LOADING_DATA, LIKE_POST, DISLIKE_POST, GET_POSTS, DELETE_POST,
         NEW_POST, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, GET_POST, LOADING_END, POST_COMMENT, LOADING_COMMENT,
         LOADING_COMMENT_END, GET_PROFILE_DATA} from '../reducers/types';
import axios from 'axios';

export const getAllPosts = () => (dispatch) => {
    dispatch({type: LOADING_DATA})

    axios.get('https://us-central1-dolphapp.cloudfunctions.net/api/posts')
    .then(res => {
        
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })

    })
    .catch(err => {
      dispatch({
          type: GET_POSTS,
          payload: null
      })
    })
}

export const likeAPost = (postid) => (dispatch) => {

    axios.get(`https://us-central1-dolphapp.cloudfunctions.net/api/post/${postid}/like`)
        .then(res => {
            console.log(res.data)
            dispatch ({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err))    
}

export const dislikeAPost = (postid) => (dispatch) => {

    axios.get(`https://us-central1-dolphapp.cloudfunctions.net/api/post/${postid}/dislike`)
        .then(res => {
            dispatch ({
                type: DISLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err))    
}

export const deletePost = (postid) => (dispatch) => {

    axios.delete(`https://us-central1-dolphapp.cloudfunctions.net/api/post/${postid}`)
       .then(()=> 
       dispatch({
           type: DELETE_POST,
           payload: postid
       })
       )

    .catch(err => console.log(err) )

}

export const newPost = (content) => (dispatch) => {

    dispatch({ type: LOADING_UI });

    axios.post('https://us-central1-dolphapp.cloudfunctions.net/api/post/', content)
        .then ( res => {

            dispatch({ type: CLEAR_ERRORS});

            dispatch({
            type: NEW_POST,
            payload: res.data
            });
            
        })

        .catch(err => 
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        )
}

export const getPost = (postid) => (dispatch) => {
    dispatch({type: LOADING_UI})
    
        axios.get(`https://us-central1-dolphapp.cloudfunctions.net/api/post/${postid}`)
            .then(res => {

                dispatch({ 
                type: GET_POST,
                payload: res.data
                });

                 dispatch({
                 type: LOADING_END
                 })
            })

            .catch( err => console.log(err));
}

export const addComment = (postid, content) => (dispatch) => {

    dispatch({ type: LOADING_COMMENT });

    axios.post(`https://us-central1-dolphapp.cloudfunctions.net/api/post/${postid}/comment`, content)
        .then ( res => {

            dispatch({type: LOADING_COMMENT_END});

            dispatch({ type: CLEAR_ERRORS});

            dispatch({
            type: POST_COMMENT,
            payload: res.data
            });   
        })

        .catch(err => {  
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });

            dispatch({type: LOADING_COMMENT_END}); }
        )
}

export const getUserProfile = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_DATA })

    axios.get(`https://us-central1-dolphapp.cloudfunctions.net/api/user/${userHandle}`)
        .then(res =>
        dispatch({
            type: GET_PROFILE_DATA,
            payload: res.data
        })
        )
        .catch(() => {
            dispatch({
                type: GET_PROFILE_DATA,
                payload: null
            })
        }) 
}