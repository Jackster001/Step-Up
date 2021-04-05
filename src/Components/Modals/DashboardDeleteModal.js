import { render } from '@testing-library/react';
import React, { Component } from 'react';
import {Button, Container, Grid, withStyles, Typography} from '@material-ui/core';

const useStyles = (theme) => ({
    ModalContainer: {
        position: 'fixed',
        top:0,
        left:0,
        zIndex: 1201,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
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
        transition: 'all 0.3s ease-out'
    },
    rightSide:{
        backgroundColor: '#f5f5f5'
    },
    messageBox:{
        width: '300px',
        margin: '0 auto',
        marginTop: '40%'
    },
    message:{
        fontSize: '20px',
        fontWeight: '700'
    }
})

class DashboardDeleteConfirmation extends Component{
    constructor(props){
        super(props);
        this.state={
            openModal: true
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <>
            {
                this.state.openModal ?
                <div className="ModalContainer">
                    <div className={classes.modal}>
                        <Grid container spacing={0} style={{height:'550px'}}>
                            <Grid item xs={6}>

                            </Grid>
                            <Grid item xs={6} className={classes.rightSide}>
                                <div className={classes.messageBox}>
                                    <p className={classes.message}>
                                        Deleting a job card will permanently remove it. Are you sure?
                                    </p>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Button variant='contained' fullWidth color="red">
                                                Yes, Delete Job Card
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant='outlined' fullWidth color="primary">
                                                No, Keep Job Card
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                :
                    <></>
            }
            </>
        )
    }
}

export default (withStyles(useStyles)(DashboardDeleteConfirmation));