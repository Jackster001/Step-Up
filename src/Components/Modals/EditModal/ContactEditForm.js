import { Button, Grid, TextField, Typography, withStyles, Select, MenuItem, Container} from '@material-ui/core';
import React, { Component } from 'react';
import {updateJob, openingEditModalFunction, addContactInfo, editContactInfo} from '../../../Action/profileAction';
import { connect } from 'react-redux';

const useStyles = (theme) => ({
    fieldStyle:{
        width: '100%',
    },
    inputStyle:{
        padding: '12px 7px'
    },
    buttonStyle:{
        padding: '9px 14px'
    },
    activeLink:{
        color: '#846EF5',
        textDecoration: 'underline',
        fontSize: '16px'
    },
    nonActiveLink:{
        fontSize: '16px'
    },
    itemStyle:{
        paddingBottom: '0px'
    }
});


class ContactEditForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contactEmail: "",
            firstName: "",
            lastName: "",
            github: "",
            jobTitle: "",
            linkedin: "",
            notes: "",
            otherUrl: "",
            phoneNumber: "",
            twitter: ""
        }
    }

    componentDidMount(){
        this.setState({...this.props.contactInfo})
    }

    setValue = (event) => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    onSubmitContactEdit =()=> {
        let copy = this.props.contactList[this.props.editModalData.job_id];
        copy[this.props.editIndex] = {...this.state};
        this.props.editContactInfo(this.props.profile.id, this.props.editModalData.job_id, copy);
    }

    render(){
        const { classes } = this.props;
        return (
            <Grid container spacing={5}>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="First Name (Required)" name="firstName" variant="outlined" value={this.state.firstName} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Last Name (Required)" name="lastName"  variant="outlined" value={this.state.lastName} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Job Title" name="jobTitle"  variant="outlined" value={this.state.jobTitle} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Email Address" name="contactEmail" variant="outlined" value={this.state.contactEmail} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Phone Number" name="phoneNumber" variant="outlined" value={this.state.phoneNumber} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Linkedin URL" name="linkedin" variant="outlined" value={this.state.linkedin} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Github URL" name="github" variant="outlined" value={this.state.github} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Twitter URL" name="twitter" variant="outlined" value={this.state.twitter} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Other URL" name="otherUrl" variant="outlined" value={this.state.otherUrl} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.fieldStyle} label="Notes" name="notes" value={this.props.notes} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={12} style={{position: 'absolute', bottom: '12px', right: '25px'}}>
                    <Button color="primary" variant='contained' style={{float:'right', marginLeft: '15px'}} onClick={()=> this.onSubmitContactEdit()}>Save Contact</Button>
                    <Button color="primary" variant='outlined' style={{float:'right'}} onClick={()=> this.props.onClear()}>Cancel</Button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps =(state) =>({
    profile: state.userState.profile,
    editModalData: state.userState.editModalData,
    openingEditModal: state.userState.openingEditModal,
    contactList: state.userState.contactList,
})

export default connect(mapStateToProps, {openingEditModalFunction, updateJob, addContactInfo, editContactInfo})(withStyles(useStyles)(ContactEditForm));