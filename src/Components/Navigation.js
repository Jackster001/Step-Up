import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as routes from '../Routes/routes';
import { connect } from 'react-redux';
import { logoutUser } from '../Action/authAction';
import { useTheme } from '@material-ui/core/styles';
import {Grid, withStyles, Button, Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, AppBar, Toolbar} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import logo from '../Assets/Step Up Careers Logo.svg'; 
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

const drawerWidth = "340px";

const useStyles = (theme) => ({
    navBar:{
        width: "100%",
        height: "100px",
        flexDirection: "row",
        display: "flex"
    },
    navLogoContainer:{
        width: '33.33%',
        marginTop: '30px',
        // border: '1px solid black'
    },
    navUL:{
        listStyleType: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    navULContainer:{
        width:'33.33%',
        float: 'left',
        marginTop: '30px',
        // border: '1px solid black'
    },
    linkColor:{
        textDecoration: 'none',
        color: 'black',
        fontWeight: '400',
    },
    linkColor2:{
        textDecoration: 'none',
        color: 'white',
        fontWeight: '400'
    },
    navItemSpace:{
        marginRight: '10px'
    },
    menuButton: {
        marginRight: 36,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
});

class Navigation extends Component{
    constructor(props){
        super(props)
        this.state={
            navigationType:"navigation",
            initials:"",
            authenticated: false,
            openSideNavBar: true
        }
        // this.theme = useTheme();
    }

    drawerButton = () => {
        const { classes } = this.props;
        return (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={()=> this.setState({...this.state, openSideNavBar: true })}
                edge="start"
                className={clsx(classes.menuButton, {
                    [classes.hide]: this.state.openSideNavBar,
                })}
            >
            <MenuIcon />
            </IconButton>
        );
    };
    
    NonAuthBar(){
        const { classes } = this.props;
        return(
            <div className={classes.navBar}>
                <div className={classes.navLogoContainer}>
                    {/* <a className="logoLink" href="/"><h1 className="LogoText">Step Up</h1></a> */}
                    <a href="/"><img src={logo} width={250}/></a>
                </div>
                <div className={classes.navULContainer}>
                </div>
                <div className={classes.navULContainer}>
                    <ul className={classes.navUL}>
                        <li className={classes.navItemSpace}><Button><Link className={classes.linkColor} to={routes.SIGNUP}>Sign Up</Link></Button></li>
                        <li><Button variant="contained" color="primary"><Link className={classes.linkColor2} to={routes.LOGIN}>Sign In</Link></Button></li>
                    </ul>
                </div>
            </div>
        )
    }
    AuthBar(){
        const { classes } = this.props;
        // const theme = useTheme()
        return(
            // <div className="navBar">
            //     <div className="navLogoContainer">
            //         <a className="logoLink" href="/home"><h1 className="LogoText">Step Up</h1></a>
            //     </div>
            //     <div className="navULContainer">
            //         <ul className="navUL">
            //             <li><Link className="linkColor" to={routes.DASHBOARD}>Home</Link></li>
            //         </ul>
            //     </div>
            //     <div className="navULContainer">
            //         <div className="accountCircleContainer">
            //             <div className="accountCircle">
            //                 <Link className="linkAccount" to={routes.ACCOUNT}>{this.props.isAuthenticated && this.props.profile ? `${this.props.profile.firstName.charAt(0)}${this.props.profile.lastName.charAt(0)}`:""}</Link>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        <>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: this.state.openSideNavBar,
                })}
            >
            <Toolbar>  
                {this.drawerButton()} 
            <Grid container justify="space-between" alignItems="center"> 
				<Grid item xs={1}   
  					direction="row"
  					justify="flex-start"
  					alignItems="center">
                {/* {authSession.isAuthenticated ? (
                         headerPic()
                    ) : (
                    <></>
                    )} */}
                </Grid>
                <Grid item xs={1}>
                    {/* {authSession.isAuthenticated ? (
                        <Button
                            onClick={handleLogoutClicked}
                            className={classes.loginButton}
                        >
                            Logout
                        </Button>
                    ) : (
                    <></>
                    )} */}
                </Grid>
            </Grid>
            </Toolbar>
        </AppBar>
        <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={this.state.openSideNavBar}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={()=> this.setState({...this.state, openSideNavBar: false})}>
                    {this.state.openSideNavBar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </div>
                <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
          </>
        )
    }
    render(){
        const { classes } = this.props;
        return (
            <div>
                {this.props.isAuthenticated ? this.AuthBar() : this.NonAuthBar()}
            </div>
        )
    }


}

const mapStateToProps =(state) =>({
    isAuthenticated: state.authState.isAuthenticated,
    profile: state.userState.profile
})
  
export default connect(mapStateToProps, {logoutUser})(withStyles(useStyles)(Navigation));