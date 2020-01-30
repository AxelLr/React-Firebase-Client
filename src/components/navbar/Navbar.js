import React,{Fragment} from 'react'
import AddPost from '../AddPost'
import Notifications from '../Notifications'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// UI
import Appbar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from  '@material-ui/core/Button'

function Navbar(props) {

    return (
        <Appbar className="navbar-container" position="static" >
            <Toolbar className="links-container">

        { props.authenticated   
           ? <Fragment> 
                
                < AddPost /> 

               < Notifications />
                
                <Link to="/">   <Button color="secondary">  Home </Button> </Link>
             </Fragment>
           : 
             <Fragment>
                 <Link to="/LogIn">  <Button color="secondary"> Iniciar Sesión  </Button> </Link>
                <Link to="/SignUp"> <Button color="secondary">  Registrarse    </Button> </Link>         
            </Fragment>         
        }
            </Toolbar>
        </Appbar>
    ); 
  }

const mapStateToProps = (state) => ({
authenticated: state.user.authenticated
})
 
export default connect(mapStateToProps)(Navbar);