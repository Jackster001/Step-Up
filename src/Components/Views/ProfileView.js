import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileView extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className={classes.root}>
                <center><h1>My Account</h1></center>
                <div className="ProfileContainer">
                    <h3>Name: {this.props.profile.firstName} {this.props.profile.lastName}</h3>
                    <h3>Email: {this.props.profile.email}</h3><br/><br/>
                    <center><button className="signOutButton" onClick={()=>this.props.logoutUser()}>Sign Out</button></center>
                </div>
            </div>
        )
    }
    
}
export default connect()(ProfileView);