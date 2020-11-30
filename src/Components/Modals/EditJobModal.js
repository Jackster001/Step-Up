import React, {Component} from 'react';
import { connect } from 'react-redux';
import {setEditModalData,openingEditModalFunction, addContactInfo, disableContactLoading} from '../../Action/profileAction';
import { FaRegTimesCircle, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import ContactCard from '../ContactCard'
const contactDefault={
    firstName: "",
    lastName: "",
    jobTitle:"",
    contactEmail: "",
    linkedin:"",
    github:"",
    twitter:"",
    notes:""
}
class EditJobModal extends Component{

    constructor(props){
        super(props);
        this.state={
            job_id:"",
            Title: "",
            Company: "",
            Description: "",
            Link: "",
            JobStatus: "",
            openModal:false,
            DateCreated: "",
            removeConfirmation: false,
            contactModal: false,
            contactList: [],
            addContact: false,
            contactInfo:{
                firstName: "",
                lastName: "",
                jobTitle:"",
                contactEmail: "",
                linkedin:"",
                github:"",
                twitter:"",
                notes:""
            }
        }
    }

    componentDidMount(){
        console.log(this.props.editModalData)
        if(this.props.editModalData && this.props.editModalData.DateCreated){
            let currentDate = this.props.editModalData.DateCreated.split("/");
            currentDate = currentDate[2]+"-"+currentDate[0]+"-"+currentDate[1];
            this.setState({
                job_id: this.props.editModalData.job_id,
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
                job_id: this.props.editModalData.job_id,
                Title: this.props.editModalData.Title,
                Company: this.props.editModalData.Company,
                Description: this.props.editModalData.Description,
                Link: this.props.editModalData.Link,
                JobStatus: this.props.editModalData.JobStatus,
                DateCreated: currentDate,
                contactList: this.props.contactList
            })
            this.props.openEditModal()
        }
        if(this.props.contactLoading){
            this.props.disableContactLoading()
            this.setState({...this.state, contactList: this.props.contactList, addContact: false, contactModal: true})
        }
    }

    submit =(e)=>{
        e.preventDefault();
        let myDate = this.state.DateCreated;
        myDate=myDate.split("-");
        let newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
        let posting={
            job_id: this.props.editModalData.job_id,
            Title: this.state.Title,
            Company: this.state.Company,
            Description: this.state.Description,
            Link: this.state.Link,
            JobStatus: this.state.JobStatus,
            DateCreated: newDate,
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

    setContactValues = (event) => {
        event.preventDefault()
        const { value, name } = event.target;
        let contactInfo = this.state.contactInfo;
        contactInfo[name] = value;
        this.setState({...this.state, contactInfo})
    }

    onSubmitContact = (event) => {
        event.preventDefault();
        this.props.addContactInfo(this.props.profile.id, this.state.job_id, this.state.contactInfo)
        this.setState({...this.state, contactInfo: contactDefault})
    }

    onRemoveConfirmation(){
        this.setState({...this.state,removeConfirmation: true, contactModal: false})
    }

    onRemove = () =>{
        this.props.handleRemove(this.props.Index)
        this.setState({removeConfirmation: false})
    }
    handleClose = () =>{
        this.setState({...this.state, contactInfo: contactDefault, removeConfirmation: false, contactModal: false, addContact: false})
        this.props.close()
    }

    render(){
    return (
        <div className={this.props.openModal ? "ModalContainer": "ClosedModal"}>
                {
                    !this.props.removed && !this.state.removeConfirmation  && !this.state.contactModal && !this.state.addContact?
                        <div className="modal">
                            {/* <h3 className="backButton" onClick={()=>this.props.close()}>&#8592; Back</h3> */}
                            <div className="backButtonContainer">
                                <div className="backButton"><FaRegTimesCircle size="35" color="#470eb3" onClick={()=>this.handleClose()}/></div>
                            </div>
                            <center><h2>{this.state.Company}</h2></center>
                            <div className="editTopContainer">
                                <ul className="editNavbar">
                                    <li className="active" onClick={()=> this.setState({...this.state,contactModal: false})}>Job Info</li>
                                    <li onClick={()=> this.setState({...this.state,contactModal: true})}>Contacts</li>
                                </ul>
                            </div>
                            {/* <center><h2>{this.state.Company}</h2></center> */}
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
                                <label for="Link">Description</label>
                                <textarea className="formTextArea" onChange={(e)=> this.setValue(e)} value={this.state.Description} type="text" id="Description" name="Description" placeholder="Description"/>
                            
                                <center><input className="formButton" type="submit" value="Submit"/>
                                <p className="removeTextButton" onClick={()=>this.onRemoveConfirmation()}>Remove</p></center><br/><br/>
                            </form>
                        </div>
                    :   this.state.contactModal? 
                        <div className="ContactModal">
                            <div className="backButtonContainer">
                                <div className="backButton"><FaRegTimesCircle size="35" color="#470eb3" onClick={()=>this.handleClose()}/></div>
                            </div>
                            <center><h2>{this.state.Company}</h2></center>
                            <div className="editTopContainer">
                                <ul className="editNavbar">
                                    <li onClick={()=> this.setState({...this.state,contactModal: false, addContact: false, contactInfo: contactDefault})}>Job Info</li>
                                    <li className="active" onClick={()=> this.setState({...this.state,contactModal: true, addContact: false, contactInfo: contactDefault})}>Contacts</li>
                                </ul>
                                <button className="createContactButton" onClick={()=> this.setState({...this.state,contactModal: false, addContact: true})}>Create Contact</button>
                            </div><br/>
                            <div className="contactCardBox">
                                {this.state.contactList && this.state.contactList.length>0 ? 
                                    <>{this.state.contactList.map((contact,i)=>{
                                        return <ContactCard key={i} contactInfo={contact}/>
                                    })}</>
                                    :
                                    <div>
                                        <center><h3>You have no contacts yet</h3></center>
                                    </div>
                                }
                            </div>
                        </div>
                    :   this.state.addContact? 
                    <div className="ContactModal">
                        <div className="backButtonContainer">
                            <div className="backButton"><FaRegTimesCircle size="35" color="#470eb3" onClick={()=>this.handleClose()}/></div>
                        </div>
                        <center><h2>{this.state.Company}</h2></center>
                        <div className="editTopContainer">
                            <ul className="editNavbar">
                                <li onClick={()=> this.setState({...this.state,contactModal: false, addContact: false, contactInfo: contactDefault})}>Job Info</li>
                                <li className="active" onClick={()=> this.setState({...this.state,contactModal: true, addContact: false, contactInfo: contactDefault})}>Contacts</li>
                            </ul>
                            <button className="createContactButton" onClick={()=> this.setState({...this.state,contactModal: false, addContact: true})}>Create Contact</button>
                        </div>
                        <center><h2>Contact Form</h2></center>
                        <form className="contactForm" onSubmit={(e)=> this.onSubmitContact(e)}>
                            <div className="editInputRow">
                                <div className="editInputContainer">
                                    <label for="firstName">First Name</label>
                                    <input className="formTextInput" onChange={(e)=> this.setContactValues(e)} value={this.state.contactInfo.firstName} type="text" id="firstName" name="firstName"  placeholder="First Name..."/>
                                </div>
                                <div className="editInputContainer">
                                    <label for="lastName">Last Name</label>
                                    <input className="formTextInput" onChange={(e)=> this.setContactValues(e)} value={this.state.contactInfo.lastName} type="text" id="lastName" name="lastName" placeholder="Last Name..."/>
                                </div>
                            </div>
                            <div className="editInputRow">
                                <div className="editInputContainer">
                                    <label for="jobTitle">Job Title</label>
                                    <input className="formTextInput" onChange={(e)=> this.setContactValues(e)} value={this.state.contactInfo.jobTitle} type="text" id="jobTitle" name="jobTitle" placeholder="Job Title..."/>
                                </div>
                                <div className="editInputContainer">
                                    <label for="contactEmail">Contact's Email</label>
                                    <input className="formTextInput" onChange={(e)=> this.setContactValues(e)} value={this.state.contactInfo.contactEmail} type="text" id="contactEmail" name="contactEmail"  placeholder="Contact Email..."/>
                                </div>
                            </div><br/>
                            <div className="editInputRow">
                                <div className="SocialMediaLinkContainer">
                                    <FaLinkedin size="40" className="iconStyle"/>
                                    <input className="formTextInput" onChange={(e)=> this.setContactValues(e)} value={this.state.contactInfo.linkedin} type="text" id="linkedin" name="linkedin"  placeholder="Linkedin link..."/>
                                </div>
                                <div className="SocialMediaLinkContainer">
                                    <FaTwitter size="40" className="iconStyle"/>
                                    <input className="formTextInput" onChange={(e)=> this.setContactValues(e)} value={this.state.contactInfo.twitter} type="text" id="twitter" name="twitter" placeholder="Twitter link..."/>
                                </div>
                            </div>
                            <div className="editInputRow">
                                <div className="SocialMediaLinkContainer">
                                    <FaGithub size="40" className="iconStyle"/>
                                    <input className="formTextInput" onChange={(e)=> this.setContactValues(e)} value={this.state.contactInfo.github} type="text" id="github" name="github" placeholder="Github link..."/>
                                </div>
                            </div><br/>
                            <div className="editInputRow">
                                <div className="contactNoteContainer">
                                    <label for="notes">Notes</label>
                                    <textarea className="formTextArea" onChange={(e)=> this.setContactValues(e)} value={this.state.contactInfo.notes} type="text" id="notes" name="notes" placeholder="Write your notes here..."/>
                                </div>
                            </div><br/><br/>
                            <center><button className="createNewContactButton">Submit New Contact</button></center>
                        </form>
                    </div>
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
    editModalData: state.userState.editModalData,
    contactLoading: state.userState.contactLoading,
    contactList: state.userState.contactList
})
export default connect(mapStateToProps,{setEditModalData, openingEditModalFunction, addContactInfo, disableContactLoading})(EditJobModal);