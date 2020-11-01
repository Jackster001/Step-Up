import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplyJobModal from './Modals/ApplyJobModal';
import {addJob, removeJob, updateJob, getAllJobs, disableUserProfileLoading} from '../Action/profileAction';
import {JobStatus} from './';
import EditJobModal from './Modals/EditJobModal';
import {setEditModalData,openingEditModalFunction} from '../Action/profileAction' 
import RemoveModal from './Modals/RemoveModal';
import filterIcon from '../Assets/Filter_Icon.svg';
class Appliedboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          openModal: false,
          updatedData: {},
          jobsApplied:[],
          openEditModal: false,
          editData: {},
          editIndex:0,
          query: "",
          SearchError: false,
          openRemoveModal: false,
          removed: false,
          showCheckboxes: false,
          checkBox:[
            {value: "Applied", isChecked: false},
            {value: "Rejected", isChecked: false},
            {value: "Interview", isChecked: false},
            {value: "Offer", isChecked: false}
          ],
          checked: {}
        }
    }
    componentDidMount(){
      this.setState({...this.state, jobsApplied:this.props.profile.jobsApplied})
    }
    componentDidUpdate(){
      if(this.props.loadingProfile){
        this.props.disableUserProfileLoading()
        this.setState({
          jobsApplied: this.props.profile.jobsApplied
        }, () => {
          this.closeModal();
          if(!this.state.removed){
            this.closeEditModal()
          }
        });
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
      this.setState({openEditModal:false, editIndex:0, removed: false})
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
      this.setState({removed: true})
    }
    onPressShowFilter(){
      let opposite = this.state.showCheckboxes;
      this.setState({showCheckboxes: !opposite})
    }
    onPressChangeFilter(e){
      let value = e.target.value;
      var checkBox= this.state.checkBox
      let map ={}
      for(let i=0; i< checkBox.length; i++){
        if(value === checkBox[i].value && checkBox[i].isChecked === false){
            checkBox[i].isChecked = !checkBox[i].isChecked;
            map[checkBox[i].value] = true;
            this.setState({checkBox: checkBox})
        }
        else if(value === checkBox[i].value && checkBox[i].isChecked === true){
          checkBox[i].isChecked = false
          this.setState({checkBox: checkBox})
        }else if(checkBox[i].isChecked === true){
          map[checkBox[i].value] = true;
        }
      }
      if(JSON.stringify(map) === '{}') return this.setState({jobsApplied: this.props.profile.jobsApplied, checked : {}})
      let jobsFiltered = [];
      for(let i=0; i< this.props.profile.jobsApplied.length; i++){
        if(map[this.props.profile.jobsApplied[i].JobStatus]){
          jobsFiltered.push(this.props.profile.jobsApplied[i])
        }
      }
      return this.setState({jobsApplied: jobsFiltered, checked: map})
      
    }
    render(){
        return (
            <div className="JobContainer">
              <div className="AppliedTitle"><h1>Jobs Tracker ({this.state.jobsApplied.length})</h1></div>
                <div className="jobBoardHeader">
                    <div className="SearchContainer">
                      <input className="SearchInput" type="text" placeholder="Search for Applied Jobs ..." onChange={(e)=> this.handleSearchInput(e)} onKeyDown={()=>this.search(this.state.query)}></input>
                      <button className="Search-Button" onClick={()=>this.search(this.state.query)}>Search</button>
                    </div>
                    <div className="addButtonContainer">
                      <button className="addJobButton" onClick={()=>this.openModal()}>Add Job</button>
                      <div className="MultiSelectContainer">
                        <img className="filterIcon" src={filterIcon} onClick={()=> this.onPressShowFilter()}/>
                          {
                            this.state.showCheckboxes ?
                              <div id="checkboxes">
                                <label for="one">
                                  <input type="checkbox" id="one" value="Applied" onChange={(e)=>this.onPressChangeFilter(e)} checked={!!this.state.checked["Applied"]}/>Applied</label>
                                <label for="two">
                                  <input type="checkbox" id="two" value="Rejected" onChange={(e)=>this.onPressChangeFilter(e)} checked={!!this.state.checked["Rejected"]}/>Rejected</label>
                                <label for="three">
                                  <input type="checkbox" id="three" value="Interview" onChange={(e)=>this.onPressChangeFilter(e)} checked={!!this.state.checked["Interview"]}/>Interview</label>
                                <label for="four">
                                  <input type="checkbox" id="four" value="Offer" onChange={(e)=>this.onPressChangeFilter(e)} checked={!!this.state.checked["Offer"]}/>Offer</label>
                              </div>
                            : <div></div>
                          }
                        </div>
                    </div>
                </div>
                <EditJobModal removed={this.state.removed} openEditModal={()=>this.openEditModal()} Index={this.state.editIndex} handleRemove={()=>this.handleRemove(this.state.editIndex)} openModal={this.state.openEditModal} close={()=>this.closeEditModal()} onSubmit={(v)=> this.onSubmitEdit(v,this.state.editIndex)}/> 
                <ApplyJobModal openModal={this.state.openModal} close={()=>this.closeModal()} onSubmit={(v)=> this.onSubmit(v)}/>
                <div className="jobsInnerContainer">
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
                            DateCreated={job.DateCreated}
                            openEditModal={()=>this.handleEditModal(i)} 
                            handleRemove={()=>this.handleRemove(i)}
                          />
                          <RemoveModal Index={i} Title={job.Title} Company={job.Company} openModal={this.state.openRemoveModal} close={()=>this.closeRemoveModal()}/>
                        </div>
                      )
                    })}
                  </div>
                }
                </div>
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

export default connect(mapStateToProps,{addJob, removeJob, updateJob, getAllJobs, disableUserProfileLoading,setEditModalData,openingEditModalFunction})(Appliedboard);