
import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; // Importing Router components
import AuthForm from './components/AuthForm';// Assuming you have the AuthForm component
import ContactForm from './components/ContactForm'; // Assuming you have the ContactForm component
import './index.css'; 
import Student from './components/Student';
import Proffesor from './components/Proffesor';
import Aboutus from './components/Aboutus';
import Home from './components/Home';
const theme = createTheme();

const App = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAboutus, setShowAboutus] = useState(false);
  const [login,setLogin] = useState(false)
  const [home,setHome] = useState(true)
  const [proflogin,setProflogin] = useState(false)
  const [showhome,setShowHome] = useState(false)
  const handleContactButtonClick = () => {
    if(login){
      setLogin(false)
    }
    else{
      if(showAboutus){
        handleAboutusClick()
      }
      else{
        setShowContactForm((prev) => !prev);
      }
    }
  };


  const handleAboutusClick = () => {
    if(login){
      setLogin(false)
    }
    else{
    setShowAboutus((prev) => !prev);
    }
  };

  const handleHomeclick =()=>{
    // if(login){
    //   setLogin(false)
    //
    setLogin(false)
    setHome((prev) => !prev);
  }

  return (
    <ThemeProvider theme={theme}>
      { !home ? <>
      <Grid container justifyContent="flex-end" sx={{ padding: '10px' }}>
        <Grid item >
          { !login &&
               <Button
               variant="contained"
               color="primary"
               //style={{backgroundColor:"#FF5349"}}
               onClick={handleHomeclick}
               //sx={{ margin: '10px' }}
               className="contact-button"
               style={{marginRight:"10px"}}
              >
               Home
             </Button>
          }
          { !login && !showAboutus && !showContactForm &&
         <>
        <Button
            variant="contained"
            color="primary"
            //style={{backgroundColor:"#FF5349"}}
            onClick={handleAboutusClick}
            //sx={{ margin: '10px' }}
            className="contact-button"
            style={{marginRight:"10px"}}
          >
            Aboutus
          </Button>
          </>
          }
          <Button
            variant="contained"
            color="primary"
            //style={{backgroundColor:"#FF5349"}}
            onClick={handleContactButtonClick}
            //sx={{ margin: '10px' }}
            className="contact-button"
          >
            {showContactForm||showAboutus ? 'Back to Login' : login ?'Logout': 'Contact Us'}
          </Button>
        </Grid>
      </Grid>
      {!login &&
      <div className="form-container">
      {showContactForm && !login ? <ContactForm /> : showAboutus && !login ? <Aboutus /> : !login && <AuthForm login={login} setLogin={setLogin} setProflogin={setProflogin}/>}
      </div>
      }
       
      <div>
        {login && proflogin? <Proffesor/>: login && <Student/> }
      </div>
      <div>
        {/* {showAboutus && <Aboutus/>} */}
      </div>
      </>
       :
      <div>
      <Home setHome={setHome} 
      setShowAboutus={setShowAboutus}
      setShowContactForm={setShowContactForm}
      handleAboutusClick={handleAboutusClick}
      handleContactButtonClick ={handleContactButtonClick}
      setLogin={setLogin}
      />
    </div>
}
    </ThemeProvider>
  
  );
};

export default App;




