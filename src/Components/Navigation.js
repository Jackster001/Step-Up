import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as routes from '../Routes/routes';
import { connect } from 'react-redux';
import { logoutUser } from '../Action/authAction';
import {Grid, withStyles, Button} from '@material-ui/core';
import logo from '../Assets/Step Up Careers Logo.svg'; 
// import logo from '../Assets/main_logo.png'; 

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
        color: 'white',
        fontWeight: '400',
    },
    linkColor2:{
        textDecoration: 'none',
        color: 'white',
        fontWeight: '400'
    },
    navItemSpace:{
        marginRight: '10px'
    }
});

class Navigation extends Component{
    constructor(props){
        super(props)
        this.state={
            navigationType:"navigation",
            initials:"",
            authenticated: false
        }
    }
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
                        <li className={classes.navItemSpace}><Button variant="contained" color="primary"><Link className={classes.linkColor} to={routes.SIGNUP}>Sign Up</Link></Button></li>
                        <li><Button variant="contained" color="primary"><Link className={classes.linkColor2} to={routes.LOGIN}>Sign In</Link></Button></li>
                    </ul>
                </div>
            </div>
        )
    }
    AuthBar(){
        const { classes } = this.props;
        return(
            <div className="navBar">
                <div className="navLogoContainer">
                    <a className="logoLink" href="/home"><h1 className="LogoText">Step Up</h1></a>
                </div>
                <div className="navULContainer">
                    <ul className="navUL">
                        <li><Link className="linkColor" to={routes.DASHBOARD}>Home</Link></li>
                    </ul>
                </div>
                <div className="navULContainer">
                    <div className="accountCircleContainer">
                        <div className="accountCircle">
                            <Link className="linkAccount" to={routes.ACCOUNT}>{this.props.isAuthenticated && this.props.profile ? `${this.props.profile.firstName.charAt(0)}${this.props.profile.lastName.charAt(0)}`:""}</Link>
                        </div>
                    </div>
                </div>
            </div>
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