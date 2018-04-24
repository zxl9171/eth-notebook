import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from './reducers/reducers'
import NavigationBar from './components/navigationbar.react.js'
import {Jumbotron, Button} from 'react-bootstrap'

import logo from './css/logo.svg';
import './css/App.css';
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <NavigationBar />
          <Jumbotron>
            <h1>A Decentralized Notebook</h1>
            <p>
              Write your notes on Ethereum network. Nobody can modify or take it down.
            </p>
            <p>
              <Button bsStyle="primary">Learn more</Button>
            </p>
          </Jumbotron>
        </div>
      </Provider>
    );
  }
}

export default App;
