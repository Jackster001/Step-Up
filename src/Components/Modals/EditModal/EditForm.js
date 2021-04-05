import { Button, Grid, TextField, Typography, withStyles, Select, MenuItem} from '@material-ui/core';
import React, { Component } from 'react';
import {updateJob, openingEditModalFunction} from '../../../Action/profileAction';
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
    },
    deleteButton:{
        color: 'white',
        backgroundColor: '#e0553d',
        '&:hover':{
            backgroundColor: '#f73411'
        }
    }
});


class EditForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contactModalOn:false,
            job_id: this.props.editModalData.job_id,
            Title: this.props.editModalData.Title,
            Company: this.props.editModalData.Company,
            Description: this.props.editModalData.Description,
            Link: this.props.editModalData.Link,
            JobStatus: this.props.editModalData.JobStatus,
            Location: this.props.editModalData.Location,
            DateCreated: this.props.editModalData.DateCreated
        }
    }

    componentDidMount(){
        let currentDate = ""
        if (!!this.props.editModalData.DateCreated){
            currentDate = this.props.editModalData.DateCreated.split("/");
            currentDate = ""+currentDate[2]+"-"+currentDate[0]+"-"+currentDate[1];
        }
        let Location = this.props.editModalData.Location;
        if(this.props.editModalData.Location === undefined){
            Location=""
        }
        this.setState({...this.state, DateCreated: currentDate, Location})
    }

    componentDidUpdate(){
            if(this.props.openingEditModal){
                let currentDate = ""
                if (this.props.editModalData.DateCreated){
                    currentDate = this.props.editModalData.DateCreated.split("/");
                    currentDate = ""+currentDate[2]+"-"+currentDate[0]+"-"+currentDate[1];
                }
                console.log(this.props.editModalData)

                this.props.openingEditModalFunction();
                this.setState({
                    ...this.state,
                    job_id: this.props.editModalData.job_id,
                    Title: this.props.editModalData.Title,
                    Company: this.props.editModalData.Company,
                    Description: this.props.editModalData.Description,
                    Link: this.props.editModalData.Link,
                    JobStatus: this.props.editModalData.JobStatus,
                    DateCreated: currentDate,
                    Location: this.props.editModalData.Location
                })
                this.props.openEditModal();
            }
    }

    setValue = (event) => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    onSubmitEdit = async(e)=>{
        let { Title, Company, Description, Link, JobStatus, DateCreated, Location } = this.state;
        let copy = this.props.editModalData;
        let myDate = DateCreated;
        myDate=myDate.split("-");
        let newDate=""+myDate[1]+"/"+myDate[2]+"/"+myDate[0];
        let Locat = "";
        if(Location !== undefined) Locat = Location
        copy = {
            ...copy, 
            Title,
            Company,
            Description,
            Link,
            JobStatus,
            Location: Locat,
            DateCreated: newDate
        }
        this.props.updateJob(this.props.profile.id, copy, this.props.editIndex)
    }

    render(){
        const { classes } = this.props;
        return (
            <Grid container spacing={5}>
                <Grid item xs={4} style={{paddingBottom: '0px'}}>
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
                    <TextField
                        id="date"
                        label="Date Created"
                        type="date"
                        name="DateCreated"
                        variant="outlined"
                        value={this.state.DateCreated}
                        style={{width: '100%'}}
                        onChange={(e)=> this.setValue(e)}
                    />
                    {/* <TextField className={classes.fieldStyle} label="Date Created" name="DateCreated" variant="outlined" placeholder="Date Created" value={this.state.DateCreated} onChange={(e)=> this.setValue(e)}/> */}
                </Grid>
                <Grid item xs={4}>
                    <TextField className={classes.fieldStyle} label="Location" name="Location" variant="outlined" placeholder="Location" value={this.state.Location} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.fieldStyle} label="Description" name="Description" placeholder="Description" value={this.state.Description} onChange={(e)=> this.setValue(e)}/>
                </Grid>
                <Grid item xs={12} style={{position: 'absolute', bottom: '12px', width:'96%'}}>
                    <Button className={classes.deleteButton} color="primary" variant='contained' style={{float:'left'}} onClick={()=>this.props.onPressRemove()}>Remove Job</Button>
                    <Button color="primary" variant='contained' style={{float:'right', marginLeft: '15px'}} onClick={()=>this.onSubmitEdit()}>Save</Button>
                    <Button color="primary" variant='outlined' style={{float:'right'}} onClick={()=>this.props.closeModal()}>Close</Button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps =(state) =>({
    profile: state.userState.profile,
    editModalData: state.userState.editModalData,
    openingEditModal: state.userState.openingEditModal
})

export default connect(mapStateToProps, {openingEditModalFunction, updateJob})(withStyles(useStyles)(EditForm));