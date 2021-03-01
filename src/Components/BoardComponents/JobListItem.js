import { Grid, Select, Typography, MenuItem, withStyles} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {updateJob} from '../../Action/profileAction';

const useStyles = (theme) => ({
    listItem: {
        border: '0.5px solid #c7c7c7',
        padding: '15px',
    },
    settingsIcon:{
        marginTop: '15px',
        cursor: 'pointer'
    }
})

class JobListItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            JobStatus: this.props.JobStatus
        }
        this.color =  this.props.JobStatus === "Applied" ? "#26C6DA" 
                    : this.props.JobStatus === "Interview" ? "#42A5F5"
                    : this.props.JobStatus === "Rejected" ? "#846EF5"  
                    : "#EF5350";
    }

    componentDidUpdate(){
        if(this.props.profile.jobsApplied[this.props.index].JobStatus !==  this.state.JobStatus){
            this.setState({JobStatus: this.props.profile.jobsApplied[this.props.index].JobStatus})
        }
    }

    updateStatus(e){
        this.setState({JobStatus: e.target.value})
        let copy = this.props.profile.jobsApplied;
        copy[this.props.index].JobStatus = e.target.value;
        this.props.updateJob(this.props.profile.id, copy[this.props.index], this.props.index)
    }


    render(){
        const { classes } = this.props;
        return (
            <Grid container className={`${classes.listItem}`} style={{borderLeft: "5px solid" + this.color}}>
                <Grid item xs={7}>
                    <Typography variant={'h5'} style={{marginLeft: '10px', fontWeight:'800'}} >{this.props.Company}</Typography>
                    <Grid container spacing={2} style={{marginLeft: '5px'}}>
                        <Grid item xs={6}>
                            {this.props.Title}
                        </Grid>
                        <Grid item xs={6}>
                            {this.props.DateCreated}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={2} style={{marginTop: '0px'}}>
                        <Grid item xs={11}>
                            <Select value={this.state.JobStatus} variant={"outlined"} style={{float: 'right', width: '200px'}} onChange={(e)=>this.updateStatus(e)}>
                                <MenuItem value="Applied">Applied</MenuItem>
                                <MenuItem value="Interview">Interview</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                                <MenuItem value="Offer">Offer</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={1} >
                            <MoreVertIcon className={classes.settingsIcon} onClick={()=>this.props.handleEditModal()}/>
                        </Grid>
                    </Grid>
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

export default connect(mapStateToProps, {updateJob})(withStyles(useStyles)(JobListItem));