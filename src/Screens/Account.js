import React, { Component } from 'react';
import {connect} from 'react-redux';
import { logoutUser } from '../Action/authAction';
import CssBaseline from '@material-ui/core/CssBaseline';
import { a11yProps, DefaultSideWidth } from '../Utils/helper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../Components/Navigation/TabPanel';
import {ListView, BoardView} from '../Components';
import {withStyles} from '@material-ui/core';

const useStyles = (theme) => ({
    root: {
      // display: 'flex'
      marginTop: '30%'
    },
    appBar: {
      width: `calc(100% - ${DefaultSideWidth}px)`,
      marginLeft: DefaultSideWidth,
      marginTop: '25%'
    },
    toolbar: {
      minHeight: '30px'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      width: `calc(100% - ${DefaultSideWidth - DefaultSideWidth/2}px)`,
      marginLeft: DefaultSideWidth/2+60,
      marginTop: '0px'
    },
})

class Account extends Component {
    constructor(props){
        super(props)
        this.state={
          index:0
        }
    }

    componentDidMount(){
        console.log(this.props.profile)
    }

    render() {
        const { classes } = this.props;
        return (
        // <div className={classes.root}>
        //     <CssBaseline />
        //     <AppBar position="fixed" className={classes.appBar}>
        //     <Tabs value={this.state.index} onChange={(v)=> this.setState({...this.state,index:v})} aria-label="simple tabs example">
        //         <Tab label="Settings" {...a11yProps(0)} />
        //     </Tabs>
        //     </AppBar>
        //     <main className={classes.content}>
        //       <div className={classes.toolbar}/>
        //       <TabPanel value={this.state.index} index={0}>
        //         <center><h1>My Account</h1></center>
        //         <div className="ProfileContainer">
        //             <h3>Name: {this.props.profile.firstName} {this.props.profile.lastName}</h3>
        //             <h3>Email: {this.props.profile.email}</h3><br/><br/>
        //             <center><button className="signOutButton" onClick={()=>this.props.logoutUser()}>Sign Out</button></center>
        //         </div>
        //       </TabPanel>
        //     </main>
        // </div>
        <div className={classes.appBar}>
          <center><h1>My Account</h1></center>
          <div className="ProfileContainer">
            <h3>Name: {this.props.profile.firstName} {this.props.profile.lastName}</h3>
            <h3>Email: {this.props.profile.email}</h3><br/><br/>
            <center><button className="signOutButton" onClick={()=>this.props.logoutUser()}>Sign Out</button></center>
          </div>
        </div>
        );
    }
}
const mapStateToProps =(state) =>({
    isAuthenticated : state.authState.isAuthenticated,
    profile: state.userState.profile
})

export default connect(mapStateToProps, {logoutUser})(withStyles(useStyles)(Account));