import React, { useState, useEffect } from "react";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import globalize from 'globalize'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import format from 'date-fns/format'
// import parse from 'date-fns/parse'
// import startOfWeek from 'date-fns/startOfWeek'
// import getDay from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US'

// const locales = {
//   'en-US': enUS,
// }

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })
import axios from "axios";
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
import { LOCAL_URL } from "./apiconfig";
const TaskManagement = (props) => {
//   const localizer = momentLocalizer(moment);
const localizer = globalizeLocalizer(globalize)
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

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
        console.log(props.userDetails, "USERDETAILS&&&&&&&&&&&&&&&&");
        console.log(props.userDetails.id);
        let temp = res?.data?.filter((task) => {
          return task.UserID == props?.userDetails["id"];
        });
        setTasks(temp);
        //     temp.map(task => ({
        //         id: task.id,
        //         title: task.title,
        //         start: "",
        //         end: new Date(task.Deadline),
        //         allDay: true, // All tasks are treated as all-day events
        //       }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(tasks, "taskchanged*********");
    setEvents(
      tasks.map((task) => ({
        id: task.id,
        title: task.Description,
        start: new Date(task.Deadline),
        end: new Date(task.Deadline),
        allDay: true, // All tasks are treated as all-day events
      }))
    );
  }, [tasks]);

  // Transform tasks data to calendar events format
  //   const events = tasks.map(task => ({
  //     id: task.id,
  //     title: task.title,
  //     start: "",
  //     end: new Date(task.Deadline),
  //     allDay: true, // All tasks are treated as all-day events
  //   }));

  return (
    <div style={{ marginLeft: "3%", marginRight: "3%" }}>
        {console.log(props)}
      <Button
        style={{ backgroundColor: "#C6373C", marginBottom: "1%" }}
        variant="contained"
        onClick={props.onClose}
      >
        Close
      </Button>
      <h2 
      style={{color:props.themeMode=="light"?"#121212":"white"}}
      >Task Management</h2>

      <div style={{ height: 500 }}>
        {console.log(events)}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()}
        />
      </div>
    </div>
  );
};

export default TaskManagement;
