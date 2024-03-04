import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { CheckCircleOutline, CancelOutlined ,Edit, Troubleshoot} from "@mui/icons-material";

function Proffesor(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openreportModal, setOpenreportModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [attachmentFile, setAttachmentFile] = useState("");
  const [feedback, setFeedback] = useState("");
  const [tasks, setTasks] = useState([
    {
      taskId: 2,
      description: "Review code for bug fixes",
      priority: "Medium",
      status: "Inprogress",
      startDate: "2024-02-28",
      deadline: "2024-03-05",
      assignedTo: "Student 1",
      attachment: "https://example.com/real-pdf-file.pdf",
      feedback: "Correct",
    },
    {
      taskId: 2,
      description: "Review code for bug fixes",
      priority: "High",
      status: "completed",
      startDate: "2024-02-28",
      deadline: "2024-03-05",
      attachment: "https://example.com/real-pdf-file.pdf",
    },
    // Add more tasks as needed
  ]);

  const handleCreateTask = () => {
    setOpenModal(true);
  };

  const handleEditTask = (task) => {
    setEditTask(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditTask(false)
  };

  const handleClosereportModal = () => {
    setOpenreportModal(false);
  };

  const handleAssignTask = () => {
    // Perform task assignment logic here
    console.log("Task assigned:", {
      student: selectedStudent,
      task: taskText,
      priority: priority,
      startDate: startDate,
      endDate: endDate,
    });
    // Clear form fields
    setSelectedStudent("");
    setTaskText("");
    setPriority("");
    setStartDate("");
    setEndDate("");
    // Close modal
    setOpenModal(false);
    Swal.fire({
      title: editTask ? "Task Updated Successfully!" :"Task created and Assigned Successfully!",
      // text: "Report Uploaded Succesfully!",
      icon: "success",
    });
    setEditTask(false)
  };

  const handleViewAttachment = (attachment) => {
    setAttachmentFile(attachment);
    setOpenreportModal(true);
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
          Name: John Doe
        </Typography>
        <Typography variant="subtitle2" style={{ color: "#000040" }}>
          ID: 123456
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
                      onChange={(e) => setSelectedStudent(e.target.value)}
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
                      <MenuItem value="student1">Student 1</MenuItem>
                      <MenuItem value="student2">Student 2</MenuItem>
                      <MenuItem value="student3">Student 3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Task"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
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
                    onChange={(e) => setPriority(e.target.value)}
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
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    placeholder: "", // Remove the placeholder text
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button variant="contained" onClick={handleAssignTask}>
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
              <TableCell>
                <b>Start Date</b>
              </TableCell>
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
              <TableRow key={task.taskId}>
                <TableCell>{task.taskId}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Chip
                    label={task.priority}
                    color="primary"
                    style={{
                      backgroundColor:
                        task.priority === "High" ? "#c72c2c" : "#5880A2",
                    }}
                  />
                </TableCell>
                <TableCell>
                  {" "}
                  <Chip
                    label={task.status}
                    color="primary"
                    style={{
                      backgroundColor:
                        task.status === "completed" ? "#82B068" : "#5880A2",
                    }}
                  />
                </TableCell>
                <TableCell>{task.startDate}</TableCell>
                <TableCell>{task.deadline}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleViewAttachment(task.attachment)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {task.feedback === "Correct" ? (
                    <CheckCircleOutline color="success" />
                  ) : (
                    <CancelOutlined color="error" />
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit Task">
                    <IconButton onClick={() => handleEditTask(task)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openreportModal} onClose={handleClosereportModal}>
        <Container maxWidth="sm" sx={{ mt: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box
            sx={{
              bgcolor: "background.paper",
              padding: 3,
              borderRadius: 2,
              maxHeight: "60vh", // Adjust the maximum height as needed
              overflowY: "auto", // Make the modal scrollable if content exceeds the height
              position: "relative",
              width:"90%"
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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <iframe
                src={attachmentFile}
                style={{ width: "80%", height: "380px" }}
              />
            </Box>
            <TextField
              label="Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              multiline
              fullWidth
              rows={4}
              sx={{ mt: 2 }}
            />
            <Box sx={{ textAlign: "left", mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  handleClosereportModal();
                  Swal.fire({
                    title: "Feedback Given!",
                    // text: "Report Uploaded Succesfully!",
                    icon: "success",
                  });
                }}
              >
                Add Feedback
              </Button>
            </Box>
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button variant="contained" onClick={handleClosereportModal}>
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
