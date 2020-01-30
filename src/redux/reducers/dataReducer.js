import {GET_PROFILE_DATA, LOADING_DATA, LIKE_POST, GET_POSTS, DISLIKE_POST, DELETE_POST, NEW_POST, GET_POST, POST_COMMENT, LOADING_COMMENT, LOADING_COMMENT_END} from './types';

const initialState = {
    loading: false,
    posts: [],
    post: {},
    loadingComment: false,
    userData: {}
}

export default function (state = initialState, action) {
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            }
        case GET_POSTS: 
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        case GET_POST:
            return {
                ...state,
                post: action.payload
            }
        case LIKE_POST:
        case DISLIKE_POST:
            let index = state.posts.findIndex((post) => post.postId === action.payload.id);
            state.posts[index].likeCount = action.payload.likeCount;
            return {
                ...state
            }
        case DELETE_POST:
                return {
                    ...state,
                    posts: state.posts.filter(post => post.postId !== action.payload)
                  }
        case NEW_POST:
            return {
                ...state,
                posts:[
                    action.payload,
                    ...state.posts      
                    ]
            }
        case POST_COMMENT:
            return {
                ...state,
                post:{...state.post,
                comments:[action.payload,
                ...state.post.comments]
                }
            }
        case LOADING_COMMENT:
            return {
                ...state,
                loadingComment: true
            }
        case LOADING_COMMENT_END:
            return {
                ...state,
                loadingComment: false
            }
        case GET_PROFILE_DATA:
            return {
                ...state,
                loading: false,
                posts: action.payload.posts,
                userData: action.payload.user
            }
        default: return state;
    }
}