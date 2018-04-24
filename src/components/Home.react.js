import React from 'react'
import MarkdownEditor from './MarkdownEditor.react.js'
import {Jumbotron, Button, NavItem, NavDropdown, MenuItem, FormControl} from 'react-bootstrap'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>A Decentralized Notebook</h1>
          <p>
            Write and share your notes on Ethereum network. Nobody can modify or take it down.
          </p>
          <p>
            <Button bsStyle="primary">Learn more</Button>
          </p>
        </Jumbotron>
        <MarkdownEditor />
      </div>
    );
  }
}

export default Home;
