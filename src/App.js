import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
// PAGES
import  SignUp   from './pages/Signup';
import  LogIn   from './pages/Login';
import  Home    from './pages/Home';
import  User from './pages/User'
//COMPONENTS
import  Navbar  from './components/navbar/Navbar';
// UTIL
import AuthRoute from './utilities/AuthenticatedRoute.js';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// MATERIALUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CreateMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiTheme from './utilities/MuiTheme';
//REDUX 
import { Provider } from 'react-redux';
import store from './redux/store/Store';
import {SET_AUTHENTICATED} from './redux/reducers/types';
import { logOutUser, getUserData } from './redux/actions/userActions';

axios.defaults.baseURL = "https://us-central1-dolphapp.cloudfunctions.net/api"

const theme = CreateMuiTheme(MuiTheme);

const token = localStorage.FbIdToken;

 if(token) {
   console.log(token);
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser())
  } else {
   store.dispatch({type: SET_AUTHENTICATED});
   axios.defaults.headers.common['Authorization'] = token;
   store.dispatch(getUserData());
 }
}

function App() {

  return (
     <div className="App"> 
    <MuiThemeProvider theme={theme} >
    <Provider store={store}> 
      <BrowserRouter> 
            <Navbar /> 
              <Switch>
                  <Route exact path="/" component={Home}/> 
                  <AuthRoute exact path="/SignUp" component={SignUp}  />
                  <AuthRoute exact path="/LogIn" component={LogIn}    />
                  <Route exact path='/users/:handle' component={User} />
              </Switch>
      </BrowserRouter>
     </Provider>
    </MuiThemeProvider>
    </div>
    
  );
}

export default App;


