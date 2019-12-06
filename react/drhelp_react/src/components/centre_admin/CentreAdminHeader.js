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

    

    render() { 
        return ( 
            <Navbar bg="light" expand="lg">
        <Navbar.Brand >{this.props.id}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link >
                    <Link exact to = '/centreAdministrator/profile' >Profile</Link>
                </Nav.Link>

                <li class="nav-item dropdown">

                <Nav.Link class="nav-link dropdown-toggle" data-toggle="dropdown" >
                    <Link href="#" role="button" aria-haspopup="true" aria-expanded="false">Create</Link>
                </Nav.Link>
                    <div class="dropdown-menu">
                        
                    </div>
                </li>

                <Nav.Link class="dropdown-item"> 
                            <Link exact to = '/clinic/add' >New clinic</Link>
                        </Nav.Link>
                        <Nav.Link class="dropdown-item">
                            <Link exact to = '/admin/add'  >New admin</Link>
                        </Nav.Link>

                {/* <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <button type="button" class="btn btn-success">Success</button>
                        <div class="btn-group show" role="group">
                            <button id="btnGroupDrop2" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></button>
                            <div class="dropdown-menu show" aria-labelledby="btnGroupDrop2" style={{position: "absolute", top: "0px", left: "0px"}} x-placement="bottom-start">
                            <a class="dropdown-item" href="#">Dropdown link</a>
                            <a class="dropdown-item" href="#">Dropdown link</a>
                        </div>
                    </div>
                </div> */}
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


                    <Link exact to = '/admin/requests'> Patient requests </Link>
                </Nav.Link>   
                <Nav.Link> 
                    <Link exact to = '/medication/new'> New medication </Link>
                </Nav.Link>
                <Nav.Link> 
                    <Link exact to = '/diagnosis/new'> New diagnosis </Link>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
         );
    }
}
 
export default CentreAdminHeader;