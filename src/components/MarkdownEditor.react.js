import React from 'react';

import { Panel, Col, Jumbotron, Button, Modal} from 'react-bootstrap';
import { push } from 'react-router-redux'
import {connect} from 'react-redux';
import '../css/markdown.css'
import '../css/MarkdownEditor.css';

const Markdown = require('react-markdown');
const Web3 = require('web3');
const utf8 = require('utf8');

const initialSource = `
# ETH-notebook
# 以太坊记事本

没人删的掉的记事本

Put what you want to share into the textbox and put it into the ETH network.
Nobody can remove the message.

Share the message to the world.

* Markdown language supported and recommended
* An example: [Click](./tx/0x4cf8de58a27f5e0e23c54d307d6279b977d4ea907878570d20551b2c89cc29da)
* Disclaimer: All the data are stored in ETH blockchain and owned by the sender of the transaction. This site is only a tool to display the content of transactions and won't be responsible for any issues caused by the content.
## Codeblock?

\`\`\`
def helloWorld():
  print("Hello World!")
\`\`\`

## Tables?

| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |

`

const web3 = new Web3(Web3.givenProvider);

var hexEncode = function(text){
  text = unescape(encodeURIComponent(text))
  var digits = "0123456789ABCDEF"
  var hex = ""
  let i,hc,lc;
  for (i = 0; i < text.length; i++) {
      hc = (text.charCodeAt(i) >>> 4) & 0x0F
      lc = text.charCodeAt(i) & 0x0F
      hex += digits[hc]
      hex += digits[lc]
  }
  return hex
}

class MarkdownEditor extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._onChange = this._onChange.bind(this);
    this.state = {
      display: initialSource,
      modal_body: '',
      modal_show: false,
      modal_title: '',
    };
  }

  _onChange(event) {
    event.preventDefault();
    var text = event.target.value ? event.target.value : initialSource
    this.setState({ display: text })
  };

  genTransaction = () => {
    web3.eth.getAccounts((error, accounts) => {
      if(!accounts || !accounts[0]) {
        this.setState({
          modal_title:'Please Unlock Your Account or Add an Account to MetaMask',
          modal_body: <p>You need to send a ETH transaction to publish the note</p>,
          modal_show: true,
        });
        return;
      }

      let data = hexEncode(this.state.display);
      web3.eth.estimateGas({
        to: "0x2D7Cca4b6103fC5b3Fdb5c66F9a649ab038a3DA9",
        data: data
      }, ((err,gas) => {
        web3.eth.sendTransaction({
          from: accounts[0],
          value: web3.utils.toWei('0.005', 'ether'),
          // Dan!
          to: '0x2D7Cca4b6103fC5b3Fdb5c66F9a649ab038a3DA9',
          gas: gas,
          data: data,
        }, (err, hash)=> {
          if(err) {
            this.setState({
              modal_title:'Error',
              modal_body: <p>{err.message}</p>,
              modal_show: true,
            });
            return;
          } else {
            this.setState({
              modal_title:'Success',
              modal_body: <div>
                <p>Your transaction has been sent. Please wait until your transaction be mined.</p>
                <p>Once the transaction is mined, you can check your note here:</p>
                <Button onClick={e=> this.props.dispatch(push(process.env.PUBLIC_URL + '/tx/'+hash))}>Take me to my note</Button>
              </div>,
              modal_show: true,
            });
          }
        });
      }))
    })
  }

  _getInputPanel = () => {
    if(web3.currentProvider) {
      return (
        <Panel>
          <Panel.Heading className="clearfix">Input your message here:
              <Button className="pull-right" bsStyle="primary" onClick={e=>this.genTransaction()}>Publish</Button>
          </Panel.Heading>
          <Panel.Body>
            <textarea
              id="noter-text-area"
              className="textarea"
              rows="25"
              name="textarea"
              placeholder="Type your text in markdown."
              onChange={this._onChange}>
            </textarea>
          </Panel.Body>
        </Panel>
      );
    } else {
      return (
        <Panel>
          <Panel.Heading>Please Install MetaMask</Panel.Heading>
          <Panel.Body>
            <h3>To publish a note, you need to send an ETH transaction, which requires MetaMask Installed</h3>
            <a href="https://metamask.io"><img alt="metamask" style={{width: '100%'}} src="download-metamask.png" /></a>
          </Panel.Body>
        </Panel>
      )
    }

  }

  handleClose = () => {
    this.setState({
      modal_show: false,
      modal_body: '',
      modal_title: '',
    })
  }
  render() {
    return (
      <div>
        <Col sm={6} md={6}>
          {this._getInputPanel()}
        </Col>
        <Col sm={6} md={6}>
          <Panel>
            <Panel.Heading>Your text will be:</Panel.Heading>
            <Panel.Body>
              <Jumbotron className="markdown-display">
                <Markdown
                  source={this.state.display}
                  skipHtml={false}
                  escapeHtml={false}
                />
              </Jumbotron>
            </Panel.Body>
          </Panel>
        </Col>
        <Modal show={this.state.modal_show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modal_title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.modal_body}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default connect()(MarkdownEditor);
