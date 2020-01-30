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
import {signUpUser} from '../redux/actions/userActions';


function SignUp(props) {

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  handle: ''
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
  props.signUpUser(values, props.history); 
}
    return (
      <div className="page-container form-container">

          <img src={Logo} style={{margin: 10}} alt="galaxy-icon"  />
            <Typography variant="h3">
              Regístrate! 
            </Typography>

          <form noValidate onSubmit={handleSubmit}>
            <TextField
              error={props.UI.errors.email ? true : false}
              id="email"
              name="email"
              type="email"
              label={props.UI.errors.email ? props.UI.errors.email : "E-mail"}
              value={values.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              error={props.UI.errors.password ? true : false}
              id="password"
              name="password"
              type="password"
              label={props.UI.errors.password ? props.UI.errors.password : "Contraseña"}
              value={values.password}
              onChange={handleChange}
              fullWidth
            />
             <TextField
              error={props.UI.errors.confirmPassword ? true : false}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label={props.UI.errors.confirmPassword ? props.UI.errors.confirmPassword : "Confirmar contraseña"}
              value={values.confirmPassword}
              onChange={handleChange}
              fullWidth
            />
             <TextField
              error={props.UI.errors.handle ? true : false}
              id="handle"
              name="handle"
              type="text"
              label={props.UI.errors.handle ? props.UI.errors.handle : "Nombre"}
              value={values.handle}
              onChange={handleChange}
              helperText="Todos veran tu nombre"
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
              Registrarse {props.UI.loading && (
                <CircularProgress style={{marginLeft: 5}} size={30} />
              )}
            </Button>

            <br />

            <small>
             Si ya tienes una cuenta, puedes iniciar sesión <Link to="/LogIn"> Aquí </Link> 
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
  signUpUser
}

export default connect(mapStateToProps, mapActionsToProps)(SignUp);