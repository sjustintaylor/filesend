import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { isLoggedIn } from "modules/authentication";

// Component imports
import Authentication from "components/authentication";
import Files from "components/files";
import PrivateRoute from "components/router/components/privateroute";

export const Router = () => {
  const { token } = useParams();
  return (
    <BrowserRouter>
      {/* Open routes */}
      <Switch>
        <Route
          path="/"
          children={isLoggedIn() ? <Files /> : <Authentication />}
        />
        <Route
          path="/authenticate/:token"
          children={<Authentication token={token ? token : false} />}
        />
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
