// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./MessageBoard.css"; // Import CSS file for styling
// import {
//   Grid,
//   Paper,
//   Typography,
//   CircularProgress,
//   TextField,
//   Container,
//   Modal,
//   Button,
//   Tooltip,
// } from "@mui/material";
// import { LOCAL_URL,BASE_URL } from "./apiconfig";

// const MessageBoard = ({ userDetails, onClose ,showMessageBoard}) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const messagesResponse = await axios.get(`${BASE_URL}/messages`);
//         setMessages(messagesResponse.data);

//         const usersResponse = await axios.get(`${BASE_URL}/Users`);
//         setUsers(usersResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to handle sending a new message
//   const sendMessage = async () => {
//     if (newMessage.trim() === "") {
//       return;
//     }

//     try {
//       const newMessageData = {
//         user_id: userDetails.id,
//         message: newMessage,
//         msgtoken: false,
//       };

//       await axios.post(`${BASE_URL}/messages`, newMessageData);
//       const messagesResponse = await axios.get(`${BASE_URL}/messages`);
//       setMessages(messagesResponse.data);

//       setNewMessage(""); // Clear the input field after sending the message
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // Function to get user name by ID
//   const getUserNameById = (userId) => {
//     const user = users.find((user) => user.id === userId);
//     return user ? user.Name : "Unknown User";
//   };

//   return (
//     <div className="message-board" style={{marginTop:"1%"}}>
//       <h2>Message Board</h2>
//       <Button
//         style={{ backgroundColor: "#C6373C", marginBottom: "5%" }}
//         variant="contained"
//         onClick={onClose}
//       >
//         Close
//       </Button>
//       <div>
//         {  messages ?
//         messages.map((message) => (
//           <div
//             key={message.id}
//             className={
//               message.user_id === userDetails.id
//                 ? "own-message-container"
//                 : "other-message-container"
//             }
//           >
//             <div className="message-user">
//               <strong>{getUserNameById(message.user_id)}:</strong>
//             </div>
//             <div
//               className={
//                 message.user_id === userDetails.id
//                   ? "own-message"
//                   : "other-message"
//               }
//             >
//               {message.message}
//             </div>
//           </div>
//         )):
//         <CircularProgress value={"loading messages"} />
//     }
//       </div>
//       <div>
//         <textarea
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//         ></textarea>
//         <br />
//         <Button
//           color="primary"
//           variant="contained"
//           onClick={sendMessage}
//         >
//           Send Message
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MessageBoard;




// new component


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MessageBoard.css"; // Import CSS file for styling
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
import { LOCAL_URL, BASE_URL } from "./apiconfig";

const MessageBoard = ({ userDetails, onClose, showMessageBoard,themeMode }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messagesResponse = await axios.get(`${BASE_URL}/messages`);
        setMessages(messagesResponse.data);

        const usersResponse = await axios.get(`${BASE_URL}/Users`);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle sending a new message
  const sendMessage = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    try {
      const newMessageData = {
        user_id: userDetails.id,
        message: newMessage,
        msgtoken: false,
      };

      await axios.post(`${BASE_URL}/messages`, newMessageData);
      const messagesResponse = await axios.get(`${BASE_URL}/messages`);
      setMessages(messagesResponse.data);

      setNewMessage(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to get user name by ID
  const getUserNameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.Name : "Unknown User";
  };

  return (
    <div className="message-board" style={{ marginTop: "1%" }}>
      <h2
      style={{color:themeMode=="light"?"#121212":"white"}}
      >Message Board</h2>
      <Button
        style={{ backgroundColor: "#C6373C", marginBottom: "1%" }}
        variant="contained"
        onClick={onClose}
      >
        Close
      </Button>
      <div className="message-container">
        {messages ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={
                message.user_id === userDetails.id
                  ? "own-message-container"
                  : "other-message-container"
              }
            >
              <div className="message-user">
                <strong>{getUserNameById(message.user_id)}:</strong>
              </div>
              <div
                className={
                  message.user_id === userDetails.id
                    ? "own-message"
                    : "other-message"
                }
              >
                {message.message}
              </div>
            </div>
          ))
        ) : (
          <CircularProgress value={"loading messages"} />
        )}
      </div>
      <div>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "60%" }} 
        ></textarea>
        <br />
        <Button color="primary" variant="contained" onClick={sendMessage}>
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default MessageBoard;

