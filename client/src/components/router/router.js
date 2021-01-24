import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "components/router/components/privateroute";
import Authentication from "components/authentication";
import { useParams } from "react-router-dom";

export const Router = () => {
  const params = useParams();
  return (
    <BrowserRouter>
      {/* Open routes */}
      <Switch>
        <Route path="/authenticate" children={<Authentication />} />
        <Route
          path="/authenticate/:token"
          children={
            <Authentication token={params.token ? params.token : false} />
          }
        />
      </Switch>
      {/* Protected routes */}
      <Switch></Switch>
    </BrowserRouter>
  );
};
