/* eslint-disable no-sequences */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styles from './styles.css';
import sliderStyle from './slider.css';
import loaderStyle from './loader.css';

import { BrowserRouter as Router } from 'react-router-dom';

import storage from './utils/storage';
import { configureClient } from './api/client';

const accessToken = storage.get('auth');
configureClient({ accessToken });

ReactDOM.render(
    <Router>
      <App style={styles, sliderStyle, loaderStyle}  isInitiallyLogged={!!accessToken}/>
    </Router>,
  document.getElementById('root')
);
