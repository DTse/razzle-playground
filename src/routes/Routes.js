import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import About from "../pages/About";

/**
   * Return the user image located in the assets folder.
   * @param {object} props
   * @return {any} routes
**/
const Routes = (props) => {
  return (
	<Switch>
		<Route exact path="/" component={Home}/>
		<Route path="/about" component={About} />
		<Route component={NotFound} />
	</Switch>
  )
};

export default Routes;