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
                    <h3>{this.props.DateCreated}</h3>
                </div>
                <div className="jobStatusMiddle">
                    <StatusBar status={(this.props.JobStatus === "Applied"? 1 
                    :this.props.JobStatus === "Interview"? 2
                    :this.props.JobStatus === "Rejected"? 3
                    : 4
                   )}/>
                </div>
                <div className="jobStatusRight">
                    <h3 className="editTextButton" onClick={()=>this.props.openEditModal(this.props.Index)}>View / Edit</h3>
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated,
})

export default connect(mapStateToProps)(JobStatus);