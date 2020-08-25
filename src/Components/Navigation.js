import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as routes from '../Routes/routes';
import { connect } from 'react-redux';
import { logoutUser } from '../Action/authAction';

class Navigation extends Component{
    constructor(props){
        super(props)
        this.state={
            navigationType:"navigation",
            initials:""
        }
    }
    NonAuthBar(){
        return(
            <div className="navBar">
                <div className="navLogoContainer">
                    <h1>Step Up</h1>
                </div>
                <div className="navULContainer">
                    <ul className="navUL">
                        <li><Link className="linkColor" to={routes.LANDING}>Home</Link></li>
                        <li><Link className="linkColor" to={routes.LOGIN}>Dashboard</Link></li>
                    </ul>
                </div>
                <div className="navULContainer">
                    <ul className="navUL2">
                        <li><Link className="linkColor" to={routes.SIGNUP}>Sign Up</Link></li>
                        <li><Link className="linkColor" to={routes.LOGIN}>Sign In</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
    AuthBar(){
        return(
            <div className="navBar">
                <div className="navLogoContainer">
                    <h1>Step Up</h1>
                </div>
                <div className="navULContainer">
                    <ul className="navUL">
                        <li><Link className="linkColor" to={routes.HOME}>Home</Link></li>
                        <li ><Link className="linkColor" to={routes.DASHBOARD}>Dashboard</Link></li>
                    </ul>
                </div>
                <div className="navULContainer">
                    <div className="accountCircleContainer">
                        <div className="accountCircle">
                            <Link className="linkAccount" to={routes.ACCOUNT}>{this.props.isAuthenticated ? `${this.props.profile.firstName.charAt(0)}${this.props.profile.lastName.charAt(0)}`:""}</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render(){
        return (
            <div>
                {this.props.isAuthenticated ? this.AuthBar() : this.NonAuthBar()}
            </div>
        )
    }


}


const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated,
    profile: state.userState.profile
})
  
export default connect(mapStateToProps, {logoutUser})(Navigation);