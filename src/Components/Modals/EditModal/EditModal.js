import React, { Component } from 'react';
import {Button, Container, Grid, withStyles} from '@material-ui/core';
import { a11yProps, DefaultSideWidth } from '../Utils/helper';

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
        zIndex: 500,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        padding: '16px',
        boxSizing: 'border-box'
    },
    // modal:{
    //     width: '900px',
    //     height: 'auto',
    //     backgroundColor: 'white',
    //     position: fixed;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50%, -50%);
    //     border-radius: 10px;
    //     padding: 20px;
    //     transition: all 0.3s ease-out;
    //   }
})

class EditModal extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.ModalContainer}>
                <Container className={classes.modal} maxWidth="lg">
                    <Grid container spacing={2} className={classes.content}>
                        <Grid item>

                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default (withStyles(useStyles)(EditModal));