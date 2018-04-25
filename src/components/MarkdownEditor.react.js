import React from 'react';
import { Panel, Col, Jumbotron } from 'react-bootstrap';
import '../css/MarkdownEditor.css';
import '../css/markdown.css'

const Markdown = require('react-markdown');
const initialSource = `
# ETH-notebook

Put what you want to share into the textbox on the left and changes are
automatically rendered as you type.

* Markdown language supported and recommended
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## Codeblock?

\`\`\`
def helloWorld():
  print("This line will be printed.")
\`\`\`

## Tables?

| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |

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
            <Panel.Heading>Input your message here:</Panel.Heading>
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
      </div>
    )
  }
}

export default MarkdownEditor;
