import React, {Component} from 'react';
import { connect } from 'react-redux';
import {setEditModalData,openingEditModalFunction} from '../../Action/profileAction'
class EditJobModal extends Component{

    constructor(props){
        super(props);
        this.state={
            Title: "",
            Company: "",
            Description: "",
            Link: "",
            JobStatus: "",
            openModal:false,
            DateCreated: "",
            removeConfirmation: false
        }
    }

    componentDidMount(){
        if(this.props.editModalData && this.props.editModalData.DateCreated){
            let currentDate = this.props.editModalData.DateCreated.split("/");
            currentDate = currentDate[2]+"-"+currentDate[0]+"-"+currentDate[1];
            console.log(currentDate)
            this.setState({
                Title: this.props.editModalData.Title,
                Company: this.props.editModalData.Company,
                Description: this.props.editModalData.Description,
                Link: this.props.editModalData.Link,
                JobStatus: this.props.editModalData.JobStatus,
                DateCreated: ""+currentDate
            })
        }
        
    }
    componentDidUpdate(){
        if(this.props.openingEditModal){
            let currentDate = this.props.editModalData.DateCreated.split("/");
            currentDate = currentDate[2]+"-"+currentDate[0]+"-"+currentDate[1];
            this.props.openingEditModalFunction()
            this.setState({
                Title: this.props.editModalData.Title,
                Company: this.props.editModalData.Company,
                Description: this.props.editModalData.Description,
                Link: this.props.editModalData.Link,
                JobStatus: this.props.editModalData.JobStatus,
                DateCreated: currentDate
            })
            this.props.openEditModal()
        }
    }

    submit =(e)=>{
        e.preventDefault();
        let myDate = this.state.DateCreated;
        myDate=myDate.split("-");
        let newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
        let posting={
            Title: this.state.Title,
            Company: this.state.Company,
            Description: this.state.Description,
            Link: this.state.Link,
            JobStatus: this.state.JobStatus,
            DateCreated: newDate
        };
        this.props.onSubmit(posting)
    }   

    setValue = (event) => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    onRemoveConfirmation(){
        this.setState({removeConfirmation: true})
    }

    onRemove = () =>{
        this.props.handleRemove(this.props.Index)
        this.setState({removeConfirmation: false})
    }

    render(){
    return (
        <div className={this.props.openModal ? "ModalContainer": "ClosedModal"}>
                {
                    !this.props.removed && !this.state.removeConfirmation ?
                        <div className="modal">
                        <h3 className="backButton" onClick={()=>this.props.close()}>&#8592; Back</h3>
                        <center><h2>{this.state.Company}</h2></center>
                        <form class="formContainer" onSubmit={(e)=>this.submit(e)}>
                            <div className="editInputRow">
                                <div className="editInputContainer">
                                    <label for="Company">Company Name</label>
                                    <input className="formTextInput" onChange={(e)=> this.setValue(e)} value={this.state.Company} type="text" id="Company" name="Company" placeholder={this.state.Company}/>
                                </div>
                                <div className="editInputContainer">
                                    <label for="Title">Job Title</label>
                                    <input className="formTextInput" onChange={(e)=> this.setValue(e)} value={this.state.Title} type="text" id="Title" name="Title" placeholder={this.state.Title}/>
                                </div>
                            </div>
                            <div className="editInputRow">
                                <div className="editInputContainer">
                                    <label for="Link">Job Link/URL</label>
                                    <input className="formTextInput" onChange={(e)=> this.setValue(e)} value={this.state.Link} type="text" id="Link" name="Link" placeholder={this.state.Link}/>
                                </div>
                                <div className="editInputContainer">
                                <label for="JobStatus">Job Status</label>
                                    <select className="formTextInput" id="JobStatus" value={this.state.JobStatus} name="JobStatus" onChange={(e)=> this.setValue(e)}>
                                    <option name="JobStatus" value="Applied" onChange={(e)=> this.setValue(e)}>Applied</option>
                                    <option name="JobStatus" value="Interview" onChange={(e)=> this.setValue(e)}>Interview</option>
                                    <option name="JobStatus" value="Rejected" onChange={(e)=> this.setValue(e)}>Rejected</option>
                                    <option name="JobStatus" value="Offer" >Offer</option>
                                </select>
                                </div>
                            </div>
                            <label for="DateCreated">Date Created</label>
                            <input type="date" id="start" name="DateCreated" className="formTextInput" onChange={(e)=> this.setValue(e)} value={this.state.DateCreated}></input>
                            <label for="Link">Job Link/URL</label>
                            <textarea className="formTextArea" onChange={(e)=> this.setValue(e)} value={this.state.Description} type="text" id="Description" name="Description" placeholder="Description"/>
                        
                            <center><input className="formButton" type="submit" value="Submit"/>
                            <p className="removeTextButton" onClick={()=>this.onRemoveConfirmation()}>Remove</p></center><br/><br/>
                        </form></div>
                    :   this.state.removeConfirmation?
                        <div className="modal2">
                            <center><h1>Delete Job</h1>
                            <h2>Are you sure you want to delete this job?</h2>
                            <button className="removeButton" onClick={()=>this.onRemove()}>Remove Job</button></center>
                        </div>
                    :
                    <div className="modal2">
                        <center><h2>Job for {this.state.Company} has been removed</h2>
                        <button className="closeButton" onClick={()=>this.props.close()}>Close</button></center>
                    </div>
                }
        </div>
    );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated,
    profile: state.userState.profile,
    loadingProfileAfterRemoval: state.userState.loadingProfileAfterRemoval,
    openingEditModal: state.userState.openingEditModal,
    editModalData: state.userState.editModalData
})
export default connect(mapStateToProps,{setEditModalData,openingEditModalFunction})(EditJobModal);