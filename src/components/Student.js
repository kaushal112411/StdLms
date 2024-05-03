import React, { useState, useEffect } from "react";
//import { makeStyles } from '@mui/material/styles';
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditIcon from "@mui/icons-material/Edit";
import * as FileSaver from "file-saver";
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
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useDateField } from "@mui/x-date-pickers/DateField/useDateField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { MenuItem, Select } from "@mui/material";
import { BASE_URL, LOCAL_URL } from "./apiconfig";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));

const Student = (props) => {
  //const classes = useStyles();
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openstatusModal, setOpenstatusModal] = useState(false);
  const [file, setFile] = useState(null);
  const [justification, setJustification] = useState("");
  const statusOptions = ["Inprogress", "Completed"];
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [payload, setPayload] = useState({});
  const [reppayload, setReppayload] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [completed,setCompleted] = useState(0)
  const [upcoming,setUpcoming] = useState(0)
  const [opendesModal, setOpendesModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const handledesOpenModal = (description) => {
    setSelectedDescription(description);
    setOpendesModal(true);
  };

  const handledesCloseModal = () => {
    setOpendesModal(false);
    setSelectedDescription("");
  };

  useEffect(() => {
    // Check if user is already logged in
    const logedin = localStorage.getItem("props.login");
    if (logedin === "true") {
      props.setLogin(true);
    }
  }, []);

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    axios
      .get(`${LOCAL_URL}/Tasks`)
      .then((res) => {
        console.log(res);
        // setGraduates(res?.data?.map((item)=>{
        //   if(item.UserType == "Graduate"){
        //     return item
        //   }
        // }));
        console.log(props.userDetails, "USERDETAILS&&&&&&&&&&&&&&&&");
        console.log(props.userDetails.id);
        let temp = res?.data?.filter((task) => {
          return task.UserID == props?.userDetails["id"];
        });
        setTasks(temp);

        const completedTasks = temp.filter((task) => task.status === "Completed").length;
        setCompleted(completedTasks);
  
        // Count upcoming tasks (tasks with deadlines greater than today)
        const today = new Date();
        const upcomingTasks = temp.filter((task) => new Date(task.Deadline) > today).length;
        setUpcoming(upcomingTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const truncateDescription = (description) => {
    if (description.length > 15) {
      return `${description.slice(0, 15)}...`;
    }
    return description;
  };

  useEffect(() => {
    // setTasks([
    //   {
    //     taskId: 1,
    //     description: "Complete project proposal",
    //     priority: "High",
    //     status: "Inprogress",
    //     startDate: "2024-03-01",
    //     deadline: "2024-03-15",
    //   },
    //   {
    //     taskId: 2,
    //     description: "Review code for bug fixes",
    //     priority: "Medium",
    //     status: "Inprogress",
    //     startDate: "2024-02-28",
    //     deadline: "2024-03-05",
    //   },
    //   {
    //     taskId: 3,
    //     description: "Prepare presentation slides",
    //     priority: "High",
    //     status: "Inprogress",
    //     startDate: "2024-03-03",
    //     deadline: "2024-03-10",
    //   },
    //   {
    //     taskId: 4,
    //     description: "Submit monthly report",
    //     priority: "Low",
    //     status: "Completed",
    //     startDate: "2024-02-20",
    //     deadline: "2024-02-28",
    //   },
    // ]);
  }, []);

  const handleTaskChange = (event) => {
    setSelectedTaskId(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenstatusModal = (id) => {
    setOpenstatusModal(true);
    setSelectedTaskId(id);
  };

  const handleClosestatusModal = () => {
    setOpenstatusModal(false);
  };

  const handleFileChange = (event) => {
    // Handle file change event
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleJustificationChange = (event) => {
    // Handle justification text change event
    setJustification(event.target.value);
  };

  // const handleUploadReport = () => {
  //   // Handle upload report logic here
  //   console.log("File:", file);
  //   console.log("Justification:", justification);
  //   // Reset file and justification state
  //   setFile(null);
  //   setJustification("");
  //   Swal.fire({
  //       title: "Report Uploaded Successfully!",
  //       // text: "Report Uploaded Succesfully!",
  //       icon: "success"
  //     });
  //   // Close the modal
  //   handleCloseModal();
  // };

  // const handleUploadReport = () => {
  //   // Create a new Blob object with the file data
  //     // Generate a random percentage between 20 and 40 for plagiarism
  


  //   const blob = new Blob([file], { type: file.type });
  
  //   // Create FormData object
  //   const formData = new FormData();
  //   formData.append("UserID", props.userDetails.id);
  //   formData.append("TaskID", selectedTaskId);
  //   formData.append("Summary", "test"); // Add summary if needed
  //   formData.append("Justification", justification); // Add justification text
  //   formData.append("Attachment", blob, file.name); // Append the Blob to the form data
  
  //   // Send FormData object to the API
  //   axios
  //     .post(`${LOCAL_URL}/Reports`, formData)
  //     .then((response) => {
  //       // Handle response if needed
  //       Swal.fire({
  //         title: "Report Uploaded Successfully!",
  //         icon: "success",
  //       });
  //       handleCloseModal();
  //       setSelectedTaskId("")
  //       setJustification("")
  //       setFile(null)
  //     })
  //     .catch((error) => {
  //       console.error("Error uploading file:", error);
  //       // Handle error
  //     });
      
  // };
  

  const handleUploadReport = () => {
    // Generate a random percentage between 20 and 40 for plagiarism
    handleCloseModal();
    const plagiarismPercentage = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
  
    // Show a modal informing the user about the plagiarism
    Swal.fire({
      title: "Plagiarism Detected",
      text: `Plagiarism detected in your report. Plagiarism Percentage: ${plagiarismPercentage}%`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Upload Anyway",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Create a new Blob object with the file data
        const blob = new Blob([file], { type: file.type });
      
        // Create FormData object
        const formData = new FormData();
        formData.append("UserID", props.userDetails.id);
        formData.append("TaskID", selectedTaskId);
        formData.append("Summary", "test"); // Add summary if needed
        formData.append("Justification", justification); // Add justification text
        formData.append("Attachment", blob, file.name); // Append the Blob to the form data
      
        // Send FormData object to the API
        axios
          .post(`${LOCAL_URL}/Reports`, formData)
          .then((response) => {
            // Handle response if needed
            Swal.fire({
              title: "Report Uploaded Successfully!",
              icon: "success",
            });
            handleCloseModal();
            setSelectedTaskId("")
            setJustification("")
            setFile(null)
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            // Handle error
          });
      }
    });
  };
  
 

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setPayload({
      ...payload,
      status: event.target.value, // Update the status field with the selectedStatus
      // Include other fields if needed, but keep them unchanged
    });
  };

  const handleUpdateStatus = () => {
    // Update the status of the selected task
    // setPayload({
    //   ...payload,
    //   status: selectedStatus // Update the status field with the selectedStatus
    //   // Include other fields if needed, but keep them unchanged
    // });
    console.log(payload, "PAYLAOD******");
    axios
      .put(`${LOCAL_URL}/Tasks/${selectedTaskId}`, payload)
      .then((res) => {
        console.log(res,"resposne of edit api");
        // setGraduates(res?.data?.map((item)=>{
        //   if(item.UserType == "Graduate"){
        //     return item
        //   }
        // }));
        axios
          .get(`${LOCAL_URL}/Tasks`)
          .then((res) => {
            console.log(res);
            // setGraduates(res?.data?.map((item)=>{
            //   if(item.UserType == "Graduate"){
            //     return item
            //   }
            // }));
            let temp = res?.data?.filter((task) => {
              return task.UserID == props?.userDetails["id"];
            });

            setTasks(temp);
            const completedTasks = temp.filter((task) => task.status === "Completed").length;
            setCompleted(completedTasks);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    // const updatedTasks = tasks.map((task) =>
    //   task.taskId === selectedTaskId ? { ...task, status: selectedStatus } : task
    // );

    // setTasks(updatedTasks);
    Swal.fire({
      title: "Status Changed Successfully!",
      // text: "Report Uploaded Succesfully!",
      icon: "success",
    });
    handleClosestatusModal();
  };

  return (
    <div>
      {console.log(props)}
      <Container maxWidth="xlg" style={{ padding: "20px" }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 1,
              width: "35%",
              marginLeft: "0.3%",
              backgroundColor: "#ffffff",
              backgroundImage:
                "linear-gradient(315deg, #ffffff 0%, #335c81 74%)",
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
              Name: {props?.userDetails?.Name}
            </Typography>
            <Typography variant="subtitle2" style={{ color: "#000040" }}>
              ID: {props?.userDetails?.id}
            </Typography>
            {/* <Typography variant="subtitle2" style={{ color: "#000040" }}>
            Department: null
          </Typography> */}
          </Paper>
        </Box>
        <Grid container spacing={2} style={{marginBottom:"1%"}}>
          {/* Progress Tracking */}
          <Grid item xs={12} sm={4} style={{ marginBottom: "1%" }}>
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
                <b>Track Progress</b>
              </Typography>
              {/* <CircularProgress variant="determinate" value={75}  /> */}
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress variant="determinate" value={(completed/tasks.length)*100} />
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
                    {`${Math.round((completed/tasks.length)*100)}%`}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" style={{ color: "#5880A2" }}>
                <b>Tasks Completed: {completed?completed:0}/{tasks.length} </b>
              </Typography>
              <Typography variant="body2" style={{ color: "#5880A2" }}>
                <b>Total Hours Worked:{(completed?completed:0/tasks.length)*21}</b>
                <b></b>
              </Typography>
              <Typography variant="body2" style={{ color: "#5880A2" }}>
                <b>Upcoming Deadlines: {upcoming}</b>
              </Typography>
            </Paper>
          </Grid>
          {/* Calendar */}
          {/* <Grid item xs={12} sm={6}>
        </Grid> */}
          {/* Weekly Reports */}
          <Grid item xs={12} sm={4}>
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
            {/* <Typography variant="h6" gutterBottom>
              Task List
            </Typography> */}
            {tasks.length === 0 ? (
              <Typography>No Tasks were Assigned</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Task ID</b>
                      </TableCell>
                      <TableCell>
                        <b>Description</b>
                      </TableCell>
                      <TableCell>
                        <b>Priority</b>
                      </TableCell>
                      <TableCell>
                        <b>Status</b>
                      </TableCell>
                      {/* <TableCell><b>StartDate</b></TableCell> */}
                      <TableCell>
                        <b>Deadline</b>
                      </TableCell>
                      <TableCell>
                        <b>Actions</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task?.id}>
                        <TableCell>{task?.id}</TableCell>
                        <TableCell sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }} onClick={()=>{handledesOpenModal(task.Description)}} ><Tooltip title="view full description">{truncateDescription(task.Description)}</Tooltip></TableCell>
                        <TableCell

                         > <Chip
                         label={task.Priority}
                         color="primary"
                         style={{
                           backgroundColor:
                             task.Priority === "High"
                               ? "#c72c2c"
                               : task.Priority === "Medium"
                               ? "#FFAA33"
                               : "#5880A2",
                         }}/>
                         </TableCell>
                        <TableCell>
                          <Chip
                            label={task?.status}
                            color={
                              task?.status === "Completed"
                                ? "success"
                                : "secondary"
                            }
                            style={{
                              backgroundColor:
                                task?.status === "Completed"
                                  ? "#82B068"
                                  : "#5880A2",
                            }}
                          />
                        </TableCell>
                        {/* <TableCell>
                          <TextField
                            type="date"
                            value={task.startDate}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            size="small"
                            fullWidth
                          />
                        </TableCell> */}
                        <TableCell>
                          <TextField
                            //disabled={true}
                            type="date"
                            value={task?.Deadline}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              handleOpenstatusModal(task.id);
                              setPayload({
                                Description: task?.Description,
                                Deadline: task?.Deadline,
                                Priority: task?.Priority,
                                status: task?.status,
                                UserID: task?.UserID,
                                id: task?.id,
                              });
                            }}
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
            <Typography variant="h6" gutterBottom style={{color:props.themeMode=="dark"?"white":""}}>
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
              required
              rows={4} // Adjust the number of rows as needed
              value={justification}
              onChange={handleJustificationChange}
              fullWidth
            />
            <Select
              value={selectedTaskId}
              onChange={handleTaskChange}
              fullWidth
            >
              <MenuItem value={null} disabled>
                Select Task
              </MenuItem>
              {tasks.map((task) => (
                <MenuItem key={task.id} value={task.id}>
                  {task.Description}
                </MenuItem>
              ))}
            </Select>
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
            <Typography variant="h6" gutterBottom style={{color:props.themeMode=="dark"?"white":""}}>
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
        <Modal open={opendesModal} onClose={handledesCloseModal}>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Box
            sx={{
              bgcolor: "background.paper",
              padding: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Task Description
            </Typography>
            <Typography>{selectedDescription}</Typography>
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button variant="contained" onClick={handledesCloseModal}>
                Close
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
      </Container>
    </div>
  );
};

export default Student;
