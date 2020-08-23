import React, { Component } from 'react';
import {connect} from 'react-redux';
import { logoutUser } from '../Action/authAction';
class Account extends Component {

    componentDidMount(){
        console.log(this.props.profile)
    }
    render() {
        return (
        <div>
            <center><h1>My Account</h1></center>
            <div className="ProfileContainer">
                <h3>Name: {this.props.profile.firstName} {this.props.profile.lastName}</h3>
                <h3>Email: {this.props.profile.email}</h3><br/><br/>
                <center><button className="signOutButton" onClick={()=>this.props.logoutUser()}>Sign Out</button></center>
            </div>
        </div>
        );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated : state.authState.isAuthenticated,
    profile: state.userState.profile
})

export default connect(mapStateToProps, {logoutUser})(Account);