import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Container, Grid, Typography, withStyles, Checkbox} from '@material-ui/core';
import {CheckCircle, FiberManualRecord} from '@material-ui/icons';
import {setTutorialTrue, setCardDurationTrue, disableTutorialLoading} from '../../Action/tutorialAction';
import { Link } from 'react-router-dom';

const useStyles = (theme) => ({
    container:{
        backgroundColor: theme.palette.primary.main,
        height: '60px',
        width:'100%'
    },
    textStyle:{
        marginTop: '20px',
        fontWeight: '900'
    },
    iconStyle:{
        marginTop: '5px',
        color: 'grey'
    },
    activeIcon:{
        color: '#64B6F7'
    },
    linkText:{
        textDecoration:'underline',
        cursor: 'pointer'
    },
})

class TutorialBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            tutorialLink: false,
            addCardDuration: false
        }
    }

    componentDidUpdate(){
        if(this.props.tutorialLoading) {
            this.props.disableTutorialLoading();
            this.setState({...this.state, tutorialLink: this.props.tutorialSteps.tutorialLink, addCardDuration: this.props.tutorialSteps.addCardDuration});
            this.props.setLoad();
        }
    }
    onHandleTutorialClick(){
        this.props.setTutorialTrue(this.props.profile.id);
    }

    onHandleDurationClick(){
        this.props.setCardDurationTrue(this.props.profile.id);
    }

    render() {
        const { classes } = this.props;
        return (
            <>
            {this.props.tutorialCompletion === false && this.props.tutorialLoaded === true ? 
            <Container maxWidth className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Typography className={classes.textStyle}>Get Started on your Job Tracking Journey</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{display:'flex'}}>
                                <Checkbox 
                                    icon={<FiberManualRecord fontSize='large'/>} 
                                    checkedIcon={<CheckCircle fontSize='large' style={{color: '#64B6F7'}}/>}
                                    className={classes.iconStyle}
                                    checked={this.state.tutorialLink}
                                />
                                <span style={this.state.tutorialLink === true ? {marginTop:'20px'} : {marginTop:'10px'}}>
                                    <span style={{fontSize:'16px', fontWeight: '900'}}>Tutorial</span><br/>
                                    <span style={{display:'flex'}}>
                                        {
                                            this.state.tutorialLink === true
                                            ?<></>:<><Link className={classes.linkText} style={{marginRight: '10px'}} onClick={()=> this.onHandleTutorialClick()}>Click Here</Link> <a className={classes.linkText} onClick={()=> this.onHandleTutorialClick()}>Skip</a></>
                                        }
                                    </span>
                                </span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} style={{display:'flex'}}>
                        <Checkbox 
                            icon={<FiberManualRecord fontSize='large'/>} 
                            checkedIcon={<CheckCircle fontSize='large' style={{color: '#64B6F7'}}/>}
                            className={classes.iconStyle}
                            checked={this.state.addCardDuration}
                        />
                        <span style={this.state.addCardDuration === true ? {marginTop:'20px'} : {marginTop:'10px'}}>
                            <span style={{fontSize:'16px', fontWeight: '900'}}>Add Card Duration</span><br/>
                            <span style={{display:'flex'}}>
                                {
                                    this.state.addCardDuration === true
                                    ?<></>:<><Link to={"my-account"} className={classes.linkText} style={{marginRight: '10px'}} onClick={()=> this.onHandleDurationClick()}>Click Here</Link> <a className={classes.linkText} onClick={()=> this.onHandleDurationClick()}>Skip</a></>
                                }
                            </span>
                        </span>
                    </Grid>
                </Grid>
            </Container>
            :<></>
            }
            </>
        );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated : state.authState.isAuthenticated,
    profile: state.userState.profile,
    tutorialLoading: state.tutorialState.tutorialLoading,
    tutorialSteps: state.tutorialState.tutorialSteps
})

export default connect(mapStateToProps, {setTutorialTrue, setCardDurationTrue, disableTutorialLoading})(withStyles(useStyles)(TutorialBar));