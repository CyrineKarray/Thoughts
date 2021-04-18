import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";
import { AuthContext } from "./lib/authContext";
import { useHistory } from "react-router";
import AddModal from "./components/AddPost";

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    userHasAuthenticated(false);
    history.push("/");
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <AddModal show={show} handleClose={handleClose} setShow={setShow} />
      <div className="App container">
        <Navbar className="bg-light justify-content-between">
          <Nav>
            <Navbar.Brand>
              <Link to="/">Thoughts</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Nav>
          <Nav>
            {isAuthenticated || localStorage.getItem("token") ? (
              <>
                <Nav.Item>
                  <Nav.Link>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={handleShow}>New Tought</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={handleLogout}>
                    {" "}
                    Logout
                    <i
                      style={{ marginLeft: "10px" }}
                      class="fas fa-sign-out-alt"
                    ></i>
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                {" "}
                <Nav.Item>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar>
        <AuthContext.Provider
          value={{
            isAuthenticated,
            userHasAuthenticated,
            token,
            setToken,
            show,
            setShow,
          }}
        >
          <Routes />
        </AuthContext.Provider>
      </div>
    </>
  );
};

export default App;
