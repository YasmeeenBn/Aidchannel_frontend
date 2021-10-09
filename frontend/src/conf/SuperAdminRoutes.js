import React from "react";
import { Route } from "react-router-dom";
import SuperAdminLayout from "../components/layout/superadmin/SuperAdminLayout";

const SuperAdminRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <SuperAdminLayout>
          <Component {...props} />
        </SuperAdminLayout>
      )}
    />
  );
};

export default SuperAdminRoutes;
