/**
 * Caution: Consider this file when using react-scripts
 *
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or NextJS version
 */
import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "./conf/Routes";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { setAuthorizationToken } from "apis";

const browserHistory = createBrowserHistory();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
