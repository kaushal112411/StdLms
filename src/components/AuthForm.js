import React, { useState,useRef} from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
} from "react-router-dom"; // Importing Router components // Importing useHistory hook
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import "../index.css";
import Student from "./Student";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL, LOCAL_URL } from "./apiconfig";
const theme = createTheme();

const AuthForm = (props) => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [graduationDate, setGraduationDate] = useState("");
  const [role, setRole] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [respasswordError, setRespasswordError] = useState(false);
  const [nameError,setNameerror] = useState(false)
  const [dateerror,setDateerror] = useState(false)
  const [roleerror,setRoleerror] = useState(false)
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const canvasRef = useRef(null);
  //const history = useHistory();

  const handleLogin = () => {
    if (!email) {
      setEmailError(true);
      // return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }

    // Reset error states
    setEmailError(false);
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        setPasswordError(false);
        return;
    }
    // Handle login logic here
    const payload = {
      email: email,
      password: password,
    };
    axios
      .post(`${LOCAL_URL}/login`, payload)
      .then((res) => {
        console.log(res);
        props.setUserDetails(res.data);
        if (res.data.UserType == "Professor") {
          props.setProflogin(true);
          // navigate("/professor");
        }

        props.setLogin(true);
        // localStorage.setItem("login", "true");
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        Swal.fire({
          title: err?.response?.data?.message,
          // text: "Report Uploaded Succesfully!",
          icon: "error",
        });
      });
    //window.location.href = '/student'
    console.log("Login with:", email, password);
  };

  const handleRegister = () => {
    // Handle registration logic here
    let valid = true;
    if (!email.includes("@mavs.uta.edu")) {
      // If email is empty or does not contain the required domain
      setEmailError(true);
      console.log("not inlcuded");
      valid = false;
    } else {
      // Reset error state if email is valid
      setEmailError(false);
    }

    if(!graduationDate.length){
      setDateerror(true)
    }
    
    if(!password){
      setRespasswordError(true)
    }
    if(!role){
      setRoleerror(true)
    }
    // Contact validation
    if (isNaN(contactDetails) || contactDetails.length != 10) {
      setContactError(true);
      valid = false;
    } else {
      valid = true;
      setContactError(false);
    }

    if (captchaInput !== captchaText) {
      setCaptchaError(true);
      return;
    }
    if(!name.length){
      setNameerror(true)
    }
    // Reset CAPTCHA error
    setCaptchaError(false);

    let payload;
    if (email.includes("@mavs.uta.edu")) {
      payload = {
        Name: name,
        Email: email,
        Password: password,
        UserType: role,
      };
    } else {
      payload = {
        Name: name,
        Email: "",
        Password: password,
        UserType: role,
      };
    }
    console.log("Register with:", email, password);
    if (email.includes("@mavs.uta.edu")) {
      axios
        .post(`${LOCAL_URL}/Users`, payload)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "User Created Successfully!",
            // text: "Report Uploaded Succesfully!",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Something went wrong",
            // text: "Report Uploaded Succesfully!",
            icon: "error",
          });
        });
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setContactDetails("");
      setGraduationDate("");
      setCaptchaInput("")
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Forgot password for:", forgotPasswordEmail);
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

  const generateRandomChar = (min, max) =>
  String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

const generateCaptchaText = () => {
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += generateRandomChar(65, 90);
  }
  return captcha;
};

const drawCaptchaOnCanvas = (ctx, captcha) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.font = "20px Arial";
  ctx.fillText(captcha, 10, 25);
};

const initializeCaptcha = () => {
  const newCaptcha = generateCaptchaText();
  setCaptchaText(newCaptcha);
  drawCaptchaOnCanvas(canvasRef.current.getContext("2d"), newCaptcha);
};

  const handleCaptchaInputChange = (e) => {
    setCaptchaInput(e.target.value);
    setCaptchaError(false)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="sm"
        //style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}
        sx={{
          borderRadius: "10px", // Adjust the value as needed
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
                  helperText={emailError && "Please enter Email Address"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
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
                  helperText={passwordError && "Please enter Password"}
                  error={passwordError}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
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
                    <Link
                      href="#"
                      variant="body2"
                      sx={{ textDecoration: "none", color: "#1976d2" }}
                      onClick={showForgotPasswordFormHandler}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      sx={{ textDecoration: "none", color: "#1976d2" }}
                      onClick={showRegisterFormHandler}
                    >
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
                  id="Name"
                  label="Name"
                  name="Name"
                  autoComplete="Name"
                  autoFocus
                  value={name}
                  error={nameError}
                  helperText={nameError && "Please Enter Name"}
                  onChange={(e) => {
                    setName(e.target.value)
                    setNameerror(false)
                  }}
                />
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
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  helperText={emailError && "Please Enter Email"}
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
                  error={respasswordError}
                  helperText={respasswordError && "Please enter Password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="contactDetails"
                  label="Contact Details (Mobile Number)"
                  name="contactDetails"
                  autoComplete="contactDetails"
                  type="number"
                  value={contactDetails}
                  error={contactError}
                  helperText={contactError ? "Invalid contact number" : ""}
                  onChange={(e) => {
                    setContactDetails(e.target.value);
                    setContactError(false);
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="graduationDate"
                  label="Graduation Date"
                  name="graduationDate"
                  type="date"
                  autoComplete="graduationDate"
                  value={graduationDate}
                  helperText={dateerror && "Please Enter Date"}
                  error={dateerror}
                  onChange={(e) => {
                    setGraduationDate(e.target.value)
                    setDateerror(false)
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    placeholder: "", // Remove the placeholder text
                  }}
                />

                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                >
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value)
                      setRoleerror(false)
                    }}
                    helperText={roleerror && "Please select role"}
                    error={roleerror}
                    label="Role"
                  >
                    <MenuItem value="Graduate">Graduate</MenuItem>
                    <MenuItem value="Professor">Professor</MenuItem>
                  </Select>
                </FormControl>
                <Typography component="h4">
                  CAPTCHA Test
                </Typography>
                <canvas ref={canvasRef} width={100} height={40} />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="captchaInput"
                  label="Enter CAPTCHA"
                  name="captchaInput"
                  autoComplete="off"
                  autoFocus
                  value={captchaInput}
                  onChange={handleCaptchaInputChange}
                  error={captchaError}
                  helperText={captchaError ? "Incorrect CAPTCHA" : ""}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleRegister}
                >
                  Register
                </Button>
                <Button fullWidth onClick={initializeCaptcha}>
                  Refresh CAPTCHA
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
