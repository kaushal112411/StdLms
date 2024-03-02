import React, { useState, useEffect } from "react";
//import { makeStyles } from '@mui/material/styles';
import Swal from 'sweetalert2';
import Box from "@mui/material/Box";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditIcon from '@mui/icons-material/Edit';
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Container,
  Modal,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useDateField } from "@mui/x-date-pickers/DateField/useDateField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { MenuItem, Select } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));

const Student = () => {
  //const classes = useStyles();
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openstatusModal, setOpenstatusModal] = useState(false);
  const [file, setFile] = useState(null);
  const [justification, setJustification] = useState("");
  const statusOptions = ["Inprogress", "Completed"];
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  useEffect(() => {
    setTasks([
      {
        taskId: 1,
        description: "Complete project proposal",
        priority: "High",
        status: "Inprogress",
        startDate: "2024-03-01",
        deadline: "2024-03-15",
      },
      {
        taskId: 2,
        description: "Review code for bug fixes",
        priority: "Medium",
        status: "Inprogress",
        startDate: "2024-02-28",
        deadline: "2024-03-05",
      },
      {
        taskId: 3,
        description: "Prepare presentation slides",
        priority: "High",
        status: "Inprogress",
        startDate: "2024-03-03",
        deadline: "2024-03-10",
      },
      {
        taskId: 4,
        description: "Submit monthly report",
        priority: "Low",
        status: "Completed",
        startDate: "2024-02-20",
        deadline: "2024-02-28",
      },
    ]);
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleOpenstatusModal = () => {
    setOpenstatusModal(true);
  };

  const handleClosestatusModal =()=>{
    setOpenstatusModal(false)
  }


  const handleFileChange = (event) => {
    // Handle file change event
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleJustificationChange = (event) => {
    // Handle justification text change event
    setJustification(event.target.value);
  };

  const handleUploadReport = () => {
    // Handle upload report logic here
    console.log("File:", file);
    console.log("Justification:", justification);
    // Reset file and justification state
    setFile(null);
    setJustification("");
    Swal.fire({
        title: "Report Uploaded Successfully!",
        // text: "Report Uploaded Succesfully!",
        icon: "success"
      });
    // Close the modal
    handleCloseModal();
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    // Update the status of the selected task
    const updatedTasks = tasks.map((task) =>
      task.taskId === selectedTaskId ? { ...task, status: selectedStatus } : task
    );
    setTasks(updatedTasks);
    Swal.fire({
        title: "Status Changed Successfully!",
        // text: "Report Uploaded Succesfully!",
        icon: "success"
      });
      handleClosestatusModal();
  };

  return (
    <div>
      <Container maxWidth="xlg" style={{ padding: "20px" }}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 4,
            width: "15%",
            position: "absolute",
            top: 10,
            left: 5,
            marginLeft: "14px",
            backgroundColor: "#ffffff",
            backgroundImage: "linear-gradient(315deg, #ffffff 0%, #335c81 74%)",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton>
                <AccountCircle fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="title" style={{ color: "#000040" }}>
                <b>
                  <h2>Student</h2>
                </b>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle2" style={{ color: "#000040" }}>
            Name: Sadwika Alasyam
          </Typography>
          <Typography variant="subtitle2" style={{ color: "#000040" }}>
            ID: 123456
          </Typography>
          <Typography variant="subtitle2" style={{ color: "#000040" }}>
            Department: Computer Science
          </Typography>
        </Paper>
        <Grid container spacing={3}>
          {/* Progress Tracking */}
          <Grid item xs={12} sm={3} style={{ marginBottom: "1%" }}>
            <Paper
              style={{
                padding: "5%",
                position: "relative",
                backgroundColor: "#9ACEEB",
                marginTop: "2%",
              }}
            >
              <Box sx={{ position: "absolute", top: 10, right: 20 }}>
                <AssignmentIcon fontSize="large" />
              </Box>
              <Typography variant="h6" gutterBottom>
                <b>Progress Tracking</b>
              </Typography>
              {/* <CircularProgress variant="determinate" value={75}  /> */}
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress variant="determinate" value={75} />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    {`${Math.round("75")}%`}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" style={{ color: "#5880A2" }}>
                <b>Tasks Completed: 1 / 4</b>
              </Typography>
              <Typography variant="body2" style={{ color: "#5880A2" }}>
                <b>Total Hours Worked: 300</b>
              </Typography>
              <Typography variant="body2" style={{ color: "#5880A2" }}>
                <b>Upcoming Deadlines: 3</b>
              </Typography>
            </Paper>
          </Grid>
          {/* Calendar */}
          {/* <Grid item xs={12} sm={6}>
        </Grid> */}
          {/* Weekly Reports */}
          <Grid item xs={3}>
            <Paper
              //className={classes.paper}
              style={{
                padding: "5%",
                position: "relative",
                backgroundColor: "#AEC6CF",
                marginTop: "2%",
              }}
            >
              <Box sx={{ position: "absolute", top: 10, right: 20 }}>
                <AssessmentIcon fontSize="large" />
              </Box>
              <Typography variant="h6" gutterBottom>
                <b>Weekly Reports</b>
              </Typography>
              {/* Add text input fields and file upload component here */}

              {/* Add text input field for justification */}
              <Typography variant="body2">
                <Button
                  variant="contained"
                  style={{ marginBottom: "8px", marginTop: "57px" }}
                  onClick={handleOpenModal}
                >
                  Upload Report
                </Button>
              </Typography>
              {/* Add file upload component */}
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              Task List
            </Typography>
            {tasks.length === 0 ? (
              <CircularProgress />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Task ID</b></TableCell>
                      <TableCell><b>Description</b></TableCell>
                      <TableCell><b>Priority</b></TableCell>
                      <TableCell><b>Status</b></TableCell>
                      <TableCell><b>StartDate</b></TableCell>
                      <TableCell><b>Deadline</b></TableCell>
                      <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.taskId}>
                        <TableCell>{task.taskId}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>{task.priority}</TableCell>
                        <TableCell>
                          <Chip
                            label={task.status}
                            color={
                              task.status === "Completed"
                                ? "success"
                                : "secondary"
                            }
                            style={{
                              backgroundColor:
                                task.status === "Completed"
                                  ? "#82B068"
                                  : "#5880A2",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="date"
                            value={task.startDate}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="date"
                            value={task.deadline}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                  <IconButton
                  onClick={handleOpenstatusModal}
                  >
                    <EditIcon fontSize="medium" />
                  </IconButton>
                </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: 400,
            }}
          >
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" gutterBottom>
              Upload Report
            </Typography>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ marginBottom: "16px" }}
            />
            <TextField
              label="Justify 21 hours work"
              multiline
              rows={4} // Adjust the number of rows as needed
              value={justification}
              onChange={handleJustificationChange}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleUploadReport}
              style={{ marginTop: "16px" }}
            >
              Upload
            </Button>
          </Box>
        </Modal>
        <Modal open={openstatusModal} onClose={handleClosestatusModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: 400,
            }}
          >
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
              <IconButton onClick={handleClosestatusModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" gutterBottom>
              Update Status
            </Typography>
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              fullWidth
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              onClick={handleUpdateStatus}
              style={{ marginTop: "16px" }}
            >
              Update
            </Button>
          </Box>
        </Modal>

      </Container>
    </div>
  );
};

export default Student;
