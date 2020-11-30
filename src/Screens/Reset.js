import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword, resetOff } from '../Action/authAction';
import * as routes from '../Routes/routes';
import {auth, firestore} from '../Firebase/firebase';

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            reset: false
        }
    }

    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }

    onPressReset(e){
      e.preventDefault();
      this.props.resetPassword(this.state.email)
      this.setState({reset: true})
    }

    render() {
        return (
          <div className="resetContainer"> 
            <div className="resetContainerInner">
              {this.state.reset === true ? 
                <center>
                  <h4 className="resetTexts">Your password reset request was emailed</h4>
                  <Link to={routes.LOGIN}><button className="resetButton">Return to login</button></Link>
                </center>
              :
                <div>
                  <center>
                  <h2>Enter Your email to reset password</h2>
                  <input 
                    className="resetEmailInput"
                    type="email"
                    name='email'
                    placeholder="Email"
                    onChange={this.handleInputChange}
                    required
                  />
                  <p>You will receive an email giving you instructions to reset your password</p>
                  <center><button className='resetButton' onClick={(e)=>this.onPressReset(e)}>Send</button></center>
                  </center>
                </div>
              }
            </div>
          </div>
        );
    }
}

const mapStateToProps =(state) =>({
  isAuthenticated: state.authState.isAuthenticated,
  loginError: state.authState.loginError,
  reset: state.authState.reset
})

export default connect(mapStateToProps, {resetPassword, resetOff})(Reset);