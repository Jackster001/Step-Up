import React, { Component } from 'react';
import {Button, Container, Grid, withStyles, Typography} from '@material-ui/core';
import { a11yProps, DefaultSideWidth } from '../../../Utils/helper';
import EditForm from './EditForm';
import ContactsBox from './ContactsBox';
import CreateContactForm from './CreateContactForm';
import ContactEditForm from './ContactEditForm';
import { connect } from 'react-redux';
import {getAllContactInfo, disableContactLoading} from '../../../Action/profileAction';

const useStyles = (theme) => ({
    activeLink:{
        color: '#846EF5',
        textDecoration: 'underline',
        fontSize: '16px'
    },
    nonActiveLink:{
        fontSize: '16px'
    }
})

class ContactsContainer extends Component {
    constructor(props) {
        super(props);
        this.state={
            ContactType:"contact-box"
        }
    }

    componentDidMount(){
        this.props.getAllContactInfo(this.props.profile.id);
    }

    componentDidUpdate(){
        if(this.props.ContactType !== this.state.ContactType) {
            this.setState({...this.state, ContactType: this.props.ContactType});
        }
        if(this.props.contactLoading){
            this.props.disableContactLoading();

        }
    }

    render(){
        const { classes } = this.props;
        return (
            <Grid container spacing={5}>
                {this.state.ContactType === "create-form" ? 
                    <CreateContactForm setToContactBox={()=> this.props.setToContactBox()}/>
                : this.state.ContactType === "edit-form" ? 
                    <ContactEditForm/>
                :
                    <ContactsBox setToContactBox={()=> this.props.setToContactBox()} closeModal={()=> this.props.closeModal()} onClickEditContact={()=> this.props.onClickEditContact()} onClickFinishContactChange={()=> this.props.onClickFinishContactChange()}/>
                }
                {/* <Grid item xs={12} style={{position: 'absolute', bottom: '12px', right: '25px'}}>
                    <Button color="primary" variant='contained' style={{float:'right', marginLeft: '15px'}}>Save</Button>
                    <Button color="primary" variant='outlined' style={{float:'right'}}>Close</Button>
                </Grid> */}
                
            </Grid>
        )
    }
}
const mapStateToProps =(state) =>({
    profile: state.userState.profile
})

export default connect(mapStateToProps,{getAllContactInfo, disableContactLoading})(withStyles(useStyles)(ContactsContainer));