import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, NOTIFICATIONS_READED} from '../reducers/types';
import axios from 'axios';

const setAuthHeader = (token) => {
    const FbIdToken = `Bearer ${token}`;
    localStorage.setItem('FbIdToken',FbIdToken);
    axios.defaults.headers.common['Authorization'] = FbIdToken;
  }

export const loginUser = (userData, history) => (dispatch) => {

  dispatch({type: LOADING_UI})  

  axios.post('https://us-central1-dolphapp.cloudfunctions.net/api/login', userData)

  .then((res) => {
    setAuthHeader(res.data.token);
    dispatch(getUserData());
    dispatch({
        type: CLEAR_ERRORS
    })
    history.push("/");
   })

  .catch((err) => {
 dispatch({
     type: SET_ERRORS,
     payload: err.response.data
 })
  });
}

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.get('https://us-central1-dolphapp.cloudfunctions.net/api/user')
         .then(res =>{
             dispatch({
                 type: SET_USER,
                 payload: res.data
             })
         })
         .catch(err => {
             console.log(err);
         })
}

export const signUpUser = (newUserData, history) => (dispatch) => {

    dispatch({type: LOADING_UI})  
  
    axios.post('https://us-central1-dolphapp.cloudfunctions.net/api/signup', newUserData)
  
    .then((res) => {
      setAuthHeader(res.data.token);
      dispatch(getUserData());
      dispatch({
          type: CLEAR_ERRORS
      })
      history.push("/");
     })
  
    .catch((err) => {
   dispatch({
       type: SET_ERRORS,
       payload: err.response.data
   })
    });
  }

export const logOutUser = () => (dispatch) => {
    localStorage.removeItem('FbIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch ( {
        type: SET_UNAUTHENTICATED
    });
}

export const uploadImage = (newImage) => (dispatch) => {
 dispatch({type: LOADING_USER})
 axios.post('https://us-central1-dolphapp.cloudfunctions.net/api/user/image', newImage)
    .then(res => {
        dispatch(getUserData());
    }) 
    .catch(err => console.log(err))
}

export const editUserDetails = (data) => (dispatch) => {
dispatch({type: LOADING_USER})
axios.post('https://us-central1-dolphapp.cloudfunctions.net/api/user', data)
    .then(res => {
        dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const markNotificationsAsReaded = (notificationsId) => (dispatch) => {

    axios.post('https://us-central1-dolphapp.cloudfunctions.net/api/notifications', notificationsId)
        .then (res => {
            dispatch({ type: NOTIFICATIONS_READED})
        })
        .catch(err => console.log(err))
}