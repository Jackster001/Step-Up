import React, { Component } from 'react';
import {Button, Container, Grid, withStyles} from '@material-ui/core';
import ContactCard from './ContactCard';
import { connect } from 'react-redux';
import {disableContactLoading, getAllContactInfo} from '../../../Action/profileAction';
import ContactEditForm from './ContactEditForm';

const useStyles = (theme) => ({
    activeLink:{
        color: '#846EF5',
        textDecoration: 'underline',
        fontSize: '16px'
    },
    nonActiveLink:{
        fontSize: '16px'
    },
    contactContainer:{
        width: '100%', 
        height: '315px',
        overflowY: 'auto',
        border: "0.3px solid #bfbfbf",
        borderRadius: '5px', 
        paddingBottom: '15px'
    }
})

class ContactsBox extends Component {
    constructor(props) {
        super(props);
        this.state={
            contactList:[],
            contactEditFormOn: false,
            editIndex:0,
            contactInfo: {
                firstName: "",
                lastName: "",
                jobTitle: "",
                phoneNumber: "",
                contactEmail: "",
                linkedin: "",
                github: "",
                twitter: "",
                otherUrl: "",
                notes: ""
            }
        }
    }


    componentDidUpdate(){
        if(this.props.contactLoading){
            this.props.disableContactLoading();
            this.setState({
                ...this.state,
                contactList:this.props.contactList[this.props.editModalData.job_id],
                contactEditFormOn: false
            })
            this.props.onClickFinishContactChange();
        }
        if(this.props.addedContactLoading){
            this.props.disableContactLoading();
            this.setState({
                ...this.state,
                contactList:this.props.contactList[this.props.editModalData.job_id]
            })
            this.props.onClickFinishContactChange();
        }
    }

    openEdit(contact, i){
        this.setState({...this.state, contactInfo: contact, contactEditFormOn: true, editIndex: i});
        this.props.onClickEditContact();
    }

    onClear(){
        let contactInfo={
            firstName: "",
            lastName: "",
            jobTitle: "",
            phoneNumber: "",
            contactEmail: "",
            linkedin: "",
            github: "",
            twitter: "",
            otherUrl: "",
            notes: ""
        }
        this.setState({...this.state, contactInfo, contactEditFormOn: false});
        this.props.onClickFinishContactChange();
    }

    render(){
        const { classes } = this.props;
        return (
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        {this.state.contactList && this.state.contactList.length && !this.state.contactEditFormOn 
                            ? 
                                <><div className={classes.contactContainer}>{this.state.contactList.map((contact,i)=>{
                                    return <ContactCard key={i} contactInfo={contact} openEdit={()=> this.openEdit(contact,i)}/>
                                    })}
                                </div>
                                
                                </>
                            :   this.state.contactEditFormOn ?
                                <ContactEditForm index={this.props.editModalData.job_id} contactInfo={this.state.contactInfo} editIndex={this.state.editIndex} onClear={()=> this.onClear()} onClickFinishContactChange={()=> this.props.onClickFinishContactChange()}/>
                            :
                                <div>
                                    <center><h3>You have no contacts yet</h3></center>
                                </div>
                        }
                    </Grid>
                    {!this.state.contactEditFormOn ?
                        <Grid item xs={12} style={{position: 'absolute', bottom: '12px', right: '25px'}}>
                            {/* <Button color="primary" variant='contained' style={{float:'right', marginLeft: '15px'}}>Save</Button> */}
                            <Button color="primary" variant='outlined' style={{float:'right'}} onClick={()=> this.props.closeModal()}>Close</Button>
                        </Grid>
                        :<></>
                    }
                </Grid>
            </Container>
        )
    }
}
const mapStateToProps =(state) =>({
    profile: state.userState.profile,
    contactList: state.userState.contactList,
    contactLoading: state.userState.contactLoading,
    addedContactLoading: state.userState.addedContactLoading,
    editModalData: state.userState.editModalData,
})

export default connect(mapStateToProps,{disableContactLoading, getAllContactInfo})(withStyles(useStyles)(ContactsBox));