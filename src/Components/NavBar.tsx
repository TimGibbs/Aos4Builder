import {  Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation : React.FC = () => <Navbar bg="light" expand="lg">
<Container>
  <Navbar.Brand as={Link} to="/">AoS</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/lists">Lists</Nav.Link>
      <Nav.Link as={Link} to="/abilities">Abilities</Nav.Link>
      <Nav.Link as={Link} to="/warscrolls">Warscrolls</Nav.Link>
      
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>

export default Navigation;