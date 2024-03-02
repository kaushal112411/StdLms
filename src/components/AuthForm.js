import React, { useState } from 'react';
import { Button, TextField, Link, Grid, Typography, Container,Paper,MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route} from 'react-router-dom'; // Importing useHistory hook
import LockIcon from '@mui/icons-material/Lock';
import "../index.css"
import Student from './Student';
const theme = createTheme();

const AuthForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  //const history = useHistory();

const handleLogin = () => {
  if (!email) {
    setEmailError(true);
    return;
  }
  if (!password) {
    setPasswordError(true);
    return;
  }
  // Reset error states
  setEmailError(false);
  setPasswordError(false);
  // Handle login logic here
  props.setLogin(true)
  if (email.includes("Proffesor")) {
    props.setProflogin(true);
  }
  //window.location.href = '/student'
  console.log('Login with:', email, password);
};



  const handleRegister = () => {
    // Handle registration logic here
    console.log('Register with:', email, password);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password for:', forgotPasswordEmail);
  };

  const showLoginFormHandler = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setShowForgotPasswordForm(false);
  };

  const showRegisterFormHandler = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
    setShowForgotPasswordForm(false);
  };

  const showForgotPasswordFormHandler = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowForgotPasswordForm(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm"
       //style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}
       sx={{
        borderRadius: '10px', // Adjust the value as needed
        // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add shadow for depth
        // padding: '20px', // Add padding for spacing
        // marginBottom:'50px',
       // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Background gradient
      }}
       >
        <Paper elevation={3} style={{ padding: 50, marginBottom: 150 }}>
        {showLoginForm && (
          <div>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                error={emailError}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError(false)
                }
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={passwordError}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError(false)
                }
                }
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                endIcon={<LockIcon />}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{ textDecoration: 'none', color: '#1976d2' }} onClick={showForgotPasswordFormHandler}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" sx={{ textDecoration: 'none', color: '#1976d2' }}  onClick={showRegisterFormHandler}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        )}
         
        {showRegisterForm && (
          <div>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
                       <FormControl fullWidth variant="outlined" margin="normal" required>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Role"
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="instructor">Instructor</MenuItem>
                    <MenuItem value="administrator">Administrator</MenuItem>
                    <MenuItem value="quality_assurance_officer">Quality Assurance Officer</MenuItem>
                    <MenuItem value="program_coordinator">Program Coordinator</MenuItem>
                  </Select>
                </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleRegister}
              >
                Register
              </Button>
            </form>
            <Link href="#" variant="body2" onClick={showLoginFormHandler}>
              Back to Login
            </Link>
          </div>
        )}

        {showForgotPasswordForm && (
          <div>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="forgotPasswordEmail"
                label="Email Address"
                name="forgotPasswordEmail"
                autoComplete="email"
                autoFocus
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </Button>
            </form>
            <Link href="#" variant="body2" onClick={showLoginFormHandler}>
              Back to Login
            </Link>
          </div>
        )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AuthForm;
