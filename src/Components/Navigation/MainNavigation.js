import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../Routes/routes';
import { connect } from 'react-redux';
import { logoutUser } from '../../Action/authAction';
import { useTheme } from '@material-ui/core/styles';
import {Grid, withStyles, Button, Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, AppBar, Toolbar} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import logo from '../../Assets/Step Up Careers Logo.svg'; 
import MenuIcon from "@material-ui/icons/Menu";
import SideNavigation from './SideNavigation';
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
        marginTop: '30px'
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
    },
    linkColor:{
        textDecoration: 'none',
        color: 'black',
        fontWeight: '400'
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
        return(
            <SideNavigation props={this.props}/>
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