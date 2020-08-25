import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplyJobModal from './Modals/ApplyJobModal';
import {addJob, removeJob, updateJob, getAllJobs, disableUserProfileLoading} from '../Action/profileAction';
import {JobStatus} from './';
import EditJobModal from './Modals/EditJobModal';
import RemoveModal from './Modals/RemoveModal';
class Appliedboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          openModal: false,
          updatedData: {},
          jobsApplied:[],
          openEdit: false,
          editIndex:null,
          query: "",
          SearchError: false,
          openRemoveModal: false
        }
    }
    componentDidMount(){
      this.setState({...this.state, jobsApplied:this.props.profile.jobsApplied})
    }
    componentDidUpdate(){
      if(this.props.loadingProfile){
        this.props.disableUserProfileLoading()
        this.setState({jobsApplied: this.props.profile.jobsApplied})
        this.closeModal();
        this.closeEditModal()
      }
    }
    openModal(){
      this.setState({openModal:true})
    }
    closeModal(){
      this.setState({openModal:false})
    }
    openEditModal(i){
      this.setState({openEdit:true, editIndex: i})
    }
    closeEditModal(){
      this.setState({openEdit:false, editIndex:null})
    }
    openRemoveModal(){
      this.setState({openRemoveModal: true})
    }
    closeRemoveModal(){
      this.setState({openRemoveModal: false})
    }
    onSubmit(v){
      this.props.addJob(this.props.profile.id,v);
    }
    onSubmitEdit(v,i){
      this.props.updateJob(this.props.profile.id,v,i)
    }
    handleSearchInput(e){
      let value = e.target.value.toLowerCase()
      this.setState({query: value})
    }
    search(query){
      if(query === ""){
        this.setState({jobsApplied: this.props.profile.jobsApplied, SearchError: false})
        return;
      }
      let newData = []
      this.state.jobsApplied.forEach(job=>{
        if(job.Title.toLowerCase().includes(query) || job.Company.toLowerCase().includes(query)){
          newData.push(job)
        }
      })

      this.setState({SearchError: false, jobsApplied: newData})
    }
    handleRemove(i){
      this.props.removeJob(this.props.profile.id, i)
      this.openRemoveModal()
    }
    render(){
        return (
            <div className="JobContainer">
                <div className="jobBoardHeader">
                    <div className="AppliedTitle"><h3>Jobs Applied</h3></div>
                    <div className="SearchContainer">
                      <input className="SearchInput" type="text" placeholder="Search for Applied Jobs ..." onChange={(e)=> this.handleSearchInput(e)}></input>
                      <button className="Search-Button" onClick={()=>this.search(this.state.query)}>Search</button>
                    </div>
                    <div className="addButtonContainer">
                      <button className="addJobButton" onClick={()=>this.openModal()}>Add Job</button>
                    </div>
                </div>
                <ApplyJobModal openModal={this.state.openModal} close={()=>this.closeModal()} onSubmit={(v)=> this.onSubmit(v)}/>
                {
                  this.props.profile.jobsApplied.length ===0 ? 
                    <div>
                      <h1>You have not applied to any Jobs yet</h1>
                    </div>
                  : !!this.state.SearchError ?
                    <div>
                      <h1>We did not find anything. Please make a new search.</h1>
                    </div>
                  :
                  <div className="jobBoardContainer">
                    {this.state.jobsApplied.map((job,i)=>{
                      return(
                        <div>
                          <JobStatus 
                            Title={job.Title}
                            Company={job.Company}
                            Link={job.Link}
                            JobStatus = {job.JobStatus}
                            Index={i}
                            openEditModal={()=>this.openEditModal(i)} 
                            handleRemove={()=>this.handleRemove(i)}
                          />
                          <EditJobModal jobProps={job} openModal={this.state.openEdit} close={()=>this.closeEditModal()} onSubmit={(v)=> this.onSubmitEdit(v,i)}/>
                          <RemoveModal Title={job.Title} Company={job.Company} openModal={this.state.openRemoveModal} close={()=>this.closeRemoveModal()}/>
                        <hr/>
                        </div>
                      )
                    })}
                  </div>
                }
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