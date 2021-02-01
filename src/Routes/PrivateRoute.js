import React, {useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from "firebase/app";
import TempNavigation from '../Components/tempNavigation'


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {

  return(
    <Route
      {...rest}
      render={props =>
      isAuthenticated ? <Component {...props}/>
      : <Redirect to="/login"/>
    }
  />)
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);