import React, { Component } from 'react';
import { connect } from 'react-redux';
class Startbox extends Component{
    render(){
        return (
            <div className="startBox">
                <div className="leftStart">
                    <h1>Track your Job</h1>
                    <p>Withh Step Up you can connect your Indeed or Linkedin account and check what hiring step you are on</p>
                    {!this.props.isAuthenticated ? <a href="/signup"><button className="signUpButton">Sign Up</button></a> :<div></div>}
                </div>
                <div className="rightStart"></div>
            </div>
        );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated
})

export default connect(mapStateToProps)(Startbox);