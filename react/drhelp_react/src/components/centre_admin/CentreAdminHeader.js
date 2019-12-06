import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import NavLink from 'react-bootstrap/NavLink'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import {Link} from 'react-router-dom'
import {CentreAdminContext} from '../../context/CentreAdminContextProvider';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          {/* <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={e => setValue(e.target.value)}
            value={value}
          /> */}
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              child =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

class CentreAdminHeader extends Component {
  static contextType = CentreAdminContext;
    

    render() { 
        return ( 
            <Navbar bg="light" expand="lg" id="navbarColor03">
            <Navbar.Brand >
              <Link exact to = '/centreAdministrator/profile' class="nav-link">
                {this.context.admin.firstName}&nbsp;{this.context.admin.lastName}
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link>
                    <Link exact to = '/centreAdministrator/profile' class="nav-link">Profile</Link>
                </Nav.Link>
                <Nav.Link >
                    <Link exact to = '/clinic/add' class="nav-link">New clinic</Link>
                </Nav.Link>
                <Nav.Link>
                    <Link exact to = '/admin/add' class="nav-link">New admin</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link exact to = '/admin/requests' class="nav-link"> Patient requests </Link>
                </Nav.Link>

                <Nav.Link >
                  <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                      Custom toggle
                      </Dropdown.Toggle>

                      <Dropdown.Menu as={CustomMenu}>
                      <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                      <Dropdown.Item eventKey="3" active>
                          Orange
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
              </Nav.Link>
  
              <Nav.Link> 
                  <Link exact to = '/medication/new' class="nav-link"> New medication </Link>
              </Nav.Link>
              <Nav.Link> 
                  <Link exact to = '/diagnosis/new' class="nav-link"> New diagnosis </Link>
              </Nav.Link>

            </Nav>
            <Nav className="justify-content-end" >
                <Nav.Link>
                    <Link exact to='/login' onClick={this.props.logout} class="nav-link">Logout</Link>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
         );
    }
}
 
export default CentreAdminHeader;