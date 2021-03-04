import { Button, Grid, TextField, Typography, withStyles, Select, MenuItem, Container} from '@material-ui/core';
import React, { Component } from 'react';
import {updateJob, openingEditModalFunction, addContactInfo} from '../../../Action/profileAction';
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


class CreateContactForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
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

    componentDidMount(){
    console.log(this.props.editModalData);
    }

    setValue = (event) => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    onCreateContact = () => {
        let contact = {...this.state}
        if(contact.firstName.length && contact.lastName.length) {
            this.props.addContactInfo(this.props.profile.id, this.props.editModalData.job_id, contact);
        }
        this.props.setToContactBox();
        // this.props.addContactInfo(this.props.profile.id, this.props.editModalData.job_id, this.state.contactInfo);
        // await this.props.editContactInfo(this.props.profile.id, this.state.job_id, copy)
    }

    onSubmitEdit = async(e)=>{
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

    render(){
        const { classes } = this.props;
        return (
            <Container maxWidth="lg">
            <Grid container spacing={4}>
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
                    <Button color="primary" variant='contained' style={{float:'right', marginLeft: '15px'}} onClick={()=>this.onCreateContact()}>Add Contact</Button>
                </Grid>
                {/* <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Company Name (Required)" name="Company" variant="outlined" placeholder="Company Name" value={this.state.Company} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Job Title (Required)" name="Title"  variant="outlined" placeholder="Job Title" value={this.state.Title} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
                    <TextField className={classes.fieldStyle} label="Job URL" name="Link" variant="outlined" placeholder="Job URL" value={this.state.Link} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4} >
                    <Select
                        className={classes.fieldStyle}
                        value={this.state.JobStatus}
                        onChange={(e)=> this.setValue(e)}
                        variant="outlined"
                        name="JobStatus"
                    >
                    <MenuItem value={"Applied"}>Applied</MenuItem>
                    <MenuItem value={"Interview"}>Interview</MenuItem>
                    <MenuItem value={"Rejected"}>Rejected</MenuItem>
                    <MenuItem value={"Offer"}>Offer</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <TextField className={classes.fieldStyle} label="Date Created" name="DateCreated" variant="outlined" placeholder="Date Created" value={this.state.DateCreated} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={4}>
                    <TextField className={classes.fieldStyle} label="Location" name="Location" variant="outlined" placeholder="Location" value={this.state.Location} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.fieldStyle} label="Description" name="Description" placeholder="Description" value={this.state.Description} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={12} style={{position: 'absolute', bottom: '12px', right: '25px'}}>
                    <Button color="primary" variant='contained' style={{float:'right', marginLeft: '15px'}} onClick={()=>this.onSubmitEdit()}>Save</Button>
                    <Button color="primary" variant='outlined' style={{float:'right'}} onClick={()=>this.props.closeModal()}>Close</Button>
                </Grid> */}
            </Grid>
        </Container>
        );
    }
}

const mapStateToProps =(state) =>({
    profile: state.userState.profile,
    editModalData: state.userState.editModalData,
    openingEditModal: state.userState.openingEditModal,
    contactList: state.userState.contactList,
})

export default connect(mapStateToProps, {openingEditModalFunction, updateJob, addContactInfo})(withStyles(useStyles)(CreateContactForm));