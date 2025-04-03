import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../fierbase"; 
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const Headers = () => {
    const { user } = useSelector((state) => ({ ...state }));
    console.log(user.value);
    const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); 
      dispatch(logout())
      navigate("/"); 
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm py-3">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <FcGoogle size={40} />
            <span className="fw-bold text-dark">MyApp</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-3">
            <NavLink to="/checklogin" className="text-dark text-decoration-none fw-medium">
              CheckLogin
            </NavLink>
            <Navbar.Text>
              <Link to="/login" className="text-primary fw-medium">
                Login
              </Link>
            </Navbar.Text>
            <NavLink 
              to="#" 
              onClick={handleLogout} 
              className="text-danger fw-medium text-decoration-none"
            >
              Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Headers;
