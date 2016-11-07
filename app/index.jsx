import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools';

import configureStore from './store/configureStore'
import App from './containers/App'

import $ from 'jquery';
require('bootstrap-loader');
require('./public/css/index.css');

const store = configureStore();


render(
	  <Provider store={store}>
			<div>
				<App  />
				<DevTools />
			</div>
	  </Provider>,
	  document.getElementById('page-container')
)
