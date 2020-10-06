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
            <Route exact path="/" component={(props) => <Home data={pages.filter((page) => page.id === 1)[0]} {...props} />} />
            {pages.map((page) => (
                <Route key={page.id} exact path={page.slug} component={(props) => <Page data={page} {...props} />} />
            ))}
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;
