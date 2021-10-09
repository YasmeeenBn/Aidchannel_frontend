import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import isLogin from "./authorization";

const SecureRouteLink = (props) => {
  const [isLogged] = useState(isLogin);
  return (
    <Route
      path={props.path}
      render={(data) =>
        isLogged ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect
            to={{ pathname: "/linkdin/login", state: { from: props.location } }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default SecureRouteLink;
