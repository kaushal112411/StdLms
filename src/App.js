import React, { useState , useEffect} from "react";
import { Button, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes
} from "react-router-dom"; // Importing Router components
import AuthForm from "./components/AuthForm"; // Assuming you have the AuthForm component
import ContactForm from "./components/ContactForm"; // Assuming you have the ContactForm component
import "./index.css";
import Student from "./components/Student";
import Proffesor from "./components/Proffesor";
import Aboutus from "./components/Aboutus";
import Home from "./components/Home";
import Services from "./components/Services";
import MessageBoard from "./components/MessageBoard";
import TaskManagement from "./components/TaskManagement";
import { LoginOutlined } from "@mui/icons-material";
const theme = createTheme();

const App = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAboutus, setShowAboutus] = useState(false);
  const [login, setLogin] = useState(false);
  const [home, setHome] = useState(true);
  const [proflogin, setProflogin] = useState(false);
  const [showservice, setShowservice] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [showMessageBoard, setShowMessageBoard] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [showtaskm,setShowtaskm] = useState(false)

 // Function to toggle between light and dark themes
 const toggleTheme = () => {
  setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
};

// useEffect(() => {
//   // Check if user is already logged in
//   console.log(login,"LOGIN")
//   const logedin = localStorage.getItem("login");
//   if (logedin === "true") {
//     setLogin(true);
//   }
// }, []);

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 30,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

// Define light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: "light", // Ensure mode is defined for light theme
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark", // Ensure mode is defined for dark theme
  },
});


  const handleContactButtonClick = () => {
    if (login) {
      setLogin(false);
    } else {
      if (showAboutus) {
        handleAboutusClick();
      } else {
        if (showservice) {
          handleserviceclick();
        } else {
          setShowContactForm((prev) => !prev);
        }
      }
    }
  };

  const handleAboutusClick = () => {
    if (login) {
      setLogin(false);
    } else {
      setShowAboutus((prev) => !prev);
    }
  };

  const handleserviceclick = () => {
    if (login) {
      setLogin(false);
    } else {
      setShowservice((prev) => !prev);
    }
  };

  const handleHomeclick = () => {
    // if(login){
    //   setLogin(false)
    //
    setLogin(false);
    setShowContactForm(false);
    setShowAboutus(false);
    setShowservice(false);
    setHome((prev) => !prev);
  };
  const handleMessageBoardClick = () => {
    setShowMessageBoard(true); // Set state to show MessageBoard component
    setShowtaskm(false)
  };
  const handleTaskmanage =()=>{
    setShowtaskm(true)
    setShowMessageBoard(false)
  }
  const handleCloseTaskmanage =()=>{
    setShowtaskm(false)
  }
  const handleMessageBoardCLOSEClick = () => {
    setShowMessageBoard(false); // Set state to show MessageBoard component
  };
  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      {/* <Router> */}
        {/* <Switch> */}
      {!home ? (
        <div style={{backgroundColor:themeMode=="light"?"white":"#121212"}} id="maincon">
          <Grid container justifyContent="flex-end" sx={{ padding: "10px" }}>
          <Grid item style={{marginRight:"1%"}} >
              <MaterialUISwitch 
                sx={{ m: 2 }} defaultChecked 
                checked={themeMode === "dark"}
                onChange={toggleTheme}
                color="primary"
                title="change to dark"
                size="small"
              />
            </Grid>
            <Grid item>
              {login && !showMessageBoard &&(
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMessageBoardClick}
                  style={{ marginRight: "10px" }}
                  className="contact-button"
                >
                  Message Board
                </Button>
              )}
              {
                login && !proflogin && !showtaskm &&
                <Button
                variant="contained"
                color="primary"
                onClick={handleTaskmanage}
                style={{ marginRight: "10px" }}
                className="contact-button"
              >
                Calender
              </Button>
              }
              {!login && (
                <Button
                  variant="contained"
                  color="primary"
                  //style={{backgroundColor:"#FF5349"}}
                  onClick={handleHomeclick}
                  //sx={{ margin: '10px' }}
                  className="contact-button"
                  style={{ marginRight: "10px" }}
                >
                  Home
                </Button>
              )}
              {!login && !showAboutus && !showContactForm && !showservice && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    //style={{backgroundColor:"#FF5349"}}
                    onClick={handleAboutusClick}
                    //sx={{ margin: '10px' }}
                    className="contact-button"
                    style={{ marginRight: "10px" }}
                  >
                    Aboutus
                  </Button>
                </>
              )}
              { !showtaskm && !showMessageBoard &&
              <Button
                variant="contained"
                color="primary"
                //style={{backgroundColor:"#FF5349"}}
                onClick={handleContactButtonClick}
                //sx={{ margin: '10px' }}
                className="contact-button"
              >
                {showContactForm || showAboutus || showservice
                  ? "Back to Login"
                  : login
                  ? "Logout"
                  : "Contact Us"}
              </Button>
}
            </Grid>
          </Grid>
          {!login && (
            <div className="form-container">
              {showContactForm && !login ? (
                <ContactForm />
              ) : showAboutus && !login ? (
                <Aboutus />
              ) : showservice && !login ? (
                <Services />
              ) : (
                !login && (
                  <AuthForm
                    login={login}
                    setLogin={setLogin}
                    setProflogin={setProflogin}
                    setUserDetails={setUserDetails}
                  />
                )
              )}
            </div>
          )}
          {
            login && 
            showMessageBoard &&
            <MessageBoard userDetails={userDetails} onClose={handleMessageBoardCLOSEClick} showMessageBoard={showMessageBoard} themeMode={themeMode} />
          }
          {
            login && 
            showtaskm &&
            <TaskManagement userDetails={userDetails} onClose={handleCloseTaskmanage} showtaskm={showtaskm} themeMode={themeMode} />
          }
          {/* {
        !login && 
        <div className="form-container" >
         {}
        </div>
       } */}
          <div>
            {login && proflogin && !showMessageBoard && !showtaskm ? (
              <Proffesor userDetails={userDetails} themeMode={themeMode} />
            ) : (
              login &&  !showMessageBoard && !showtaskm && <Student userDetails={userDetails} themeMode={themeMode} setLogin={setLogin} login={login}/>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Home
            setHome={setHome}
            setShowAboutus={setShowAboutus}
            setShowContactForm={setShowContactForm}
            handleAboutusClick={handleAboutusClick}
            handleContactButtonClick={handleContactButtonClick}
            handleserviceclick={handleserviceclick}
            setLogin={setLogin}
            setShowservice={setShowservice}
          />
        </div>
      )}
       {/* </Switch> */}
    {/* </Router> */}
    </ThemeProvider>
     
  );
};

export default App;
