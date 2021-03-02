import React, { Component } from 'react';
import { registerUser } from '../Action/authAction';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {ErrorComponent} from '../Components';
import * as routes from '../Routes/routes';
import {Grid, Paper, withStyles, TextField, Container, Button, Divider, Field} from '@material-ui/core';
import signUpImage from '../Assets/Sign Up Illustratons.svg';
import {disableSignUpEmail, clearSignUpEmail} from '../Action/authAction';

const useStyles = (theme) => ({
    containerStyle:{
        marginTop: '100px',
        marginBottom: '150px'
    },
    formStyle:{
        marginTop: '0px',
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
    signUpButton:{
        width: '340px',
        borderRadius: '5px'
    }
})

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword: '',
            firstName_error_text:'',
            lastName_error_text:'',
            email_error_text:'',
            password_error_text:'',
            confirm_password_error_text:''
        }
    }
    componentDidMount() {
        if (this.props.isAuthenticated) {
          this.props.history.push('/home');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
          this.props.history.push('/home');
        }
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    }
    componentDidUpdate(){
      if(this.props.signUpEmailSent){
        this.props.disableSignUpEmail();
        this.setState({...this.state, email: this.props.signUpEmail});
        this.props.clearSignUpEmail();
      }
    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        const {firstName, lastName, email, password, confirmPassword} = this.state
        if(
            firstName.length === 0 
            || lastName.length === 0 
            || email.length === 0 
            || password.length < 6
            || confirmPassword.length === 0 
            || password !== confirmPassword
        ){
            this.handleInputErrors()
        }else{
            const userData={firstName, lastName, email, password};
            this.props.registerUser(userData)
        }
    }
    handleInputErrors(){
        let firstName_error_text="", lastName_error_text="", email_error_text="", password_error_text="", confirm_password_error_text="";
        const {firstName, lastName, email, password, confirmPassword} = this.state
        if(firstName.length === 0 ){
            firstName_error_text="Missing Input"
        }
        if(lastName.length === 0 ){
            lastName_error_text="Missing Input"
        }
        if(email.length === 0 || (email.indexOf("@") === -1 || email.indexOf(".com") === -1)){
            email_error_text="Invalid or Missing Input"
        }
        if(confirmPassword !== password){
            confirm_password_error_text="Passwords don't match"
        }
        if(password.length === 0){
            password_error_text="Missing Input"
        }else if(password.length<6){
            password_error_text="Passwords should be at least 6 characters"
        }
        this.setState({...this.state, firstName_error_text, lastName_error_text, email_error_text, password_error_text, confirm_password_error_text})
    }
    render() {
        const { classes } = this.props;
        return (
        <Grid container spacing={5} className={classes.containerStyle}>
            <Grid item xs={6}>
            <form className={classes.formStyle} onSubmit={(e)=>this.onSubmit(e)} autoComplete>
                <h1 className={classes.titleText}>Create Account</h1>
                <p>Already a member? <Link to={routes.LOGIN} className={classes.linkStyle}>Log in</Link></p>
                <br/>
                <div>
                  <TextField 
                    type="firstName"
                    name="firstName"
                    className={classes.inputStyle} 
                    label="First Name" variant="outlined" 
                    onChange={this.handleInputChange}
                    error={this.props.error.errorShow || this.state.firstName_error_text.length !== 0}
                    helperText={this.state.firstName_error_text}
                    required
                  />
                </div>
                <div>
                  <TextField 
                    type="lastName"
                    name="lastName"
                    className={classes.inputStyle} 
                    label="Last Name" variant="outlined" 
                    onChange={this.handleInputChange}
                    error={this.props.error.errorShow || this.state.lastName_error_text.length !== 0}
                    helperText={this.state.firstName_error_text}
                    required
                  />
                </div>
                <div>
                  <TextField 
                    type="email"
                    name="email"
                    className={classes.inputStyle} 
                    label="Email" variant="outlined" 
                    onChange={this.handleInputChange}
                    error={this.props.error.errorShow || this.state.email_error_text.length !== 0}
                    helperText={this.state.email_error_text}
                    value={this.state.email}
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
                <div>
                  <TextField 
                    type="password"
                    name="confirmPassword"
                    className={classes.inputStyle} 
                    label="Confirm Password" 
                    variant="outlined" 
                    onChange={this.handleInputChange}
                    value = {this.state.confirmPassword}
                    error={this.props.error.errorShow || this.state.confirm_password_error_text.length !== 0}
                    helperText={this.state.confirm_password_error_text}
                    required
                  />
                </div>
                <ErrorComponent location="sign-up"/>
                <br/>
                <Button variant="contained" color="primary" className={classes.signUpButton} onClick={(e)=>this.onSubmit(e)}>Sign In</Button>
              </form>
            </Grid>
            <Grid item xs={6}><br/><br/>
                <img src={signUpImage} width={'80%'}/>
            </Grid>
        </Grid>
    );
  }
}

const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated,
    error: state.errorState.error,
    signUpEmail: state.authState.signUpEmail,
    signUpEmailSent: state.authState.signUpEmailSent,
})
  
export default connect(mapStateToProps, {registerUser, disableSignUpEmail, clearSignUpEmail})(withStyles(useStyles)(SignUp));