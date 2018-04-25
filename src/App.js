import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { browserHistory } from 'react-router'
import reducers from './reducers/reducers'
import NavigationBar from './components/NavigationBar.react.js'
import {Jumbotron, Button} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import Home from './components/Home.react.js'
import Reader from './components/Reader.react.js'
import logo from './css/logo.svg';
import './css/App.css';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <div className="App">
          <NavigationBar />
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
        </div>
      </ConnectedRouter>

      </Provider>
    );
  }
}

export default App;
