import React, { useEffect } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Zoom } from "react-toastify";
import { useTask } from "../context/TaskContext";

export const Tasks = () => {
  const navigate = useNavigate();

  const {  setEditTask, tasks, setTasks } = useTask();

  const handleDelete = async (_id) => {
    try {
      if (!_id) {
        toast.error("ID not found", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
        return;
      }

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/task/delete`,
        { _id },
        config
      );

      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
        toast.success("Task Deleted Successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      } else {
        toast.error("Failed to delete task", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  const handleEdit = async (task) => {
    setEditTask(task);
    navigate("/edit");
  };

  const getTasks = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/task/get`,
        config
      );
      const result = response.data;
      setTasks(result);
    } catch (error) {
      toast.error("Data fetching failed!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const styles = {
    taskList: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "640px", 
      margin: "0 auto", 
      backgroundColor: "#f5f5f5", 
      padding: "20px", 
      borderRadius: "8px", 
    },
    taskItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "15px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      border: "0.2px solid grey",
      marginTop: "10px",
    },
    taskContent: {
      flexGrow: 1,
    },
    taskTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      margin: 0,
      padding: 0,
    },
    taskDescription: {
      fontSize: "0.9rem",
      color: "#666",
      margin: "5px 0 0",
    },
    taskActions: {
      display: "flex",
      gap: "10px",
    },
    icon: {
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.taskList}>
      {tasks.map((task) => (
        <div key={task._id} style={styles.taskItem}>
          <div style={styles.taskContent}>
            <h2 style={styles.taskTitle}>{task.title}</h2>
            <p style={styles.taskDescription}>{task.description}</p>
          </div>
          <div style={styles.taskActions}>
            <button
              style={{ border: "none", background: "none" }}
              onClick={() => handleDelete(task._id)}
            >
              <DeleteForeverOutlinedIcon color="error" style={styles.icon} />
            </button>
            <button
              style={{ border: "none", background: "none", color: "#6c757d" }}
              onClick={() => handleEdit(task)}
            >
              <EditIcon style={styles.icon} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
