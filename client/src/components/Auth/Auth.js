import React, { useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input.js';
import { GoogleLogin } from "react-google-login";
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { signin, signup ,googleSignIn} from "../../actions/auth.js"
import Icon from './Icon.js';
import FileBase from "react-file-base64";
import { gapi } from 'gapi-script'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' ,imageUrl:''};
// const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};
function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: '240073349868-qbaok3om16g5slin7a7bkb5eb2j3heqd.apps.googleusercontent.com',
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signup(formData, history));
        } else {

            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        // e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const switchMode = () => {
        setIsSignUp((prevSignUp) => !prevSignUp);
        // setFormData(initialState);
    };

    const googleSuccess = async (res) => {
        let result = res?.profileObj;
        let token = res?.tokenId;
        
        dispatch(googleSignIn({result,token},history));
    };
    const googleFailure = (error) => {
        console.log(error);
    };

    const handleShowPassword = (e) => {
        setShowPassword((prevShowPassWord) => !prevShowPassWord)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper style={{marginTop: "64px",display: 'flex',flexDirection: 'column',padding:"16px"}} elevation={3}>
                <Avatar style={{margin: "8px",marginLeft:'160px',backgroundColor: "#ce93d8"}}>
                    <LockIcon />
                </Avatar>
                <Typography variant='h5' style={{marginLeft:'142px'}}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form style={{width:'100%',marginTop:'24px'}} onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        {
                            isSignUp && (
                                <>

                                    <Input name='firstName' label="First Name" handleChange={handleChange} justifyContent autoFocus half />
                                    <Input name='lastName' label="Last Name" handleChange={handleChange} half />

                                </>
                            )
                        }
                        <Input name="email" label="Email Adress" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        
                        {isSignUp?
                        (
                            <> 
                            <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            <div style={{marginLeft:'100px'}}>
                            <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, imageUrl: base64})}/>
                            </div>
                            </>
                            )
                            :null}
                        <Button type='submit' fullWidth variant='contained' color='primary' style={{margin: "8px"}} >
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                    </Grid>
                    <GoogleLogin

                        clientId='240073349868-qbaok3om16g5slin7a7bkb5eb2j3heqd.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button
                                style={{ marginTop: "20px",marginBottom: "16px" }}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant='contained'>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item >
                            <Button onClick={switchMode} color='primary' style={{margin: "8px"}}>
                                {isSignUp ? "Already Have an account? Sign In" : "Don't Have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Paper>
        </Container>
    )
}

export default Auth