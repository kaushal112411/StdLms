import React, { useState, useRef } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser'

const theme = createTheme();

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const forrm = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    const serviceId = "service_37hke9l";
    // Your EmailJS template ID
    const templateId = "template_91cnx9e";
    // Your EmailJS user ID
    const userId = "tejasai929@gmail.com";
    //   const formData = new FormData();
    // formData.append('name', name);
    // formData.append('email', email);
    // formData.append('phone', phone);
    emailjs
      .sendForm(serviceId, templateId, forrm.current, {
        publicKey: "SMIOI8wQZ1Y1B0Ddv",
      })
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          // Optionally, show a success message to the user
          Swal.fire({
            title: "Email Sent Successfully!",
            icon: "success",
          });
        },
        (error) => {
          console.error("Failed to send email:", error);
          // Optionally, show an error message to the user
        }
      );
  };

  //   <form ref={form} onSubmit={sendEmail}>
  // <label>Name</label>
  // <input type="text" name="user_name" />
  // <label>Email</label>
  // <input type="email" name="user_email" />
  // <label>Message</label>
  // <textarea name="message" />
  // <input type="submit" value="Send" />
  // </form>

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          <form ref={forrm} onSubmit={handleSubmit}>
            {/* <label>Name</label>
            <input type="text" name="user_name" 
             variant="outlined"
             margin="normal"
             required
             fullWidth
            />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" /> */}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="from_name" 
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="from_name"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="phone"
              required
              label="Message"
              name="message"
              autoComplete="message"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type='submit'
              value="Send"
              // onClick={handleSubmit}
            >
              Send
            </Button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default ContactForm;
