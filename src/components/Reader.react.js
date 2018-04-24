import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, FormControl} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

var Web3 = require('web3')
var web3 = new Web3(Web3.givenProvider);
const Eth = require('ethjs');
const eth = new Eth(web3.currentProvider);

class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }
  }

  componentWillMount() {
    eth.getTransactionByHash(this.props.match.params.txid, (err,transaction) => {
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
    return (
      <ReactMarkdown source={this.state.content} />
    );
  }
}
export default Reader;
