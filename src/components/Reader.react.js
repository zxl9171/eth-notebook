import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, FormControl} from 'react-bootstrap'
import '../css/Reader.css'
import '../css/markdown.css'
const Markdown = require('react-markdown');
const Web3 = require('web3');

var web3 = new Web3(Web3.givenProvider);
if(!web3.currentProvider) {
  web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/zlPxlGZa5NUkLUBHtUVl'));
}

class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }
  }

  componentWillMount() {

    web3.eth.getTransaction(this.props.match.params.txid, (err,transaction) => {
      console.log(transaction);
      if(!transaction){
        this.setState({content: 'No transaction found'});
        return;
      }
      var hex  = transaction.input.toString();
      let str = decodeURIComponent(hex.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
      this.setState({content: str});
    });
  }

  render() {
    console.log(this.state.content);
    return (
      <Markdown
        className="reader"
        source={this.state.content}
      />
    );
  }
}
export default Reader;
