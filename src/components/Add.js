import axios from "axios";
import React, { useState } from "react";
import { toast, Zoom } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const Add = () => {
  const [updatedValues, setUpdatedValues] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!updatedValues.title || !updatedValues.description) {
      toast.error("Fill all the fields", {
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
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:8080/task/add",
        updatedValues,
        config
      );
      const result = response.data;
      setUpdatedValues({
        title: "",
        description: "",
      });
      toast.success(" Task Added Successfully", {
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
      toast.error(`${error}`, {
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

  const titleChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedValues((prev) => ({ ...prev, [name]: value }));
    console.log("updated values are", updatedValues);
  };
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Topic</h2>
      <form onSubmit={handleAddTask}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="title">
            Topic Title
          </label>
          <input
            style={styles.input}
            id="title"
            type="text"
            placeholder="Enter topic title"
            onChange={titleChangeHandler}
            name="title"
            value={updatedValues.title}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="description">
            Topic Description
          </label>
          <input
            style={styles.input}
            id="description"
            type="text"
            placeholder="Enter topic description"
            name="description"
            value={updatedValues.description}
            onChange={titleChangeHandler}
          />
        </div>
        <button style={styles.button} type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px", // Match the width of Header and Tasks components
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
