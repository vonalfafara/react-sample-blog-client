import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getAuthenticatedUser();
    window.addEventListener("storage", getAuthenticatedUser);
    return () => {
      window.removeEventListener("storage", getAuthenticatedUser);
    };
  }, []);

  function getAuthenticatedUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }

  function logout() {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="dark"
      data-bs-theme="dark"
      className="mb-5"
    >
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          <Nav>
            {loggedIn ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
