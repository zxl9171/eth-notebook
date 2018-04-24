import React from 'react';
import { Panel, Col, Jumbotron } from 'react-bootstrap';
import '../css/MarkdownEditor.css';

const Markdown = require('react-markdown');
const initialSource = `
# Live demo

Changes are automatically rendered as you type.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
`

class MarkdownEditor extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._onChange = this._onChange.bind(this);
    this.state = {
      display: initialSource
    };
  }

  _onChange(event) {
    event.preventDefault();
    var text = event.target.value ? event.target.value : initialSource
    this.setState({ display: text })
  };

  render() {
    return (
      <div>
        <Col sm={6} md={6}>
          <Panel>
            <Panel.Heading>Your text will be:</Panel.Heading>
            <Panel.Body>
              <Jumbotron className="jumbotron">
                <Markdown
                  source={this.state.display}
                  skipHtml={false}
                  escapeHtml={false}
                />
              </Jumbotron>
            </Panel.Body>
          </Panel>
        </Col>
        <Col sm={6} md={6}>
          <Panel>
            <Panel.Heading>Input your message here:</Panel.Heading>
            <Panel.Body>
              <textarea
                id="noter-text-area"
                className="textarea"
                rows="20"
                name="textarea"
                placeholder="your text in markdown."
                onChange={this._onChange}>
              </textarea>
            </Panel.Body>
          </Panel>
        </Col>
      </div>
    )
  }
}

export default MarkdownEditor;
