import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import Main from './main';

function App() {
  return ( 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router >
          <Main/>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
