import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { isLoggedIn } from "modules/authentication";

// Component imports
import Login from "components/login";
import Signup from "components/signup";
import TokenExchange from "components/tokenExchange";
import Files from "components/files";
import PrivateRoute from "components/router/components/privateroute";

export const Router = () => {
  const { token } = useParams();
  return (
    <BrowserRouter>
      {/* Open routes */}
      <Switch>
        <Route path="/" children={isLoggedIn() ? <Files /> : <Login />} />
        <Route
          path="/authenticate/:token"
          children={<TokenExchange token={token ? token : false} />}
        />
        <Route path="/signup" children={<Signup />} />
      </Switch>
      {/* Protected routes */}
      <Switch></Switch>
    </BrowserRouter>
  );
};
/**
 * /
 *
 */
