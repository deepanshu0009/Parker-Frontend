import { Navbar, Container } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  // const isSignupPage = location.pathname === "/signup";

  return (
    <Navbar className="py-3 bg-white border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <svg viewBox="0 0 24 24" width="24" height="24" className="me-2 text-primary">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
          </svg>
          <span className="font-weight-bold h5 mb-0">Parker</span>
        </Navbar.Brand>
        <div className="d-flex gap-3">
          <Link to="/about" className="text-decoration-none text-muted">
            About
          </Link>
          <Link to="/contact" className="text-decoration-none text-muted">
            Contact
          </Link>
          {isLoginPage ? (
            <Link to="/signup" className="text-decoration-none text-muted">
              Sign Up
            </Link>
          ) : (
            <Link to="/login" className="text-decoration-none text-muted">
              Login
            </Link>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

export default Header;