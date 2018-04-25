import React from 'react'
import '../css/Reader.css'
import '../css/markdown.css'
import { Panel, Col, Row, Modal} from 'react-bootstrap';

const Markdown = require('react-markdown');
const Web3 = require('web3');

var web3 = new Web3(Web3.givenProvider);
if(!web3.currentProvider) {
  web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/zlPxlGZa5NUkLUBHtUVl'));
}

function hex2utf8(hex) {
  hex = hex.toUpperCase()
  if (hex.length % 2)
      return ""
  var digits = "0123456789ABCDEF"
  var text = ""
  let i, hc,lc,cc;
  for (i = 0; i < hex.length; i += 2) {
      hc = digits.indexOf(hex[i])
      lc = digits.indexOf(hex[i+1])
      if (hc < 0 || lc < 0)
          return "";
      cc = (hc << 4) + lc
      text += String.fromCharCode(cc)
  }
  text = decodeURIComponent(escape(text));
  return text
}

class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }
  }
  componentWillReceiveProps(newProps) {
    web3.eth.getTransaction(newProps.match.params.txid, (err,transaction) => {
      if(!transaction){
        this.setState({content: 'No transaction found'});
        return;
      }
      var hex  = transaction.input.toString().substring(2);
      // let str = decodeURIComponent(hex.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
      this.setState({content: hex2utf8(hex)});
    });
  }
  componentWillMount() {
    web3.eth.getTransaction(this.props.match.params.txid, (err,transaction) => {
      if(!transaction){
        this.setState({content: 'No transaction found'});
        return;
      }
      var hex  = transaction.input.toString().substring(2);
      this.setState({content: hex2utf8(hex)});
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={10} sm={8} smOffset={2} xsOffset={1}>
            <Markdown
              className="reader"
              source={this.state.content}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Reader;
