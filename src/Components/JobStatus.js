import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar } from '.';
class JobStatus extends Component{
    constructor(props){
        super(props)
        this.state={
            status:(this.props.JobStatus === "Applied"? 1 
                    :this.props.JobStatus === "Interview"? 2
                    :this.props.JobStatus === "Rejected"? 3
                    : 4
                   )
        }
    }
    render(){
        return (
            <div className="jobStatusContainer">
                <div className="jobStatusLeft">
                    <h1>{this.props.Company}</h1>
                    <h2>{this.props.Title}</h2>
                    <p className="editTextButton" onClick={()=>this.props.openEditModal(this.props.Index)}>Edit</p>
                    {!this.props.isAuthenticated ? <button className="signUpButton">Sign Up</button> :<div></div>}
                </div>
                <div className="jobStatusRight">
                    <StatusBar status={(this.props.JobStatus === "Applied"? 1 
                    :this.props.JobStatus === "Interview"? 2
                    :this.props.JobStatus === "Rejected"? 3
                    : 4
                   )}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated
})

export default connect(mapStateToProps)(JobStatus);