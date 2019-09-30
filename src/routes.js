import React from "react";
import { Switch, Route } from "react-router-dom";

import Feed from "./pages/Feed";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Feed} />
    </Switch>
  );
}

export default Routes;
