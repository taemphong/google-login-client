
import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { auth, googleAuthProvider } from "../fierbase";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { createAndUpdateUser } from "../functions/auth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginByGoogle = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idToken = await user.getIdToken();
        createAndUpdateUser(idToken)
          .then((res) => {
            dispatch(
              login({
                email: res.data.email,
                name: res.data.name,
                token: idToken.token,
              })
            );
          })
          .catch(() => {
            console.log("Create and update user failed");
          });
      })
      .catch(() => {
        console.log("Login by Google failed");
      });
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
        <h1>{user?.user?.email || "Guest"}</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="w-100 mt-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <hr />
      <Button className="w-100 mt-2" variant="light" onClick={handleLoginByGoogle}>
        <FcGoogle size={20} className="me-2" /> Sign in with Google
      </Button>
      <hr />
      {/* <Button className="w-100" variant="danger" onClick={() => dispatch(logout())}>
        Logout
      </Button> */}
    </Container>
  );
};

export default Login;
