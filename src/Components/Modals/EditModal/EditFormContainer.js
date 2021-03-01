import React, { Component } from 'react';
import {Button, Container, Grid, withStyles, Typography} from '@material-ui/core';
import { a11yProps, DefaultSideWidth } from '../../../Utils/helper';
import EditForm from './EditForm';

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

class EditFormContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { classes } = this.props;
        return (
            <Grid container spacing={2}>
                <EditForm editIndex={this.props.editIndex} openEditModal={()=> this.props.openEditModal()} closeModal={()=> this.props.closeModal()} />
            </Grid>
        )
    }
}

export default (withStyles(useStyles)(EditFormContainer));