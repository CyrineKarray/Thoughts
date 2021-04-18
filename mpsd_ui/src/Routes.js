import React from "react";
import { Route, Switch } from "react-router-dom";
import Posts from "./components/Posts";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Routes() {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Posts} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Register} />
      <Route exact component={NotFound} />
    </Switch>
  );
}
