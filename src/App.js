import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from './reducers/reducers'
import NavigationBar from './components/navigationbar.react.js'
import {Jumbotron, Button} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import Home from './components/Home.react.js'
import Reader from './components/Reader.react.js'
import MarkdownEditor from './components/MarkdownEditor.react.js'
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
          <MarkdownEditor />
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
