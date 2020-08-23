import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplyJobModal from './Modals/ApplyJobModal';
import {addJob, removeJob, updateJob, getAllJobs, disableUserProfileLoading} from '../Action/profileAction'
class Appliedboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          openModal: false,
          updatedData: {},
          jobsApplied:[]
        }
    }
    componentDidMount(){
      this.setState({...this.state, jobsApplied:this.props.profile.jobsApplied})
      console.log(this.props.profile)
    }
    componentDidUpdate(){
      if(this.props.loadingProfile){
        this.props.disableUserProfileLoading()
        this.setState({...this.state, jobsApplied: this.props.profile.jobsApplied})
        this.closeModal();
      }
    }
    openModal(){
      this.setState({openModal:true})
    }
    closeModal(){
      this.setState({openModal:false})
    }
    onSubmit(v){
      console.log(v)
      this.props.addJob(this.props.profile._id,v);
    }
    render(){
        return (
            <div className="commonContainer">
                <div className="jobBoardHeader">
                    <div className="AppliedTitle"><h3>Jobs Applied</h3></div>
                    <div className="addButtonContainer">
                      <button className="addJobButton" onClick={()=>this.openModal()}>Add Job</button>
                    </div>
                </div>
                <ApplyJobModal openModal={this.state.openModal} close={()=>this.closeModal()} onSubmit={(v)=> this.onSubmit(v)}/>
                <hr/>
                <div className="jobBoardContainer">
                  {this.state.jobsApplied.map(job=>{
                    return(<p>{job.Title}</p>)
                  })}
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated,
    profile: state.userState.profile,
    loadingProfile: state.userState.loadingProfile
})

export default connect(mapStateToProps,{addJob, removeJob, updateJob, getAllJobs, disableUserProfileLoading})(Appliedboard);