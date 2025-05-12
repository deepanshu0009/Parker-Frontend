import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function CustomNavbar() {
  return (
    <Navbar bg="primary" variant="dark" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#home">Free Slot</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
