import { Grid, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobListItem from './JobListItem';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = (theme) => ({
    ul:{
        '& .MuiPagination-ul':{
            justifyContent: 'center'
        }
    },
    fontStyle:{
        float: 'right', 
        marginTop: '18px', 
        fontWeight: '0', 
        fontSize: '16px',
        cursor: 'pointer'
    }
});


class JobBoard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            jobs: this.props.jobs,
            indexedJobs: [],
            loaded: false,
            index: 1,
            paginationSize: 0
        }
        this.color =  this.props.title === "Applied" ? "#26C6DA" 
        : this.props.title === "Interview" ? "#42A5F5"
        : this.props.title === "Rejected" ? "#846EF5"  
        : "#EF5350";
    }

    componentDidUpdate(){
        if((this.props.jobs.length>0 && !this.state.loaded) || this.props.jobs !== this.state.jobs){
            let paginationSize = Math.ceil(this.props.jobs.length / 5);
            let indexedJobs = this.formatPage(1);
            this.setState({...this.state, loaded: true, paginationSize, indexedJobs, jobs: this.props.jobs, index : 1})
        }
    }

    formatPage(index){
        let indexedJobs = [];
        let i = index * 5 - 5;
        let count = 0;

        while(count < 5 && !!this.props.jobs[i]){
            count++;
            indexedJobs.push(this.props.jobs[i]);
            i++;
        }
        
        return indexedJobs;
    }

    switchPage(e, v){
        let indexedJobs = this.formatPage(v);
        this.setState({...this.state, indexedJobs, index: v})
    }

    render(){
        const { classes } = this.props;
        return (
            <>
            {this.props.jobs.length ? 
                <>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography variant={'h4'} style={{color: this.color}}>{this.props.title}</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography className={classes.fontStyle}>Click here to view all jobs in {this.props.title}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.indexedJobs ? this.state.indexedJobs.map((job)=>{
                            return <JobListItem index={job.index} Company={job.Company} Title={job.Title} DateCreated={job.DateCreated} JobStatus={job.JobStatus} handleEditModal={()=>this.props.handleEditModal(job.index)}/>
                        }):<></>}
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.paginationSize > 0 ? <Pagination color="primary" page={this.state.index} count={this.state.paginationSize} variant="outlined" onChange={(e,v) => this.switchPage(e,v)} className={classes.ul}/> : <></>}
                    </Grid>
                    </Grid>
                </>
            : <></>
            }
            </>
        );
    }
}

const mapStateToProps =(state) =>({
})

export default connect(mapStateToProps)(withStyles(useStyles)(JobBoard));