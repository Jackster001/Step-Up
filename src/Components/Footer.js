import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Startbox, Jobboard} from '.'; 
import {Grid, Paper, withStyles, TextField, Container, Button, Divider} from '@material-ui/core';

const useStyles = (theme) => ({
    footerContainer:{
        width: "100%",
        position: 'aboslute',
        bottom: '0',
        backgroundColor: 'white',
        padding: '50px 0px',
        minHeight: '200px',
        left: 0
    },
    listStyle:{
        listStyleType:'none'
    },
    footerTitle:{
        color: '#5943fa'
    },
    footerItem:{
        marginBottom: '10px',
        '&:hover':{
            cursor: 'pointer'
        }
    }
})
class Footer extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        const { classes } = this.props;
        return (
            <>
            {this.props.isAutenicated ? <></>:
                <div className={classes.footerContainer}>
                <Container maxWidth="md">
                    <Grid container spacing={10}>
                        <Grid item xs={4}>
                            <ul className={classes.listStyle}>
                                <h4 className={classes.footerTitle}>Information</h4>
                                <li className={classes.footerItem}><span>Privacy</span></li>
                                <li className={classes.footerItem}><span>Terms Of Service</span></li>
                            </ul>
                        </Grid>
                        <Grid item xs={4}>
                            <ul className={classes.listStyle}>
                                <h4 className={classes.footerTitle}>Links</h4>
                                <li className={classes.footerItem}><span>Google Chrome Extension</span></li>
                                <li className={classes.footerItem}><span>Sign In</span></li>
                                <li className={classes.footerItem}><span>Sign Up</span></li>
                            </ul>
                        </Grid>
                        <Grid item xs={4}>
                            <ul className={classes.listStyle}>
                                <h4 className={classes.footerTitle}>Contact</h4>
                                <li style={{marginBottom:"10px"}}><span>Need any Help?</span></li>
                                <li style={{marginBottom:"10px"}}><span>Email us at: <a href="mailto:help@stepupcareers.com">help@stepupcareers.com</a></span></li>
                            </ul>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            }
            </>
        )
    }
}

export default withStyles(useStyles)(Footer);