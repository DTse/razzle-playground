import React, { memo } from 'react';
import clsx from 'clsx';
import {useAppContext} from '../context/AppContext';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    headerTitle: {
        fontSize: 26,
        textTransform: "capitalize"
    }
}));

/**
   * Return the App Bar component.
   * @param {object} location
   * @return {any} img
**/
const Header = memo(({location}) => {
    const classes = useStyles();
    const { state, dispatch } = useAppContext();

    const title = location.pathname.replace(/\//g,'');

    const handleDrawerOpen = () => {
        dispatch({type: 'setOpen', value: true});
    };

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: state.open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, state.open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.headerTitle} variant="h1" noWrap>
                    { title ? title : 'Home' }
                </Typography>
            </Toolbar>
        </AppBar>
    );
});


Header.propTypes = {
    location: PropTypes.object,
};


export default withRouter(Header);