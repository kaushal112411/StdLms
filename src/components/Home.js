import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LanguageIcon from '@mui/icons-material/Language'; 
import image from "../icontop.jpeg";
import image1 from "../image1.png"
import image2 from "../image2.png"

const Home = (props) => {
  return (
    <div className="container" style={{margin:"4%",marginTop:"1%"}}>
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img
            src={image}
            alt="Computer Science Program"
            style={{ width: "auto", height: "40px", marginRight: "10px" }}
          />
          {/* <Typography variant="h6" component="div">
            Home
          </Typography> */}
          <Button
            color="inherit"
            onClick={() => {
              props.setHome(false);
            }}
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <div className="content" style={{ padding: "20px", textAlign: "center", flex: "1 0 auto" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Task Management System for Professors!
        </Typography>
        <Typography variant="body1">
          Our application
          provides a streamlined solution for professors to efficiently manage
          tasks assigned to students. With intuitive features and user-friendly
          interface, professors can create, assign, and track tasks
          effortlessly. Whether it's reviewing code, providing feedback, or
          monitoring progress, our platform simplifies the task management
          process, allowing professors to focus more on guiding their students
          towards success. Experience the convenience of centralized task
          management, seamless communication, and comprehensive feedback systems
          all in one place. 
          </Typography>
          <Typography variant="body1">
          Empower your teaching journey with our Task
          Management System and elevate your students' learning experience
          today! Today, we're excited to introduce our web application designed
          to revolutionize task management and collaboration in educational
          settings. With a focus on efficiency and ease of use, our platform
          aims to bridge the gap between professors and students, providing a
          seamless experience for managing tasks and tracking progress.
        </Typography>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <img src={image1} alt="Image 1" style={{ height: "300px", marginRight: "10px", width: "auto" }} />
          <img src={image2} alt="Image 2" style={{ height: "300px", marginLeft: "10px", width: "auto" }} />
        </div>
      </div>
      <BottomNavigation
        showLabels
        style={{
          //position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#3f51b5",
          marginTop:"10%",
          
        }}
      >
        <BottomNavigationAction label="About Us" style={{color:"white"}} icon={<InfoIcon  onClick={()=>{
            props.handleAboutusClick()
            props.setHome(false)
        }
            } />}  />
        <BottomNavigationAction label="Service Page" style={{color:"white"}} icon={<HomeRepairServiceIcon />} />
        <BottomNavigationAction label="Contact Us" style={{color:"white"}} icon={<ContactMailIcon  
        onClick={()=>{
            props.handleContactButtonClick()
            props.setHome(false)
        }}
        />} />
          <BottomNavigationAction label="Blog" style={{color:"white"}} icon={
         <a href="https://student146.wordpress.com/2024/03/05/7/" style={{ textDecoration: "none", color: "#fff" }}>
          <LanguageIcon />
          </a>
          } />
        
      </BottomNavigation>
     
    </div>
  );
};

export default Home;
