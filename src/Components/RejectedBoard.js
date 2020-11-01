import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplyJobModal from './Modals/ApplyJobModal';
import {addJob, removeJob, updateJob, getAllJobs, disableUserProfileLoading} from '../Action/profileAction';
import {JobStatus} from './';
import EditJobModal from './Modals/EditJobModal';
import {setEditModalData,openingEditModalFunction} from '../Action/profileAction' 
import RemoveModal from './Modals/RemoveModal';
class RejectedBoard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          openModal: false,
          updatedData: {},
          rejections:[],
          openEditModal: false,
          editData: {},
          editIndex:0,
          query: "",
          SearchError: false,
          openRemoveModal: false
        }
    }
    componentDidMount(){
      this.setState({...this.state, rejections:this.props.profile.rejections})
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
    handleEditModal(i){
      this.setState({editIndex:i})
      this.props.setEditModalData(this.state.jobsApplied[i])
    }
    openEditModal(){
      this.setState({openEditModal: true})
    }
    closeEditModal(){
      this.setState({openEditModal:false, editIndex:0})
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
      // this.openRemoveModal()
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
                <EditJobModal openEditModal={()=>this.openEditModal()} Index={this.state.editIndex} openModal={this.state.openEditModal} close={()=>this.closeEditModal()} onSubmit={(v)=> this.onSubmitEdit(v,this.state.editIndex)}/> 
                <ApplyJobModal openModal={this.state.openModal} close={()=>this.closeModal()} onSubmit={(v)=> this.onSubmit(v)}/>
                {
                  this.state.jobsApplied.length ===0 ? 
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
                            openEditModal={()=>this.handleEditModal(i)} 
                            handleRemove={()=>this.handleRemove(i)}
                          />
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
    loadingProfile: state.userState.loadingProfile,
    editModalData: state.userState.editModalData,
    openingEditModal: state.userState.openingEditModal
})

export default connect(mapStateToProps,{addJob, removeJob, updateJob, getAllJobs, disableUserProfileLoading,setEditModalData,openingEditModalFunction})(RejectedBoard);