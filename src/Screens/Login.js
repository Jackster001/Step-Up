import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../Action/authAction';
import * as routes from '../Routes/routes';
import {auth, firestore} from '../Firebase/firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }
    componentDidMount(){
      auth.onAuthStateChanged(function (user){
          if(user){
              console.log(user)
              // setTrue()
              // firebase.auth().signOut()
              // logoutUser()
              // auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
              // console.log(auth.currentUser)
              // firebase.auth().signOut()
          }else{
              // logoutUser()
              // firebase.auth().signOut()
              console.log("logged out")
          }
      })
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
  
      const userData={
        email:this.state.email,
        password:this.state.password
      };
      this.props.loginUser(userData)
    }

    render() {
        return (
          <div className="signInContainer">
            <div className="signInForm">
                <h2>Sign into Account</h2>
                <form onSubmit={(e)=>this.onSubmit(e)}>
                    <input 
                        type="email"
                        name='email'
                        placeholder="Email"
                        onChange={this.handleInputChange}
                        required
                    />
                    <input 
                        type='password'
                        name='password'
                        placeholder="Password"
                        onChange={this.handleInputChange}
                        required
                    />
                    {this.props.loginError ? <center><p className="errorTexts">Incorrect Email or Password</p></center>:[]}
                    <center><button className='submitButton'>Login</button></center>
                </form>
                <center>
                <br/><br/>
                <p>Don't have an account? <Link to={routes.SIGNUP}>Sign Up</Link></p></center>
            </div>
          </div>
        );
    }
}

const mapStateToProps =(state) =>({
  isAuthenticated: state.authState.isAuthenticated,
  loginError: state.authState.loginError
})

export default connect(mapStateToProps, {loginUser})(Login);
