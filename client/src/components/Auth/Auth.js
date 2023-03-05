import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Icon from './icon'
import LockOutlineIcon from '@material-ui/icons/LockOpenOutlined';
import { useDispatch } from 'react-redux';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import useStyles from './styles'
import Input from './Input'
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { signin, signinupwithgoogle, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(true);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => {setShowPassword((prevShowpassword) => !prevShowpassword)}

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        try { 
            const decoded = jwt_decode(res.credential);
            dispatch(signinupwithgoogle(decoded, history));
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = (error) => {
        console.log("Google Sign In was unsuccessfull. Try again later", error);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlineIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" half />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : "password" } handleShowPassword={handleShowPassword} half />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin 
                        fullWidth
                        props={(renderProps) => (
                            <Button className={classes.Button} color="primary" fullWidth onClick={renderProps.onClick} disable={renderProps.disable} startIcon={<Icon/>} variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onError={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth