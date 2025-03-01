import { Box, Button, Grid, Paper, Typography, TextField, IconButton, InputAdornment, FormControl, MenuItem, Select } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export const Account = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [title, setTitle] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState("");
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const nav = useNavigate();

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    // Password Validation
    const validatePassword = (password) => {
        const rule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
        return rule.test(password);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!validatePassword(newPassword)) {
            setError("Must be 6+ chars, with uppercase, lowercase & special character.");
        } else {
            setError("");
        }
    };

    const handleSignup = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!fullname || !email || !password) {
            alert("All fields are required!");
            return;
        }

        let data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
        let object = { EmailId: email, password };
        data.push(object);
        localStorage.setItem("data", JSON.stringify(data));

        alert("Signup Successful! Redirecting to Login...");
        setIsLogin(true);
    };

    const handleSignin = () => {
        let storedData = JSON.parse(localStorage.getItem("data"));
        if (storedData) {
            const user = storedData.find(user => user.EmailId === loginEmail && user.password === loginPassword);
            if (user) {
                alert("Login Successful!");
                nav('/');
            } else {
                alert("Invalid email or password");
            }
        }
    };

    return (
        <Box>
            <Grid container>
                <Grid item lg={12} sx={{ height: "65px" }}></Grid>
                <Grid container sx={{ height: "600px", display: "flex", justifyContent: "center", backgroundImage: "url(https://cdn.igp.com/raw/upload/assets/svg-icons/rebrand-login-ill.svg)" }}>
                    <Paper sx={{ height: "auto", width: "50%", mt: 5, p: 4 }}>
                        <Typography variant='h4'><b>{isLogin ? "Sign in" : "Sign up"}</b></Typography>
                        <Typography variant='h6' color='grey'>
                            <b>{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}</b>
                            <Link onClick={toggleAuthMode}>{isLogin ? "Sign up" : "Sign in"}</Link>
                        </Typography>

                        <Box component="form">
                            {!isLogin && (
                                <>
                                    <Typography><b>Full name*</b></Typography>
                                    <FormControl sx={{ width: "100px" }}>
                                        <Select
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        >
                                            <MenuItem value="Mr.">Mr.</MenuItem>
                                            <MenuItem value="Mrs.">Mrs.</MenuItem>
                                            <MenuItem value="Miss.">Miss.</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        placeholder='Full name'
                                        variant="outlined"
                                        sx={{ width: "60%", ml: 1 }}
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                    />
                                    <Grid sx={{ my: 2 }}>
                                        <Typography><b>Email Id or mobile number*</b></Typography>
                                        <TextField
                                            placeholder="Email Id or mobile number"
                                            variant="outlined"
                                            sx={{ width: "80%" }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid>
                                        <Typography><b>Password*</b></Typography>
                                        <TextField
                                            placeholder="At least 6 Characters"
                                            variant="outlined"
                                            sx={{ width: "80%" }}
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={handlePasswordChange}
                                            error={!!error}
                                            helperText={error}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            required
                                        />
                                    </Grid>
                                    <Grid sx={{ my: 2 }}>
                                        <Typography><b>Confirm Password*</b></Typography>
                                        <TextField
                                            placeholder="Confirm Password"
                                            variant="outlined"
                                            sx={{ width: "80%" }}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                </>
                            )}

                            {isLogin && (
                                <>
                                    <Grid sx={{ my: 2 }}>
                                        <Typography><b>Email Id or mobile number*</b></Typography>
                                        <TextField
                                            placeholder="Email Id or mobile number"
                                            variant="outlined"
                                            sx={{ width: "80%" }}
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid>
                                        <Typography><b>Password*</b></Typography>
                                        <TextField
                                            placeholder="At least 6 Characters"
                                            variant="outlined"
                                            sx={{ width: "80%" }}
                                            type={showPassword ? "text" : "password"}
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            required
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid sx={{ my: 2 }}>
                                <Button sx={{ height: "55px", width: "80%", backgroundColor: "rgb(84, 7, 96)", color: "white", fontSize: "19px" }} onClick={isLogin ? handleSignin : handleSignup}>
                                    {isLogin ? "SIGN IN" : "SIGN UP"}
                                </Button>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
