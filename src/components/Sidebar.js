import React, { memo } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InfoIcon from "@material-ui/icons/Info";

import { useAppContext } from "../context/AppContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        justifyContent: "flex-end",
        ...theme.mixins.toolbar,
    },
}));

/**
 * Return the Drawer Component.
 * @param {object} history
 * @return {any}
 **/
const Sidebar = memo(({ history }) => {
    const classes = useStyles();
    const { state, dispatch } = useAppContext();

    const handleDrawerClose = () => {
        dispatch({ type: "setOpen", value: false });
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={state.open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {state.pages.map((page) => {
                    return (
                        <ListItem key={page.id} button onClick={() => history.push(page.slug)}>
                            <ListItemIcon>{page.slug === "/" ? <HomeIcon /> : page.slug === "/about" ? <InfoIcon /> : <MenuBookIcon />}</ListItemIcon>
                            <ListItemText primary={page.title} />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
});

Sidebar.propTypes = {
    history: PropTypes.object,
};

export default withRouter(Sidebar);