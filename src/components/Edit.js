import React, { useState, useEffect } from "react";
import { toast, Zoom } from "react-toastify";
import axios from "axios";
import { useTask } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
export const Edit = () => {
  const navigate = useNavigate();
  const { editTask, setEditTask, tasks, setTasks } = useTask();

  const [edit, setEdit] = useState({
    title: editTask?.title || "",
    description: editTask?.description || "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setEdit((prev) => ({ ...prev, [name]: value }));
    console.log(edit);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const payload = {
        _id: editTask._id,
        title: edit.title,
        description: edit.description,
      };
      console.log("sending req");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/task/edit`,
        payload,
        config
      );
      const result = response.data;
      console.log(result);

      toast.success(" Task updated Successfully", {
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
      navigate("/");
    } catch (error) {
      toast.error(" Task updation failed ", {
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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Update</h2>
      <form onSubmit={handleUpdate}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="title">
            Change Title Here
          </label>
          <input
            style={styles.input}
            id="title"
            type="text"
            placeholder="Enter topic title"
            name="title"
            value={edit.title}
            onChange={handleChange}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="description">
            Change Description Here
          </label>
          <input
            style={styles.input}
            id="description"
            type="text"
            placeholder="Enter topic description"
            name="description"
            value={edit.description}
            onChange={handleChange}
          />
        </div>
        <button style={styles.button} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f8f9fa", // Light gray background
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#343a40", // Dark gray color
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#495057", // Muted gray for labels
    fontSize: "14px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ced4da", // Border gray
    borderRadius: "5px",
    fontSize: "16px",
    backgroundColor: "#fff", // White background for inputs
    color: "#495057", // Text color
  },
  button: {
    width: "100%",
    backgroundColor: "#6c757d", // Muted gray for the button
    color: "#fff",
    padding: "10px 0",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};
