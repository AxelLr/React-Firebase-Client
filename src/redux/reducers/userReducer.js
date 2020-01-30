import {SET_AUTHENTICATED, SET_USER, SET_UNAUTHENTICATED, LOADING_USER, USER_LOADED, LIKE_POST, DISLIKE_POST, NOTIFICATIONS_READED} from '../reducers/types';

const initialState = {
    authenticated: false,
    credentials: {},
    loading: false,
    likes: [],
    notifications: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED: 
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return {
                ...state,
                authenticated: false
            }
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case USER_LOADED:
            return {
                ...state,
                loading: false
            }
        case LIKE_POST:
            return {
                ...state,
                likes: [ ...state.likes,
                 {
                    userHandle: state.credentials.userHandle,
                    postId: action.payload.id
                 }
                ]   
            }
        case DISLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(like => like.postId !== action.payload.id)
            }
        case NOTIFICATIONS_READED:
             state.notifications.forEach(notification => notification.read = true)
             return {
                 ...state
             }
            
        default: return state;
    }
}