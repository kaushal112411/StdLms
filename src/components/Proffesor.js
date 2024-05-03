import React, { useState, useEffect } from "react";
import { BASE_URL, LOCAL_URL } from "./apiconfig";
import {
  Button,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import Swal from "sweetalert2";
import { green, pink } from '@mui/material/colors';
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
  CheckCircleOutline,
  CancelOutlined,
  Edit,
  Troubleshoot,
} from "@mui/icons-material";
import axios from "axios";

function Proffesor(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openreportModal, setOpenreportModal] = useState(false);
  const [Graduates, setGraduates] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [attachmentFile, setAttachmentFile] = useState("");
  const [feedback, setFeedback] = useState("");
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [feedpayload, setFeedpayload] = useState({});
  const [editpayload, setEditpayload] = useState({});


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
  // const [tasks, setTasks] = useState([
  //   {
  //     taskId: 2,
  //     description: "Review code for bug fixes",
  //     priority: "Medium",
  //     status: "Inprogress",
  //     startDate: "2024-02-28",
  //     deadline: "2024-03-05",
  //     assignedTo: "Student 1",
  //     attachment: "https://example.com/real-pdf-file.pdf",
  //     feedback: "Correct",
  //   },
  //   {
  //     taskId: 2,
  //     description: "Review code for bug fixes",
  //     priority: "High",
  //     status: "completed",
  //     startDate: "2024-02-28",
  //     deadline: "2024-03-05",
  //     attachment: "https://example.com/real-pdf-file.pdf",
  //   },
  //   // Add more tasks as needed
  // ]);
  const [tasks, setTasks] = useState([]);

  const getUserNameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.Name : "Unknown User";
  };

  useEffect(() => {
    axios
      .get(`${LOCAL_URL}/Tasks`)
      .then((res) => {
        console.log(res);
        // setGraduates(res?.data?.map((item)=>{
        //   if(item.UserType == "Graduate"){
        //     return item
        //   }
        // }));
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${LOCAL_URL}/Reports`)
      .then((res) => {
        console.log(res);
        setReports(res.data);
        // setGraduates(res?.data?.map((item)=>{
        //   if(item.UserType == "Graduate"){
        //     return item
        //   }
        // }));
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${LOCAL_URL}/Users`)
      .then((res) => {
        setUsers(res.data);
        setGraduates(
          res?.data?.map((item) => {
            if (item.UserType == "Graduate") {
              return item;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCreateTask = () => {
    setOpenModal(true);
  };

  const handleEditTask = () => {
    setEditTask(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditTask(false);
  };

  const handleClosereportModal = () => {
    setOpenreportModal(false);
  };

  const handlEditTask = () => {
    console.log(editpayload, "PAYLAOD******");
    axios
      .put(`${LOCAL_URL}/Tasks/${selectedTaskId}`, editpayload)
      .then((res) => {
        console.log(res, "resposne of edit api");
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
            // let temp = res?.data?.filter((task) => {
            //   return task.UserID == props?.userDetails["id"];
            // });

            setTasks(res.data);
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
      title: "Task edited Successfully!",
      // text: "Report Uploaded Succesfully!",
      icon: "success",
    });
    setOpenModal(false);
    setSelectedStudent("");
    setTaskText("");
    setPriority("");
    setStartDate("");
    setEndDate("");
  };

  const handleAssignTask = () => {
    // Perform task assignment logic here
    const payload = {
      UserID: selectedStudent,
      status: "inprogress",
      Priority: priority,
      Deadline: endDate,
      Description: taskText,
      Profname:"TESTPROF"
    };
    // Clear form fields

    console.log(payload, "THIS SI PAYLOAD TO CREATE");
    axios
      .post(`${LOCAL_URL}/Tasks`, payload)
      .then((res) => {
        Swal.fire({
          title: editTask
            ? "Task Updated Successfully!"
            : "Task created and Assigned Successfully!",
          // text: "Report Uploaded Succesfully!",
          icon: "success",
        });
        axios
          .get(`${LOCAL_URL}/Tasks`)
          .then((res) => {
            console.log(res);
            // setGraduates(res?.data?.map((item)=>{
            //   if(item.UserType == "Graduate"){
            //     return item
            //   }
            // }));
            setTasks(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        Swal.fire({
          title: "Something went wrong",
          // text: "Report Uploaded Succesfully!",
          icon: "error",
        });
      });
    setOpenModal(false);
    setSelectedStudent("");
    setTaskText("");
    setPriority("");
    setStartDate("");
    setEndDate("");
    // Swal.fire({
    //   title: editTask
    //     ? "Task Updated Successfully!"
    //     : "Task created and Assigned Successfully!",
    //   // text: "Report Uploaded Succesfully!",
    //   icon: "success",
    // });

    setEditTask(false);
  };

  const getFileExtensionFromContentType = (contentType) => {
    // Map content types to file extensions
    const contentTypeMap = {
      "application/pdf": "pdf",
      "text/plain": "txt",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx", // Word document
      // Add more mappings as needed for different file types
    };
  
    // Get the file extension based on the content type
    return contentTypeMap[contentType] || "dat"; // Default to "dat" if content type is unknown
  };
  


  const handledownload = (attachment, id) => {
    axios
      .get(`${LOCAL_URL}/Reports/${id}/download`, { responseType: "blob" })
      .then((response) => {
        // Create a Blob object from the fetched data
        const contentType = response.headers["content-type"];
        const fileExtension = getFileExtensionFromContentType(contentType);
        const blob = new Blob([response.data], {
          type: "contentType",
        });

        // Create a URL for the Blob object
        const url = URL.createObjectURL(blob);
        setAttachmentFile(url);
        // window.open(url, "_blank");

        // Create a download link
        const a = document.createElement("a");
        a.href = url;
        a.download = `report_attachment_${id}.${fileExtension}`; // Set the filename as needed
        document.body.appendChild(a);
        a.click();

        // Clean up by revoking the Object URL
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading report:", error);
        // Handle error
      });
  };


  const truncateDescription = (description) => {
    if (description.length > 15) {
      return `${description.slice(0, 15)}...`;
    }
    return description;
  };

  const handleViewAttachment = (attachment, id) => {
    console.log(attachment, "ATTACHMENT");
    setOpenreportModal(true);

    // Make a GET request to fetch the attachment data
    // axios.get(`${LOCAL_URL}/Reports/${id}/download`
    // , { responseType: 'blob' })
    //   .then((response) => {
    //     // Create a Blob object from the fetched data
    //     const blob = new Blob([response.data], { type: 'application/octet-stream' });

    //     // Create a URL for the Blob object
    //     const url = URL.createObjectURL(blob);
    //     setAttachmentFile(url)
    //     // window.open(url, "_blank");

    //     // Create a download link
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'report_attachment'; // Set the filename as needed
    //     document.body.appendChild(a);
    //     a.click();

    //     // Clean up by revoking the Object URL
    //     URL.revokeObjectURL(url);
    //   })
    //   .catch((error) => {
    //     console.error('Error downloading report:', error);
    //     // Handle error
    //   });

    // Call the downloadReport function with the attachment URL from the response
    //const attachmentUrl = 'https://example.com/real-pdf-file.pdf'; // Replace with the actual attachment URL from the response
    // downloadReport(attachment);
  };

  return (
    <div style={{ padding: "10px" }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 3,
          width: "35%",
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
                <h2>Professor</h2>
              </b>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="subtitle2" style={{ color: "#000040" }}>
          Name: {props.userDetails.Name}
        </Typography>
        <Typography variant="subtitle2" style={{ color: "#000040" }}>
          ID: {props.userDetails.id}
        </Typography>
        <Typography variant="subtitle2" style={{ color: "#000040" }}>
          Department: Computer Science
        </Typography>
      </Paper>
      <Button
        variant="contained"
        onClick={handleCreateTask}
        style={{ marginBottom: "10px", marginTop: "15px" }}
      >
        Create Task
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Box
            sx={{ bgcolor: "background.paper", padding: 3, borderRadius: 2 }}
          >
            <Typography variant="h6" gutterBottom>
              {editTask ? "Edit Task" : "Create Task"}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      select Student
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Student"
                      value={selectedStudent}
                      onChange={(e) => {
                        editTask &&
                          setEditpayload({
                            ...editpayload,
                            UserID: e.target.value,
                          });
                        setSelectedStudent(e.target.value);
                      }}
                      fullWidth
                      inputProps={{
                        placeholder: "", // Remove the placeholder text
                      }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 224,
                            width: 250,
                          },
                        },
                      }}
                    >
                      {/* Replace the options below with actual student names */}
                      {/* <MenuItem value="student1">Student 1</MenuItem>
                      <MenuItem value="student2">Student 2</MenuItem>
                      <MenuItem value="student3">Student 3</MenuItem> */}
                      {Graduates?.map((graduate) => (
                        <MenuItem key={graduate?.id} value={graduate?.id}>
                          {graduate?.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Task"
                  value={taskText}
                  onChange={(e) => {
                    editTask &&
                      setEditpayload({
                        ...editpayload,
                        Description: e.target.value,
                      });
                    setTaskText(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    value={priority}
                    label="Priority"
                    onChange={(e) => {
                      console.log(e.target.value);
                      editTask &&
                        setEditpayload({
                          ...editpayload,
                          Priority: e.target.value,
                        });
                      setPriority(e.target.value);
                    }}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      placeholder: "", // Remove the placeholder text
                    }}
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    placeholder: "", // Remove the placeholder text
                  }}
                />
              </Grid> */}
              <Grid item xs={6}>
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    editTask &&
                      setEditpayload({
                        ...editpayload,
                        Deadline: e.target.value,
                      });
                    setEndDate(e.target.value);
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: new Date().toISOString().split("T")[0], // Disable previous dates
                  }}
                
                />
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button
                variant="contained"
                onClick={editTask ? handlEditTask : handleAssignTask}
              >
                {editTask ? "Update Task" : "Assign Task"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
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
              {/* <TableCell>
                <b>Start Date</b>
              </TableCell> */}
              <TableCell>
                <b>End Date</b>
              </TableCell>
              <TableCell>
                <b>Assigned To</b>
              </TableCell>
              <TableCell>
                <b>Weekly Reports</b>
              </TableCell>
              <TableCell>
                <b>Feedback</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }} onClick={()=>{handledesOpenModal(task.Description)}}><Tooltip title="view full description">{truncateDescription(task.Description)}</Tooltip></TableCell>
                <TableCell>
                  <Chip
                    label={task.Priority}
                    color="primary"
                    style={{
                      backgroundColor:
                        task.Priority === "High"
                          ? "#c72c2c"
                          : task.Priority === "Medium"
                          ? "#FFAA33"
                          : "#5880A2",
                    }}
                  />
                </TableCell>
                <TableCell>
                  {" "}
                  <Chip
                    label={task.status}
                    // color="primary"
                    color={
                      task?.status === "Completed" ? "success" : "secondary"
                    }
                    style={{
                      backgroundColor:
                        task?.status === "Completed" ? "#82B068" : "#5880A2",
                    }}
                  />
                </TableCell>
                {/* <TableCell>{task.startDate}</TableCell> */}
                <TableCell>{task.Deadline}</TableCell>
                <TableCell>{getUserNameById(task?.UserID)}</TableCell>
                <TableCell>
                  <Tooltip title={reports.some(
                    (report) =>
                      report.TaskID === task.id &&
                      report.UserID === task.UserID &&
                      report.Summary !== "test"
                  )?"Uploaded, Give Feedback":"Not Uploaded"
                  }>
                  <IconButton
                    onClick={() => {
                      const report = reports.find(
                        (report) =>
                          report.TaskID === task.id &&
                          report.UserID === task.UserID
                      );
                      // report.summary = ""
                      setFeedpayload(report);
                      handleViewAttachment(report?.Attachment, report?.id);
                    }}
                  >
                    {reports.some(
                    (report) =>
                      report.TaskID === task.id &&
                      report.UserID === task.UserID &&
                      report.Summary !== "" 
                  ) ? (
                    <Avatar sx={{ bgcolor: green[500] ,width: 30, height: 30 }}>
                    <AssignmentIcon />
                  </Avatar>
                  ) : (
                    <CancelOutlined color="error" />
                  )}
                  </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {reports.some(
                    (report) =>
                      report.TaskID === task.id &&
                      report.UserID === task.UserID &&
                      report.Summary !== ""
                  ) ? (
                    <CheckCircleOutline color="success" />
                  ) : (
                    <CancelOutlined color="error" />
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit Task">
                    <IconButton
                      onClick={() => {
                        setEditpayload({
                          Description: task?.Description,
                          Deadline: task?.Deadline,
                          Priority: task?.Priority,
                          status: task?.status,
                          UserID: task?.UserID,
                          id: task?.id,
                        });
                        setSelectedTaskId(task.id);
                        handleEditTask();
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download Report">
                    <IconButton
                      onClick={() => {
                        const report = reports.find(
                          (report) =>
                            report.TaskID === task.id &&
                            report.UserID === task.UserID
                        );
                        // report.summary = ""
                        // setFeedpayload(report)
                        handledownload(report?.Attachment, report?.id);
                      }}
                    >
                      <ArrowCircleDownIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openreportModal} onClose={handleClosereportModal}>
        <Container
          maxWidth="sm"
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              padding: 3,
              borderRadius: 2,
              maxHeight: "60vh", // Adjust the maximum height as needed
              overflowY: "auto", // Make the modal scrollable if content exceeds the height
              position: "relative",
              width: "90%",
            }}
          >
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
              <IconButton onClick={handleClosereportModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" gutterBottom>
              Weekly Report
            </Typography>
            {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
              <iframe
                src={attachmentFile}
                style={{ width: "80%", height: "380px" }}
              />
            </Box> */}
            <TextField
              label="Feedback"
              value={feedback}
              onChange={(e) => {
                setFeedback(e.target.value);
                setFeedpayload({ ...feedpayload, Summary: e.target.value });
              }}
              multiline
              fullWidth
              rows={4}
              sx={{ mt: 2 }}
            />
            <Box sx={{ textAlign: "left", mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  // const report = reports.find((report) => report.TaskID === task.id && report.UserID === task.UserID);

                  console.log(feedpayload, "FEEDPAYLOAD");
                  axios
                    .put(`${LOCAL_URL}/Reports/${feedpayload.id}`, feedpayload)
                    .then((response) => {
                      // Handle response if needed
                      console.log(response.status);
                      if(response.status == 200){
                      Swal.fire({
                        title: "Feedback given Successfully!",
                        icon: "success",
                      });
                    }
                    // else{
                    //   Swal.fire({
                    //     title: response.messsage,
                    //     icon: "error",
                    //   });
                    // }
                    })
                    .catch((error) => {
                      console.error("Error giving feedback:", error);
                      Swal.fire({
                        title: "something went wrong",
                        icon: "error",
                      });
                      // Handle error
                    });
                    handleCloseModal();
                  handleClosereportModal();

                  // Swal.fire({
                  //   title: "Feedback Given!",
                  //   // text: "Report Uploaded Succesfully!",
                  //   icon: "success",
                  // });
                }}
              >
                Add Feedback
              </Button>
            </Box>
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button variant="contained" onClick={handleClosereportModal}  style={{ backgroundColor: "#C6373C", marginBottom: "1%" }}>
                Close
              </Button>
            </Box>
          </Box>
        </Container>
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
    </div>
  );
}

export default Proffesor;
