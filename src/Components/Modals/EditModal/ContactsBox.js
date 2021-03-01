import React, { Component } from 'react';
import {Button, Container, Grid, withStyles, Typography} from '@material-ui/core';
import { a11yProps, DefaultSideWidth } from '../../../Utils/helper';
import EditForm from './EditForm';
import { FaRegTimesCircle, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import ContactCard from './ContactCard';

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

class ContactsBox extends Component {
    constructor(props) {
        super(props);
        this.state={
            contactList:[]
        }
    }

    openEdit(){

    }

    render(){
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* <div className="ContactModal">
                            <div className="backButtonContainer">
                                <div className="backButton"><FaRegTimesCircle size="35" color="#470eb3" onClick={()=>this.handleClose()}/></div>
                            </div> */}
                            {/* <center><h2>{this.state.Company}</h2></center> */}
                            {/* <div className="editTopContainer">
                                <ul className="editNavbar">
                                    <li onClick={()=> this.setState({...this.state,contactModal: false, addContact: false})}>Job Info</li>
                                    <li className="active" onClick={()=> this.onClickNavContact()}>Contacts</li>
                                </ul>
                                <button className="createContactButton" onClick={()=> this.setState({...this.state,contactModal: false, addContact: true})}>Create Contact</button>
                            </div><br/> */}
                            <div >
                                {this.state.contactList && this.state.contactList.length>0 ? 
                                    <>{this.state.contactList.map((contact,i)=>{
                                        return <ContactCard key={i} contactInfo={contact} openEdit={()=> this.openEdit(contact,i)}/>
                                    })}</>
                                    :
                                    <div>
                                        <center><h3>You have no contacts yet</h3></center>
                                    </div>
                                }
                            {/* </div> */}
                        </div>
                </Grid>
            </Grid>
        )
    }
}

export default (withStyles(useStyles)(ContactsBox));