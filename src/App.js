import React, {useEffect} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import * as screens from './Screens';
import * as routes from './Routes/routes';
import {store, persistor} from './store';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';
import setAuthToken from './Utils/setAuthToken';
import { setToken, logoutUser } from './Action/authAction';
import Navigation from './Components/Navigation';
import jwt_decode from 'jwt-decode';
import { PersistGate } from 'redux-persist/integration/react'
import firebase from "firebase/app";
import {auth} from "./Firebase/firebase"

function App() {

  return ( 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router >
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
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
