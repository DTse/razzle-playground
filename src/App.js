import "./styles/App.css";

import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Routes from "./routes/Routes";

import { useAppContext } from "./context/AppContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        flexDirection: "column",
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const App = () => {
    const classes = useStyles();
    const { state } = useAppContext();
    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <Header />
                <Sidebar />
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: state.open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Routes pages={state.pages}/>
                </main>
            </div>
        </>
    );
};

export default App;
