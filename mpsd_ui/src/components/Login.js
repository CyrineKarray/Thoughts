import React, { useState, useContext } from "react";
import Axios from "axios";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router";
import { AuthContext } from "../lib/authContext";

import "./css/login.css";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { userHasAuthenticated, setToken } = useContext(AuthContext);

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userParams = {
      username: username,
      password: password,
    };

    Axios.post("http://localhost:1000/auth/login", userParams)
      .then((resp) => {
        console.log(resp);
        userHasAuthenticated(true);
        setToken(resp.data);
        localStorage.setItem("token", resp.data);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="text" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
