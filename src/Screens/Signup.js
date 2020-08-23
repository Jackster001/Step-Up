import React, { Component } from 'react';
import { registerUser } from '../Action/authAction';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import * as routes from '../Routes/routes';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
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
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        const {firstName, lastName, email, password} = this.state
        const userData={firstName, lastName, email, password};
        this.props.registerUser(userData)
    }
    render() {
        return (
        <div className="signUpContainer">
            <div className="signupForm">
                <h2 className="SignUpTitle">Create an Account</h2>
                <form onSubmit={(e)=>this.onSubmit(e)}>
                    <input 
                        type='firstName'
                        name='firstName'
                        placeholder="First Name"
                        onChange={this.handleInputChange}
                        required
                    />
                    <input 
                        type='lastName'
                        name='lastName'
                        placeholder="Last Name"
                        onChange={this.handleInputChange}
                        required
                    />
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
                    <center><button className='submitButton'>Sign Up</button></center>
                </form>
                <center>
                <br/><br/>
                <p>Already have an account? <Link to={routes.LOGIN}>Login</Link></p></center>
            </div>
        </div>
    );
  }
}

const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated,
})
  
export default connect(mapStateToProps, {registerUser})(SignUp);