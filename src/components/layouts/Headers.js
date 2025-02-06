import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../fierbase"; 
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Headers = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); 
      navigate("/"); 
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <FcGoogle size={50} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Login with Google: <Link to="/login">Login</Link>
          </Navbar.Text>
          <NavLink to="#" onClick={handleLogout} className="ms-3">
            Logout
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Headers;
