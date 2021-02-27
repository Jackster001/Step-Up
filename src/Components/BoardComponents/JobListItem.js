import { Grid, Select, Typography, MenuItem, withStyles} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = (theme) => ({
    listItem: {
        border: '0.5px solid #c7c7c7',
        padding: '15px',
    },
})

class JobListItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        this.color =  this.props.JobStatus === "Applied" ? "#26C6DA" 
                    : this.props.JobStatus === "Interview" ? "#42A5F5"
                    : this.props.JobStatus === "Rejected" ? "#846EF5"  
                    : "#EF5350";
        
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
                            <Select value={this.props.JobStatus} variant={"outlined"} style={{float: 'right', width: '200px'}}>
                                <MenuItem value="Applied">Applied</MenuItem>
                                <MenuItem value="Interview">Interview</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                                <MenuItem value="Offer">Offer</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={1} >
                            <MoreVertIcon style={{marginTop: '15px'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default connect()(withStyles(useStyles)(JobListItem));