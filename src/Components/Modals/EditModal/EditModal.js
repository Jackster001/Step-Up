import React, { Component } from 'react';
import {Button, Container, Grid, withStyles, Typography} from '@material-ui/core';
import { a11yProps, DefaultSideWidth } from '../../../Utils/helper';
import ContactsContainer from './ContactsContainer'
import { connect } from 'react-redux';
import {updateJob} from '../../../Action/profileAction'
import ContactsBox from './ContactsBox';
import CreateContactForm from './CreateContactForm';
// import EditContactForm from './EditContactForm';
import EditForm from './EditForm';
import {getAllContactInfo, disableContactLoading, removeJob} from '../../../Action/profileAction';
import EditDeleteModal from '../EditDeleteModal';

const useStyles = (theme) => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      width: `calc(100% - ${DefaultSideWidth-DefaultSideWidth/2}px)`,
      marginLeft: DefaultSideWidth/2+60,
      marginTop: '20px'
    },
    ModalContainer: {
        position: 'fixed',
        top:0,
        left:0,
        zIndex: 1201,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        // padding: '30px',
        boxSizing: 'border-box'
    },
    modal:{
        width: '70%',
        minHeight: '550px',
        backgroundColor: 'white',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '30px 50px',
        transition: 'all 0.3s ease-out'
      },
    deleteModal:{
        width: '70%',
        minHeight: '550px',
        backgroundColor: 'white',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.3s ease-out'
    },
    activeLink:{
        color: '#846EF5',
        textDecoration: 'underline',
        fontSize: '16px',
        cursor: 'pointer'
    },
    nonActiveLink:{
        fontSize: '16px',
        cursor: 'pointer'
    }
})

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            formType:"Edit",
            ContactType:"contact-box"
        }
    }

    // componentDidUpdate(){
    //     if(this.props.addedContactLoading){
    //         this.props.disableContactLoading();
    //         this.setState({...this.state, formType: "Contact", ContactType: "contact-box"})
    //     }
    // }
    setToContactBox(){
        this.setState({...this.state, formType: "Edit", ContactType: "contact-box"});
    }


    onSubmitEdit = async(v)=>{
        let { Title, Company, Description, Link, JobStatus, DateCreated, Location } = this.state;
        let copy = this.props.editModalData;
        let myDate = DateCreated;
        myDate=myDate.split("-");
        let newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
        copy = {
            ...copy, 
            Title,
            Company,
            Description,
            Link,
            JobStatus,
            newDate,
            Location
        }
        this.props.updateJob(this.props.profile.id, copy, this.props.editIndex)
    }

    onChangeContactType = (v) =>{
        this.setState({...this.state, ContactType: v})
    }

    onClickContact = () => {
        this.props.getAllContactInfo(this.props.profile.id);
        this.setState({...this.state, formType: "Contact", ContactType: "contact-box"});
    }

    onClickEditContact = () =>{
        this.setState({...this.state, ContactType: "contact-edit"})
    }

    onClickFinishContactChange = () =>{
        this.setState({...this.state, formType: "Contact", ContactType: "contact-box"});
    }

    onCloseEditModal = () =>{
        this.props.closeModal();
        this.setState({formType:"Edit", ContactType:"contact-box"})
    }

    onDelete = () => {
        this.props.removeJob(this.props.profile.id, this.props.editIndex);
        this.setState({formType:"Edit", ContactType:"contact-box"})
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={this.props.openModal ? "ModalContainer": "ClosedModal"}>
                <div className={classes.ModalContainer}>
                    <Container className={this.state.formType === 'Delete' ? classes.deleteModal : classes.modal} maxWidth="lg" style={this.state.formType === 'Delete' ? {padding: '0'}:{}}>
                        <Grid container spacing={0} style={this.state.formType === 'Delete' ? {padding: '0'}:{}}>
                            {this.state.formType === 'Delete'
                                ?   <></>
                                :   <>
                                        <Grid item xs={12} style={{paddingBottom:"0"}}>
                                            <Typography variant={"h4"}>Edit Job</Typography>
                                        </Grid>
                                        <Grid item xs={9} style={{paddingTop:"0"}}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={2}>
                                                    <p className={this.state.formType === "Edit" ? classes.activeLink : classes.nonActiveLink} onClick={()=> this.setState({...this.state, formType: "Edit", ContactType: "contact-box"})}>Job Info</p>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <p className={this.state.formType === "Contact" ? classes.activeLink : classes.nonActiveLink} onClick={()=> this.onClickContact()}>Contacts</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>

                            }
                            {   
                                this.state.formType === "Contact" && this.state.ContactType === "contact-box" ?
                                    <Grid item xs={3} style={{paddingTop:"0"}}>
                                        <Button color="primary" variant="contained" style={{float: 'right'}} onClick={()=> this.onChangeContactType("create-form")}>Create Contact</Button>
                                    </Grid>
                                : <></>
                            }
                            {this.state.formType === "Delete" ? <></> : <Grid item xs={12} style={{height:'30px'}}></Grid>}
                        
                        {this.state.formType === "Edit" 
                            ?   <EditForm editIndex={this.props.editIndex} openEditModal={()=> this.props.openEditModal()} closeModal={()=> this.props.closeModal()} onPressRemove={()=>this.setState({formType: "Delete"})}/>
                            :   this.state.formType === "Delete" 
                            ?   <EditDeleteModal onDelete={()=>this.onDelete()} onCancel={()=> this.setState({formType: "Edit"})}/>
                            :   <ContactsContainer ContactType={this.state.ContactType} onChangeContactType={(e) => this.onChangeContactType(e)} setToContactBox={()=>this.setToContactBox()} closeModal={()=> this.onCloseEditModal()} onClickEditContact={()=> this.onClickEditContact()} onClickFinishContactChange={()=> this.onClickFinishContactChange()}/>
                        }
                        </Grid>
                        {/* <Grid item xs={12} style={{position: 'absolute', bottom: '12px', right: '25px'}}>
                            <Button color="primary" variant='contained' style={{float:'right', marginLeft: '15px'}} onClick={()=>this.onSubmitEdit()}>Save</Button>
                            <Button color="primary" variant='outlined' style={{float:'right'}} onClick={()=>this.props.closeModal()}>Close</Button>
                        </Grid> */}
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps =(state) =>({
    profile: state.userState.profile,
    addedContactLoading: state.userState.addedContactLoading,
    contactList: state.userState.contactList,
})

export default connect(mapStateToProps, {updateJob, getAllContactInfo, disableContactLoading, removeJob})(withStyles(useStyles)(EditModal));