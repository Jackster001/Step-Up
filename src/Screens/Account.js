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
import {makeStyles,withStyles} from '@material-ui/core';
import { height, shadows } from '@material-ui/system';
import {Grid,Button} from '@material-ui/core';
import TextField  from '@material-ui/core/TextField';
import { mergeClasses } from '@material-ui/styles';



const useStyles =theme=> ({
    root: {
      // display: 'flex'
      marginTop: '8%'
    },
    appBar: {
      width: `calc(100% - ${DefaultSideWidth}px)`,
      marginLeft: DefaultSideWidth,
      backgroundColor: '#125182'
      
    },
    toolbar: {
      minHeight: '30px'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
      width: `calc(100% - ${DefaultSideWidth - DefaultSideWidth/2}px)`,
      marginLeft: DefaultSideWidth/2+120,
      marginTop: '0px'
    },
    title: {
      borderBottom:'2px solid',
      paddingBottom:'20px',
      width:'80%'
    },
    form: {
      width: `calc(100% - ${DefaultSideWidth - DefaultSideWidth/2}px)`,
    },
    label:{
      width: '300px',
      marginTop: '20px',
      marginRight:'97px',
      marginBottom:'20px',
    },
    btn:{
      width: '300px',
      marginTop: '20px',
      marginRight:'97px',
      marginBottom:'30px',
      backgroundColor:'rgb(104,104,104)',
      color:'white',
      
      boxShadow:'0px -1.5px 0px 2px rgb(136,136,136) '
      
      
    }

    
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
        
          <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
              <Grid container style={{padding:'33px'}}></Grid>
            </AppBar>
            <div className={classes.content}>
              <h1 className={classes.title}>Account Settings</h1>
              <form className={classes.form}>
                <TextField
                type="Firstname"
                name="Firstname"
                label="First Name (Required)" variant="outlined"
                className={classes.label}
                id="validation-outlined-input"
                
                />
                
                <TextField
                type="Last name"
                name="Last Name"
                label="Last Name (Required)" variant="outlined"
                className={classes.label}/>
                
                <TextField
                type="email"
                name="email"
                label="Email (Required)" variant="outlined"
                className={classes.label}/>

                <TextField
                type="Old Passwword"
                name="Old Password"
                label="Old Password" variant="outlined"
                className={classes.label}/>

                <TextField
                type="New Passwword"
                name="New Password"
                label="New Password" variant="outlined"
                className={classes.label}/>

                <TextField
                type="Confirm Password"
                name="Confirm Password"
                label="Confirm Password" variant="outlined"
                className={classes.label}/>

                <Button className={classes.btn}>UPDATE ACCOUNT SETTING</Button>
                

                
        
              </form>
              
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