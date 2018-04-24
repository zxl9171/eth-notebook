import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from './reducers/reducers'
import NavigationBar from './components/NavigationBar.react.js'
import {Jumbotron, Button} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import Home from './components/Home.react.js'
import Reader from './components/Reader.react.js'
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
          <Router>
            <div>
              <Route
                path={process.env.PUBLIC_URL + '/'}
                exact={true}
                component={Home}
              />
              <Route
                path={process.env.PUBLIC_URL + '/tx/:txid'}
                exact={true}
                component={Reader}
              />
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
