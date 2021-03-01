import React, { Component } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import {Button, Container, Grid, withStyles, Typography, TextField, Select, MenuItem} from '@material-ui/core';

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

    ModalContainer: {
        position: 'fixed',
        top:0,
        left:0,
        zIndex: 1201,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        padding: '30px',
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
      }
});

class ApplyJobModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Title:"",
            Company:"",
            Description: "",
            Link: "",
            JobStatus: "Applied",
            Location: "",
            DateCreated: new Date(), 
        }
    }

    componentDidMount(){
        let currentDate = new Date();
        let month = '' + (currentDate.getMonth() + 1),
            day = '' + currentDate.getDate(),
            year = currentDate.getFullYear();
        if(month < 10) month= "0"+month
        currentDate = year + "-" + month + "-" + day;
        console.log(currentDate)
        this.setState({...this.state, DateCreated: year + "-" + month + "-" + day})
    };

    submit = () => {
        let {Title, Company} = this.state
        if(Title.length <= 0 || Company.length <= 0) return;
        let posting=this.state;
        let myDate = this.state.DateCreated;
        myDate=myDate.split("-");
        let newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];
        posting.DateCreated = newDate
        let currentDate = new Date(),
        month = '' + (currentDate.getMonth() + 1),
        day = '' + currentDate.getDate(),
        year = currentDate.getFullYear();
        currentDate = currentDate[2]+"-"+currentDate[0]+"-"+currentDate[1];
        this.props.onSubmit(posting);
        this.setState({
            ...this.state,
            Title:"",
            Company:"",
            Description: "",
            Link: "",
            JobStatus: "Applied",
            Location: '',
            DateCreated: year + "-" + month + "-" + day
        })
    }   

    setValue = (event) => {
        const { value, name } = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={this.props.openModal ? "ModalContainer": "ClosedModal"}>
            {
                this.props.openModal ?
                    <div className={classes.ModalContainer}>
                    <Container className={classes.modal} maxWidth="lg">
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant={"h4"}>Add Job</Typography>
                            </Grid>
                            <Grid item xs={4} style={{paddingBottom: '5px'}}>
                                <TextField className={classes.fieldStyle} label="Company Name (Required)" name="Company" variant="outlined" placeholder="Company Name" value={this.state.Company} onChange={(e)=> this.setValue(e)}/>
                            </Grid>
                            <Grid item xs={4} style={{paddingBottom: '5px'}}>
                                <TextField className={classes.fieldStyle} label="Job Title (Required)"  name="Title" variant="outlined" placeholder="Job Title" value={this.state.Title} onChange={(e)=> this.setValue(e)} />
                            </Grid>
                            <Grid item xs={4} style={{paddingBottom: '5px'}}>
                                <TextField className={classes.fieldStyle} label="Job URL" name="Link" variant="outlined" placeholder="Job URL" value={this.state.Link} onChange={(e)=> this.setValue(e)} />
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
                                    variant="outlined"
                                    name={"DateCreated"}
                                    value={this.state.DateCreated}
                                    style={{width: '100%'}}
                                    onChange={(e)=> this.setValue(e)}
                                />
                                {/* <TextField className={classes.fieldStyle} label="Date Created" name="DateCreated" variant="outlined" placeholder="Date Created" value={this.state.DateCreated} onChange={(e)=> this.setValue(e)} /> */}
                            </Grid>
                            <Grid item xs={4}>
                                <TextField className={classes.fieldStyle} label="Location" name="Location" variant="outlined" placeholder="Location" value={this.state.location} onChange={(e)=> this.setValue(e)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField className={classes.fieldStyle} label="Description" name="Description" placeholder="Description" value={this.props.value} onChange={(e)=> this.setValue(e)}/>
                            </Grid>
                            <Grid item xs={12} style={{position: 'absolute', bottom: '12px', right: '25px'}}>
                                <Button color="primary" variant='contained' style={{float:'right', marginLeft: '15px'}} onClick={()=>this.submit()}>Save</Button>
                                <Button color="primary" variant='outlined' style={{float:'right'}} onClick={()=>this.props.closeModal()}>Close</Button>
                            </Grid>
                        </Grid>
                    </Container>
                    </div>
                : <></>
            }
            </div>
        );
    }

}
export default (withStyles(useStyles)(ApplyJobModal));