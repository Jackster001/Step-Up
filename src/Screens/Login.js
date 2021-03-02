import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser,resetPassword } from '../Action/authAction';
import {Grid, Paper, withStyles, TextField, Container, Button, Divider, Field} from '@material-ui/core';
import * as routes from '../Routes/routes';
import {auth, firestore} from '../Firebase/firebase';
import {ErrorComponent} from '../Components';
import loginImage from '../Assets/Login Illustration.svg';

const useStyles = (theme) => ({
  containerStyle:{
    marginTop: '70px',
    marginBottom: '150px'
  },
  formStyle:{
    marginTop: '100px',
    marginLeft: '100px'
  },
  titleText:{
    fontSize: '50px'
  },
  inputStyle:{
    width: '340px',
    marginBottom: '10px'
  },
  linkStyle:{
    textDecoration: 'none'
  },
  signInButton:{
    width: '340px',
    borderRadius: '5px'
  }
})

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email:'',
        password:'',
        errors:'',
        email_error_text:'',
        password_error_text:''
      }
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }
    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }
    onSubmit(event){
      event.preventDefault();

      if(this.state.email.length === 0 || this.state.password.length === 0 || (this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".com") === -1)){
        this.handleError();
      }else{
        this.setState({...this.state, email_error_text : "", password_error_text : ""})
        const userData={
          email:this.state.email,
          password:this.state.password
        };
  
        this.props.loginUser(userData)
      }
    }

    handleError(){
      if(this.state.email.length === 0 || (this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".com") === -1)){
        this.setState({...this.state, email_error_text : "Invalid or Missing Input"})
        if(this.state.password.length === 0){
          this.setState({...this.state, password_error_text : "Invalid or Missing Input", email_error_text : "Invalid or Missing Input"})
        }
      }
      else if(this.state.password.length === 0){
        this.setState({...this.state, password_error_text : "Invalid or Missing Input"})
      }
    }

    render() {
      const { classes } = this.props;
        return (
          <Grid container spacing={5} className={classes.containerStyle}>
            <Grid item xs={6}>
              <img src={loginImage} width={'100%'}/>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formStyle} onSubmit={(e)=>this.onSubmit(e)} autoComplete>
                <h1 className={classes.titleText}>Welcome Back!</h1>
                <p>Don’t have an account? <Link to={routes.SIGNUP} className={classes.linkStyle}>Sign up here</Link></p>
                <br/>
                <div>
                  <TextField 
                    type="email"
                    name="email"
                    className={classes.inputStyle} 
                    label="Email" variant="outlined" 
                    onChange={this.handleInputChange}
                    error={this.props.error.errorShow || this.state.email_error_text.length !== 0}
                    helperText={this.state.email_error_text}
                    required
                  />
                </div>
                <div>
                  <TextField 
                    type="password"
                    name="password"
                    className={classes.inputStyle} 
                    label="Password" 
                    variant="outlined" 
                    onChange={this.handleInputChange}
                    value = {this.state.password}
                    error={this.props.error.errorShow || this.state.password_error_text.length !== 0}
                    helperText={this.state.password_error_text}
                    required
                  />
                </div>
                <ErrorComponent location="login"/>
                <br/>
                <Button variant="contained" color="primary" className={classes.signInButton} onClick={(e)=>this.onSubmit(e)}>Sign In</Button>
                <br/><br/>
                <p><Link to={routes.RESET} className={classes.linkStyle}>Forgot your password?</Link></p>
              </form>
            </Grid>
          </Grid>
        );
    }
}

const mapStateToProps =(state) =>({
  isAuthenticated: state.authState.isAuthenticated,
  loginError: state.authState.loginError,
  error: state.errorState.error,
})

export default connect(mapStateToProps, {loginUser, resetPassword})(withStyles(useStyles)(Login));
