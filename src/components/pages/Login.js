import React from "react";
import { Container, Button } from "react-bootstrap";
import { auth, googleAuthProvider } from "../fierbase";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../store/userSlice";
import { createAndUpdateUser } from "../functions/auth";

const Login = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user.value);
  const dispatch = useDispatch();

  
  const handleLoginByGoogle = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        // console.log('result', result)
        const { user } = result;
        const idToken = await user.getIdToken();

        // console.log('user', user.email, idToken)
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
          .catch((error) => {
            console.log("Create and update user failed");
          });
      })
      .catch((error) => {
        console.log("Login by Google failed");
      });
  };
  return (
    <Container>
      <h1>{user.value}</h1>
      <Button onClick={handleLoginByGoogle}>Singnin with Google</Button>
      <hr />
      <Button onClick={() => dispatch(login())}>Login</Button>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </Container>
  );
};

export default Login;
