import React, { Component } from 'react';
import {Button, Container, Grid, withStyles, Typography} from '@material-ui/core';
import { a11yProps, DefaultSideWidth } from '../../../Utils/helper';
import EditFormContainer from './EditFormContainer';
import ContactsContainer from './ContactsContainer'
import { connect } from 'react-redux';
import {updateJob} from '../../../Action/profileAction'

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
            formType:"Edit"
        }
    }

    componentDidMount(){
        console.log("hereee"+this.props.openModal)
    }
    
    // onSubmitEdit(v,i){
    //     this.props.updateJob(this.props.profile.id,v,i)
    // }

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

    render(){
        const { classes } = this.props;
        return (
            <div className={this.props.openModal ? "ModalContainer": "ClosedModal"}>
                <div className={classes.ModalContainer}>
                    <Container className={classes.modal} maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{paddingBottom:"0"}}>
                                <Typography variant={"h4"}>Edit Job</Typography>
                            </Grid>
                            <Grid item xs={9} style={{paddingTop:"0"}}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}>
                                        <p className={this.state.formType === "Edit" ? classes.activeLink : classes.nonActiveLink} onClick={()=> this.setState({...this.state,formType: "Edit"})}>Job Info</p>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <p className={this.state.formType === "Contact" ? classes.activeLink : classes.nonActiveLink} onClick={()=> this.setState({...this.state,formType: "Contact"})}>Contacts</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {this.state.formType === "Contact" ?
                                <Grid item xs={3} style={{paddingTop:"0"}}>
                                    <Button color="primary" variant="contained" style={{float: 'right'}}>Create Contact</Button>
                                </Grid>
                                :<></>
                            }
                            <Grid item xs={12} style={{height:'30px'}}></Grid>
                        </Grid>
                        {this.state.formType === "Edit" ?
                            <EditFormContainer editIndex={this.props.editIndex} openEditModal={()=> this.props.openEditModal()} closeModal={()=> this.props.closeModal()}/>
                            :
                            <ContactsContainer/>
                        }
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
    profile: state.userState.profile
})

export default connect(mapStateToProps, {updateJob})(withStyles(useStyles)(EditModal));