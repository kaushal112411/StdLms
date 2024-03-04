import React from 'react';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Services() {
  return (
    <div style={{ textAlign: 'center' }}>
            <Paper
        elevation={3}
        style={{ padding: "20px", marginBottom: "20px", width: "70%",backgroundColor:"#AECFC8",
        borderRadius: "20px", // Adjust border radius for curved look
        marginLeft: "15%", // Align to some left
    }}
      >
      <Typography variant='h4'><b>Services</b></Typography>
      <Typography variant='h5'>
        Our services are designed to streamline task management for professors and students alike. We offer a comprehensive platform that enables efficient creation, assignment, and tracking of tasks, ensuring smooth communication and collaboration throughout the educational journey.
      </Typography>
      <Typography variant='h4'><b>Functionalities</b></Typography>
      <Typography variant='h5'>
        With a user-friendly interface and intuitive features, our platform provides functionalities tailored to the needs of professors and students. From task creation and assignment to progress tracking and feedback submission, our system empowers users to effectively manage their academic responsibilities and enhance productivity.
      </Typography>
      <Typography variant='h4'><b>Roles</b></Typography>
      <Typography variant='h5'>
        Our platform caters to two primary roles: professors and students. Professors can create tasks, assign them to students, monitor progress, and provide feedback. On the other hand, students can view assigned tasks, submit completed work, and receive feedback from professors. This division of roles ensures clear communication and accountability within the educational ecosystem.
      </Typography>
      </Paper>
    </div>
  );
}
