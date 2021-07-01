import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobBoard from '../BoardComponents/JobBoard';
import SearchBar from '../BoardComponents/SearchBar';
import {addJob, removeJob, updateJob, getAllJobs, disableUserProfileLoading, setEditModalData, openingEditModalFunction} from '../../Action/profileAction';
import { Typography } from '@material-ui/core';
import TutorialBar from '../Tutorial/TutorialBar';
import {setCard, finishSettingCard, setJobData} from '../../Action/jobBoardViewAction';

class JobListView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statusTypes: ["Applied", "Interview", "Offer", "Rejected"],
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
            checked: {},
            Applied: [], 
            Interview: [],
            Rejected: [], 
            Offer: [],
            searchKeyword: ""
        }
    }

    componentDidMount(){
        this.props.setJobData(this.props.profile.id);
    }

    componentDidUpdate(){
        if(this.props.loadingData){
            this.props.finishSettingCard();
            let jobData = this.props.jobData;
            let jobs = [];
            for(let i = 0; i < this.state.statusTypes.length; i++){
                console.log(jobData[this.state.statusTypes[i]])
                jobs = jobs.concat(jobData[this.state.statusTypes[i]]);
            }
            console.log(jobs)
            this.organizeJobs(jobs);
        }
    }

    organizeJobs = (jobs) => {
        let Applied = [], Interview = [], Rejected = [], Offer = [];
        for(let i = 0; i < jobs.length; i++){
            jobs[i].index = i
            if(jobs[i].JobStatus === "Applied") Applied.push(jobs[i]);
            else if(jobs[i].JobStatus === "Interview") Interview.push(jobs[i]);
            else if(jobs[i].JobStatus === "Rejected") Rejected.push(jobs[i]);
            else if(jobs[i].JobStatus === "Offer") Offer.push(jobs[i]);
        }
        this.setState({...this.state, Applied: Applied, Interview: Interview, Rejected: Rejected, Offer: Offer, indexUpdate: this.props.index});
    }

    onPressSearch = () =>{
        let jobData = this.props.jobData;
        let statusTypes = this.state.statusTypes;
        let jobs = [];
        for(let i = 0; i< statusTypes.length; i++){
            for(let j=0; j< jobData[statusTypes[i]].length; j++){
                if(jobData[statusTypes[i]][j].Company.indexOf(this.state.searchKeyword) !== -1 || jobData[statusTypes[i]][j].Title.indexOf(this.state.searchKeyword) !== -1){
                    jobs.push(jobData[statusTypes[i]][j]);
                }
            }
            // if(jobsApplied[i].Company.indexOf(this.state.searchKeyword) !== -1 || jobsApplied[i].Title.indexOf(this.state.searchKeyword) !== -1){
            //     jobs.push(jobsApplied[i]);
            // }
        }
        console.log(jobs)
        this.organizeJobs(jobs);
    }

    onChangeValue = (e) => {
        this.setState({...this.state, searchKeyword: e.target.value})
    }

    render(){
        return (
            <>
                {/* <TutorialBar/> */}
                { this.props.profile.jobsApplied.length ?
                    <>
                        <br/><br/><SearchBar value={this.props.searchKeyword} onPressSearch={this.onPressSearch} onChangeValue={this.onChangeValue}/><br/><br/>
                        <JobBoard title="Applied" jobs={this.state.Applied} handleEditModal={(i)=> this.props.handleEditModal(i)} openModal={()=> this.props.openModal()} /><br/><br/>
                        <JobBoard title="Interview" jobs={this.state.Interview} handleEditModal={(i)=> this.props.handleEditModal(i)} openModal={()=> this.props.openModal()} /><br/><br/>
                        <JobBoard title="Rejected" jobs={this.state.Rejected} handleEditModal={(i)=> this.props.handleEditModal(i)} openModal={()=> this.props.openModal()} /><br/><br/>
                        <JobBoard title="Offer" jobs={this.state.Offer} handleEditModal={(i)=> this.props.handleEditModal(i)} openModal={()=> this.props.openModal()} />
                    </>
                :
                    <Typography variant={'h3'}>You do not added any jobs yet</Typography>
                }
            </>
        )
    }
    
}

const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated,
    profile: state.userState.profile,
    loadingProfile: state.userState.loadingProfile,
    editModalData: state.userState.editModalData,
    openingEditModal: state.userState.openingEditModal,
    loadingData: state.jobDataState.loadingData,
    jobData: state.jobDataState.jobData
})

export default connect(mapStateToProps, {addJob, removeJob, updateJob, getAllJobs, disableUserProfileLoading, setEditModalData, openingEditModalFunction, setJobData, finishSettingCard})(JobListView);