import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Switch, Route } from 'react-router';
import thunk from 'redux-thunk';

import history from './routerHistory';

import App from './components/App';

import reducers from './reducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/" component={App}/>
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root')
);
