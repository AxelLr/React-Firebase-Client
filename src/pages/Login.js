import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import  Logo  from '../icons/merge.png';
// MUI Stuff
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// REDUX
import { connect } from 'react-redux';
import {loginUser} from '../redux/actions/userActions';


function LogIn(props) {

const initialState = {
  email: '',
  password: ''
}

const [values, setValues] = useState(initialState);

const handleChange = (e) => {
  setValues({
    ...values,
    [e.target.name]: e.target.value
  })
}

const handleSubmit = (e) => {
  e.preventDefault(); 
  props.loginUser(values, props.history)
}
    return (
      <div className="page-container form-container">

          <img src={Logo} style={{margin: 10}} alt="galaxy-icon"  />
            <Typography variant="h3" >
              Iniciar Sesión
            </Typography>

          <form noValidate onSubmit={handleSubmit}>
            <TextField
              error={props.UI.errors.email ? true : false}
              id="email"
              name="email"
              type="email"
              label="E-mail"
              value={values.email}
              onChange={handleChange}
              helperText={props.UI.errors.email && props.UI.errors.email }
              fullWidth
            />
            <TextField
              error={props.UI.errors.password ? true : false}
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              value={values.password}
              onChange={handleChange}
              helperText={props.UI.errors.password && props.UI.errors.password }
              fullWidth
            />
            {props.UI.errors.general && <h4 style={{color: 'red', margin: 5}}> {props.UI.errors.general} </h4>}
            <Button
              disabled={props.UI.loading}
              type="submit"
              variant="contained"
              color="secondary"
              style={{margin: '25px auto 25px auto'}}
            >
              Iniciar Sesión {props.UI.loading && (
                <CircularProgress style={{marginLeft: 5}} size={30} />
              )}
            </Button>

            <br />

            <small>
              No tienes una cuenta? Regístrate <Link to="/SignUp"> Aquí </Link> 
            </small>
          </form>
      </div>
    );
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(LogIn);
    
          
         
            

