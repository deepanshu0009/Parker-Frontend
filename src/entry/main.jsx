import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from 'react-bootstrap';
import {Link } from 'react-router-dom';


function Navmenu() {

  return (
    <div style={{borderBottom:'solid grey 1px'}}>
      <Navbar className="bg-body" >
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <div className='Nav-btn-div'>
            <Link to="/signup" style={{marginRight:10}}>
              <Button className="Nav-btn" type="button">Signup</Button>
            </Link>

            <Link to="/login">
              <Button className="Nav-btn" type="button">Login</Button>
            </Link>
          </div>

        </Container>
      </Navbar>
    </div>
  );
}

export default Navmenu;