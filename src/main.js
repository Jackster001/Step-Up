import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from "firebase/app";
import { disableUserProfileLoading } from '../src/Action/profileAction';
import { setAuth } from '../src/Action/authAction';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import Navigation from './Components/Navigation';
import * as screens from './Screens';
import * as routes from './Routes/routes';

class Main extends Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      if(this.props.isAuthenticated){
        firebase.auth().onAuthStateChanged((user)=>{
          if (user) {
            this.props.setAuth(true)
          } else {
            this.props.setAuth(false)
          }
        });
      }
    }
    componentDidUpdate(){
      if(this.props.loadingProfile){
        this.props.disableUserProfileLoading()
        this.setState({...this.state, profile: this.props.profile})
        firebase.auth().onAuthStateChanged((user)=>{
          if (user) {
            this.props.setAuth(true)
          } else {
            this.props.setAuth(false)
          }
        });
      }
    }
    render() {
      return (
        <div className="app">
          <Navigation/>
          <PublicRoute exact path={routes.LANDING} component={screens.Landing}/>
          <PublicRoute exact path={routes.SIGNUP} component={screens.Signup}/>
          <PublicRoute exact path={routes.LOGIN} component={screens.Login}/>
          <PublicRoute exact path={routes.RESET} component={screens.Reset}/>
          <PublicRoute exact path={routes.PRIVACY} component={screens.Privacy}/>
          <PrivateRoute exact path={routes.HOME} component={screens.Dashboard}/>
          <PrivateRoute exact path={routes.ACCOUNT} component={screens.Account}/>
        </div>
      );
    }
}
const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  loadingProfile: state.userState.loadingProfile,
  profile: state.userState.profile
});

export default connect(mapStateToProps, {setAuth, disableUserProfileLoading})(Main);