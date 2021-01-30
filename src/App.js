import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import Main from './main';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from './theme';

const StepUpTheme = createMuiTheme(theme)

function App() {
  return ( 
    <ThemeProvider theme={StepUpTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router >
            <Main/>
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
