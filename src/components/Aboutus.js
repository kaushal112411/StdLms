import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Aboutus() {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Paper
        elevation={3}
        style={{ padding: "20px", marginBottom: "20px", width: "70%",backgroundColor:"#AECFC8",
        borderRadius: "20px", // Adjust border radius for curved look
        marginLeft: "20px", // Align to some left
    }}
      >
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h5" style={{ marginBottom: "20px" }} >
          Our web application offers a comprehensive suite of features tailored
          to the needs of both professors and students. Professors can
          effortlessly generate tasks, view student reports, and assign tasks
          with just a few clicks. On the other hand, students can access their
          assigned tasks, monitor their progress, and submit weekly reports
          detailing their work.
        </Typography>

        <Typography variant="h5">
          This represents a significant step forward in
          streamlining education and promoting collaboration between professors
          and students. By leveraging innovative technologies and intuitive
          design principles, we've created a platform that empowers users to
          effectively manage tasks, track progress, and enhance communication.
          We're excited about the potential impact of our project and look
          forward to further developments in the field of education technology.
        </Typography>
      </Paper>
    </div>
  );
}
