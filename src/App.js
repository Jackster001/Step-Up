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

function App() {
  useEffect(()=>{
    // Check for token
    if (localStorage.jwtToken) {
      
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      store.dispatch(setToken(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = `/login`;
      }
    }}
  ,[])
  return ( 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router >
          <div className="app">
              <Navigation/>
              <PublicRoute exact path={routes.LANDING} component={screens.Landing}/>
              <PublicRoute exact path={routes.SIGNUP} component={screens.Signup}/>
              <PublicRoute exact path={routes.LOGIN} component={screens.Login}/>
              <PrivateRoute exact path={routes.HOME} component={screens.Home}/>
              <PrivateRoute exact path={routes.DASHBOARD} component={screens.Dashboard}/>
              <PrivateRoute exact path={routes.ACCOUNT} component={screens.Account}/>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
