import { Container, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" variant="light" className="border-bottom">
      <Container fluid>
        <Navbar.Brand href="#home" className="fw-bold">
          <i className="bi bi-database me-2"></i> SQL Query Runner
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
