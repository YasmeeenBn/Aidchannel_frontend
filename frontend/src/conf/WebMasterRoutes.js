import React from "react";
import { Route } from "react-router-dom";
import WebMasterLayout from "../components/layout/webmaster/WebMasterLayout";

const WebMasterRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <WebMasterLayout>
          <Component {...props} />
        </WebMasterLayout>
      )}
    />
  );
};

export default WebMasterRoutes;
