
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
import Services from './components/Services';
const theme = createTheme();

const App = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAboutus, setShowAboutus] = useState(false);
  const [login,setLogin] = useState(false)
  const [home,setHome] = useState(true)
  const [proflogin,setProflogin] = useState(false)
  const [showservice,setShowservice] = useState(false)
  const handleContactButtonClick = () => {
    if(login){
      setLogin(false)
    }
    else{
      if(showAboutus){
        handleAboutusClick()
      }
      else{
        if(showservice){
          handleserviceclick()
        }
        else{
        setShowContactForm((prev) => !prev);
        }
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

  const handleserviceclick = ()=>{
    if(login){
      setLogin(false)
    }
    else{
    setShowservice((prev) => !prev);
    }
  }

  const handleHomeclick =()=>{
    // if(login){
    //   setLogin(false)
    //
    setLogin(false)
    setShowContactForm(false)
    setShowAboutus(false)
    setShowservice(false)
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
          { !login && !showAboutus && !showContactForm && !showservice &&
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
            {showContactForm||showAboutus||showservice ? 'Back to Login' : login ?'Logout': 'Contact Us'}
          </Button>
        </Grid>
      </Grid>
      {!login &&
      <div className="form-container">
      {showContactForm && !login ? <ContactForm /> : showAboutus && !login ? <Aboutus /> :  showservice && !login ? <Services/>: !login && <AuthForm login={login} setLogin={setLogin} setProflogin={setProflogin}/>}
      </div>
      }
       {/* {
        !login && 
        <div className="form-container" >
         {}
        </div>
       } */}
      <div>
        {login && proflogin? <Proffesor/>: login && <Student/> }
      </div>
      <div>
        {/* {showAboutus && <Aboutus/>} */}
      </div>
      </>
       :
      <div>
      <Home 
      setHome={setHome} 
      setShowAboutus={setShowAboutus}
      setShowContactForm={setShowContactForm}
      handleAboutusClick={handleAboutusClick}
      handleContactButtonClick ={handleContactButtonClick}
      handleserviceclick = {handleserviceclick}
      setLogin={setLogin}
      setShowservice={setShowservice}
      />
    </div>
}
    </ThemeProvider>
  
  );
};

export default App;




