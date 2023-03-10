import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

import { useDispatch } from 'react-redux';
import { useHistory, Link, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')), );


        if(user?.token){
            const decodedToken = decode(user?.token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    }, [location])

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt='icon' height="45px"/>
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.picture}>{user.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} cariant="h6">{user.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar