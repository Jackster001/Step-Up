import React, {useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from "firebase/app";


const PublicRoute = ({ component: Component,isAuthenticated, ...rest }) => {

  return(
    <Route {...rest} render={props => (
        isAuthenticated? <Redirect to="/home" />
        : <Component {...props} />
    )} />
  )
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated
});

export default connect(mapStateToProps)(PublicRoute);