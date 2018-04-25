import React from 'react'
import {Navbar, Nav, NavItem, FormControl} from 'react-bootstrap'
import { push } from 'react-router-redux'
import {connect} from 'react-redux'
import {Link } from "react-router-dom";

class NavigationBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      redirect: false,
    };
  }
  componentWillMount() {
    this.setState({redirect: false});
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={process.env.PUBLIC_URL}>ETH Notebook</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              <FormControl
                type="text"
                placeholder="Enter Transaction ID"
                value={this.state.input}
                onChange={e=>this.setState({input: e.target.value})}
                onKeyUp={e=>{
                  if(e.key==='Enter'){
                    this.props.dispatch(
                      push(process.env.PUBLIC_URL + '/tx/'+this.state.input)
                    );
                  }
                }}
              />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect()(NavigationBar);
