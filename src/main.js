import React, { Component } from 'react';
import {connect} from 'react-redux';
import firebase from "firebase/app";
import { setAuth, disableAuthLoading, finishLogin} from '../src/Action/authAction';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import MainNavigation from './Components/Navigation/MainNavigation'
import * as screens from './Screens';
import * as routes from './Routes/routes';
import {ClearErrors} from './Action/errorAction';
import {Container} from '@material-ui/core';
import Footer from './Components/Footer';

class Main extends Component {
    constructor(props) {
      super(props);
      this.state={
        auth: this.props.isAuthenticated,
        pathName: window.location.pathname
      }
    }
    componentDidMount() {
      this.props.ClearErrors()
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
      if(this.props.authLoading){
        this.props.disableAuthLoading()
        this.setState({...this.state, auth: this.props.isAuthenticated})
      }
      if(window.location.pathname !== this.state.pathName){
        this.setState({...this.state, pathName: window.location.pathname})
      }
    }
    render() {
      return (
        <div>
          <Container className="app" maxWidth="lg">
          </Container>
          <Container className="app" maxWidth="lg">
            <MainNavigation/>
            {/* <PublicRoute exact path={routes.LANDING} component={screens.Landing} isAuthenticated={this.state.auth}/> */}
            <PublicRoute exact path={routes.SIGNUP} component={screens.Signup} isAuthenticated={this.state.auth}/>
            <PublicRoute exact path={routes.LOGIN} component={screens.Login} isAuthenticated={this.state.auth}/>
            <PublicRoute exact path={routes.RESET} component={screens.Reset} isAuthenticated={this.state.auth}/>
            <PublicRoute exact path={routes.PRIVACY} component={screens.Privacy} isAuthenticated={this.state.auth}/>
            <PrivateRoute exact path={routes.HOME} component={screens.Dashboard} isAuthenticated={this.state.auth}/>
            <PrivateRoute exact path={routes.ACCOUNT} component={screens.Account} isAuthenticated={this.state.auth}/>
            <PrivateRoute exact path={routes.JOBSEARCH} component={screens.JobSearch} isAuthenticated={this.state.auth}/>
            <PrivateRoute exact path={routes.GOAL} component={screens.Goal} isAuthenticated={this.state.auth}/>
          </Container>
          <PublicRoute exact path={routes.LANDING} component={screens.Landing} isAuthenticated={this.state.auth}/>
        </div>
      );
    }
}
const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  authLoading: state.authState.authLoading,
  profile: state.userState.profile
});

export default connect(mapStateToProps, {setAuth, disableAuthLoading, ClearErrors})(Main);