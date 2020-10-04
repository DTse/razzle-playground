import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Page from "../pages/Page";

/**
 * Return the user image located in the assets folder.
 * @param {object} props
 * @return {any} routes
 **/
const Routes = ({ pages }) => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            {pages.map((page) => (
                <Route key={page.id} exact path={page.slug} component={Page} />
            ))}
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;
